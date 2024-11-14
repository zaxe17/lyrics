import { useState, useEffect, useRef } from "react";
import { lyrics } from "../constants";

const Hello = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [visible, setVisible] = useState(false); // Initially hide lyrics
	const [isFinished, setIsFinished] = useState(false);
	const [started, setStarted] = useState(false); // New state to track if the lyrics have started
	const audioRef = useRef(null); // Reference to the audio element

	useEffect(() => {
		if (currentIndex >= lyrics.length) {
			setIsFinished(true);
			return;
		}

		if (!started) return; // Prevent lyrics from showing if not started

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
	}, [currentIndex, started]); // Depend on `started` to trigger effect

	const startLyrics = () => {
		setStarted(true); // Start the lyrics when button is clicked
		setIsFinished(false); // Reset finished state
		setCurrentIndex(0); // Reset to the first lyric
		if (audioRef.current) {
			audioRef.current.play(); // Play the audio
		}
	};

	const handleAudioEnd = () => {
		setStarted(false); // Show button again when audio ends
		setIsFinished(true); // Set finished state to true
	};

	return (
		<div className="h-screen flex items-center justify-center text-2xl font-semibold">
			{!started && (
				<button
					onClick={startLyrics}
					className="bg-blue-500 text-white py-2 px-4 rounded transition-all ease-in-out duration-300 hover:scale-110">
					Start!
				</button>
			)}
			{started && visible && (
				<div className="text-3xl text-center">{lyrics[currentIndex].text}</div>
			)}

			{/* Audio element with onEnded event */}
			<audio
				ref={audioRef}
				src="/song/1114.mp3"
				onEnded={handleAudioEnd}
			/>
		</div>
	);
};

export default Hello;
