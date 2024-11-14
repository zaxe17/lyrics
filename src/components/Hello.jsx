import { useState, useEffect, useRef } from "react";
import { lyrics } from "../constants";
import { motion, AnimatePresence } from "framer-motion";

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
		<div className="h-screen flex items-center justify-center text-2xl font-semibold">
			{!started && (
				<button
					onClick={startLyrics}
					className="fade-in bg-blue-500 text-white py-2 px-4 rounded transition-all ease-in-out duration-300 hover:scale-110">
					Start!
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
						className="text-3xl text-center">
						{lyrics[currentIndex].text}
					</motion.div>
				)}
			</AnimatePresence>

			<audio
				ref={audioRef}
				src="/song/1114.mp3"
				onEnded={handleAudioEnd}
			/>
		</div>
	);
};

export default Hello;
