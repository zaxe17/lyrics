import { useState, useEffect, useRef } from "react";
import { lyrics } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import music from "../song/1114.mp3";
import cloud1 from "../image/cloudcry.png";
import cloud2 from "../image/cloudcry2.png";
import cloud3 from "../image/cloud-center.png";

const Hello = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [visible, setVisible] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [started, setStarted] = useState(false);
	const audioRef = useRef(null);

	useEffect(() => {
		if (currentIndex >= lyrics.length) {
			setIsFinished(true);
			return;
		}

		if (!started) return;

		const { text, seconds } = lyrics[currentIndex];

		setVisible(true);

		const hideTimeout = setTimeout(() => {
			setVisible(false);
		}, seconds * 1000);

		const showNextTimeout = setTimeout(() => {
			setCurrentIndex((prevIndex) => prevIndex + 1);
		}, seconds * 1000 + 500);

		return () => {
			clearTimeout(hideTimeout);
			clearTimeout(showNextTimeout);
		};
	}, [currentIndex, started]);

	const startLyrics = () => {
		setStarted(true);
		setIsFinished(false);
		setCurrentIndex(0);
		if (audioRef.current) {
			audioRef.current.play();
		}
	};

	const handleAudioEnd = () => {
		setStarted(false);
		setIsFinished(true);
	};

	return (
		<div className="h-screen flex flex-col items-center justify-center text-2xl font-semibold">
			{!started && (
				<motion.div
					key={currentIndex}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 2 }}
					className="relative group flex items-center justify-center"
					onClick={startLyrics}>
					<img
						className="absolute w-2/3 lg:w-full transition-transform duration-300 ease-in-out transform group-hover:-translate-y-10 group-hover:scale-125 user-drag-none"
						src={cloud3}
						alt=""
					/>

					{/* Left Cloud */}
					<img
						className="absolute -left-2 lg:-left-14 w-28 lg:w-60 transition-transform duration-300 ease-in-out transform group-hover:-translate-x-14  lg:group-hover:-translate-x-28 group-hover:scale-125 user-drag-none"
						src={cloud2}
						alt=""
					/>

					{/* Right Cloud */}
					<img
						className="absolute -right-2 lg:-right-14 w-28 lg:w-60 transition-transform duration-300 ease-in-out transform group-hover:translate-x-14 lg:group-hover:translate-x-28 group-hover:scale-125 user-drag-none"
						src={cloud1}
						alt=""
					/>

					<button
						className="relative fade-in bg-cyan-500 text-white text-xl lg:text-2xl lg:py-6 py-4 lg:px-4 px-2 rounded-lg transition-all ease-in-out duration-300 group-hover:scale-110"
						style={{ zIndex: 2 }}>
						(つ╥﹏╥)つ Start! ૮(˶ㅠ︿ㅠ)ა
					</button>
				</motion.div>
			)}

			<AnimatePresence>
				{started && visible && (
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center">
						{lyrics[currentIndex].gif && (
							<motion.img
								src={lyrics[currentIndex].gif}
								alt="lyric gif"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
								className="w-1/2 mx-auto mb-4 user-drag-none"
							/>
						)}

						<div className="mx-4 lg:text-3xl text-cyan-200">
							{lyrics[currentIndex].text}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<audio ref={audioRef} src={music} onEnded={handleAudioEnd} />
		</div>
	);
};

export default Hello;
