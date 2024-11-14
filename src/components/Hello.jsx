import { useState, useEffect, useRef } from "react";
import { lyrics } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import music from "../song/1114.mp3";

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
				<button
					onClick={startLyrics}
					className="fade-in bg-blue-500 text-white py-6 px-4 rounded-lg transition-all ease-in-out duration-300 hover:scale-110">
					(つ╥﹏╥)つ Start! ૮(˶ㅠ︿ㅠ)ა
				</button>
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
								className="w-1/2 mx-auto mb-4"
							/>
						)}
						
						<div className="text-3xl text-blue-400">
							{lyrics[currentIndex].text}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<audio
				ref={audioRef}
				src={music}
				onEnded={handleAudioEnd}
			/>
		</div>
	);
};

export default Hello;
