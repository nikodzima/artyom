import React, { useEffect, useState } from "react";

export const TapRush = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
	const [targets, setTargets] = useState<number[]>([]);
	const [score, setScore] = useState(0);
	const [timeLeft, setTimeLeft] = useState(10);

	useEffect(() => {
		const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (timeLeft <= 0) {
			onComplete(score >= 10);
		} else {
			const timer = setTimeout(() => {
				setTargets([Math.random(), Math.random()]);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [timeLeft]);

	return (
		<div className="relative w-full h-full overflow-hidden">
			<p className="absolute top-2 left-2 text-white text-sm">
				Очки: {score} / 10 | Время: {timeLeft}
			</p>
			{targets.length > 0 && (
				<div
					onClick={() => setScore((s) => s + 1)}
					className="absolute w-12 h-12 bg-pink-500 rounded-full"
					style={{
						top: `${targets[0] * 80 + 10}%`,
						left: `${targets[1] * 80 + 10}%`,
						transform: "translate(-50%, -50%)",
					}}
				></div>
			)}
		</div>
	);
};
