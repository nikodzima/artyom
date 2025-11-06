import React, { useEffect, useState } from "react";

export const CatchFallingObjects = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
	const [basketX, setBasketX] = useState(50);
	const [falling, setFalling] = useState<{ x: number; y: number; emoji: string }[]>([]);
	const [caught, setCaught] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setFalling((prev) => [...prev, { x: Math.random() * 100, y: 0, emoji: "🍎" }]);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const fall = setInterval(() => {
			setFalling((prev) =>
				prev
					.map((f) => ({ ...f, y: f.y + 5 }))
					.filter((f) => f.y < 100)
			);
		}, 100);
		return () => clearInterval(fall);
	}, []);

	useEffect(() => {
		setFalling((prev) =>
			prev.filter((f) => {
				const caughtIt = Math.abs(f.x - basketX) < 10 && f.y > 90;
				if (caughtIt) setCaught((c) => c + 1);
				return !caughtIt;
			})
		);
	}, [basketX, falling]);

	useEffect(() => {
		if (caught >= 5) onComplete(true);
	}, [caught]);

	return (
		<div className="relative w-full h-64 bg-white/10 overflow-hidden rounded-xl">
			{falling.map((f, i) => (
				<div
					key={i}
					className="absolute text-2xl"
					style={{ left: `${f.x}%`, top: `${f.y}%`, transition: "top 0.1s linear" }}
				>
					{f.emoji}
				</div>
			))}
			<div
				className="absolute bottom-0 w-10 h-4 bg-pink-400 rounded-md"
				style={{ left: `${basketX}%`, transform: "translateX(-50%)" }}
			/>
			<p className="absolute top-2 left-2 text-white">Поймано: {caught}/5</p>
			<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4">
				<button onClick={() => setBasketX((x) => Math.max(0, x - 10))}>⬅️</button>
				<button onClick={() => setBasketX((x) => Math.min(100, x + 10))}>➡️</button>
			</div>
		</div>
	);
};
