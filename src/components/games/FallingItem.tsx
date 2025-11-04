import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const items = ["🍕", "🍰", "🍩", "🍔", "🍿", "🍪", "🍉"];

interface FallingItem {
	id: number;
	emoji: string;
	x: number;
	y: number;
}

export const CatchGame = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
	const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
	const [score, setScore] = useState(0);
	const [timer, setTimer] = useState(5); // 15 секунд на игру

	useEffect(() => {
		// создаём новые падающие предметы каждые 700ms
		const interval = setInterval(() => {
			const newItem: FallingItem = {
				id: Date.now(),
				emoji: items[Math.floor(Math.random() * items.length)],
				x: Math.random() * 90, // позиция по горизонтали %
				y: 0,
			};
			setFallingItems((prev) => [...prev, newItem]);
		}, 700);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		// таймер игры
		const timerInterval = setInterval(() => {
			setTimer((t) => {
				if (t <= 1) {
					clearInterval(timerInterval);
					console.log(score)

					onComplete(score >= 5); // проход если набрал 5 очков
					return 0;
				}
				return t - 1;
			});
		}, 1000);

		return () => clearInterval(timerInterval);
	}, [score]);

	const handleCatch = (id: number) => {
		setScore((s) => s + 1);
		setFallingItems((prev) => prev.filter((item) => item.id !== id));
	};

	return (
		<div className="w-full h-[400px] relative bg-blue-500/30 rounded-xl overflow-hidden p-2 flex flex-col items-center justify-start">
			<p className="text-white text-lg mb-2">Лови предметы! 🎯</p>
			<p className="text-white mb-2">Очки: {score}</p>
			<p className="text-white mb-4">Время: {timer}s</p>

			{fallingItems.map((item) => (
				<motion.div
					key={item.id}
					initial={{ y: 0, x: `${item.x}%` }}
					animate={{ y: 350 }}
					transition={{ duration: 3, ease: "linear" }}
					onClick={() => handleCatch(item.id)}
					className="absolute text-3xl cursor-pointer select-none"
				>
					{item.emoji}
				</motion.div>
			))}
		</div>
	);
};
