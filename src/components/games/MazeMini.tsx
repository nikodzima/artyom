import React, { useState } from "react";

export const MazeMini = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
	const [pos, setPos] = useState({ x: 50, y: 50 });
	const goal = { x: 80, y: 80 };

	const move = (dx: number, dy: number) => {
		setPos((p) => {
			const np = { x: p.x + dx, y: p.y + dy };
			if (Math.abs(np.x - goal.x) < 5 && Math.abs(np.y - goal.y) < 5) onComplete(true);
			return np;
		});
	};

	return (
		<div className="relative w-full h-full bg-white/10">
			<div
				className="absolute w-8 h-8 bg-green-400 rounded-full"
				style={{ top: `${goal.y}%`, left: `${goal.x}%` }}
			></div>
			<div
				className="absolute w-10 h-10 bg-pink-500 rounded-full"
				style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
			></div>
			<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
				{[
					{ label: "⬆️", dx: 0, dy: -5 },
					{ label: "⬇️", dx: 0, dy: 5 },
					{ label: "⬅️", dx: -5, dy: 0 },
					{ label: "➡️", dx: 5, dy: 0 },
				].map((b) => (
					<button
						key={b.label}
						onClick={() => move(b.dx, b.dy)}
						className="bg-white/30 px-3 py-2 rounded-md text-xl active:scale-90"
					>
						{b.label}
					</button>
				))}
			</div>
		</div>
	);
};
