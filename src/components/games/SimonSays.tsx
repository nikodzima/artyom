import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const colors = [
	"bg-red-500",
	"bg-blue-500",
	"bg-green-500",
	"bg-yellow-500",
];

export const SimonSays = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
	const [sequence, setSequence] = useState<number[]>([]);
	const [userInput, setUserInput] = useState<number[]>([]);
	const [active, setActive] = useState<number | null>(null);
	const [pressed, setPressed] = useState<number | null>(null);
	const [round, setRound] = useState(1);
	const [isShowing, setIsShowing] = useState(true);

	// Генерация и показ последовательности
	useEffect(() => {
		const newSeq = Array.from({ length: round }, () => Math.floor(Math.random() * 4));
		setSequence(newSeq);
		setUserInput([]);
		setIsShowing(true);

		let i = 0;
		const interval = setInterval(() => {
			setActive(newSeq[i]);
			setTimeout(() => setActive(null), 400);
			i++;
			if (i >= newSeq.length) {
				clearInterval(interval);
				setTimeout(() => setIsShowing(false), 500);
			}
		}, 700);
	}, [round]);

	const handleClick = (idx: number) => {
		if (isShowing) return; // нельзя кликать во время показа
		setPressed(idx);
		setTimeout(() => setPressed(null), 200);

		setUserInput((prev) => {
			const next = [...prev, idx];
			if (next[next.length - 1] !== sequence[next.length - 1]) {
				onComplete(false);
				return next;
			}
			if (next.length === sequence.length) {
				if (round === 5) onComplete(true);
				else setTimeout(() => setRound((r) => r + 1), 1000);
			}
			return next;
		});
	};

	return (
		<div className="flex flex-col items-center gap-6">
			<p className="text-white text-lg font-semibold">
				Этап {round} из 5
			</p>

			<div className="grid grid-cols-2 gap-4 w-48 mx-auto">
				{colors.map((c, i) => {
					const isActive = active === i;
					const isPressed = pressed === i;
					return (
						<motion.button
							key={i}
							onClick={() => handleClick(i)}
							className={`aspect-square rounded-lg border-4 transition-all duration-200 ${c} 
                ${isActive ? "opacity-100" : "opacity-60"}
                ${isPressed ? "border-white scale-105" : "border-transparent"}
              `}
							whileTap={{ scale: 0.95 }}
						/>
					);
				})}
			</div>
			{isShowing && (
				<p className="text-sm text-white/70 animate-pulse">
					Запоминай порядок...
				</p>
			)}
			{!isShowing && (
				<p className="text-sm text-white/70">Твоя очередь!</p>
			)}

		</div>
	);
};
