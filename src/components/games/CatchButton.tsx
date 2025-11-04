import React, { useState } from "react";

export const CatchButton = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
	const [pos, setPos] = useState({ top: 50, left: 50 });
	const [hits, setHits] = useState(0);

	const move = () => setPos({ top: Math.random() * 80, left: Math.random() * 80 });

	const handleClick = () => {
		const newHits = hits + 1;
		setHits(newHits);
		if (newHits >= 5) onComplete(true);
		else move();
	};

	return (
		<div className="relative w-full h-full">
			<p className="absolute top-2 left-2 text-white text-sm">Сосал: {hits}/5 раз</p>
			<button
				onClick={handleClick}
				onMouseEnter={move}
				style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
				className="absolute bg-yellow-400 text-black px-4 py-2 rounded-full shadow-md active:scale-95"
			>
				Сосал!
			</button>
		</div>
	);
};
