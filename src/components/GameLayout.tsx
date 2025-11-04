import React, { useState } from "react";
import { motion } from "framer-motion";
import { GameResult } from "./GameResult";
import { useNavigate } from 'react-router-dom';
import Riddle from './Riddle';

interface GameLayoutProps {
	title: string;
	rules: string;
	Game: React.ComponentType<{ onComplete: (ok: boolean) => void }>;
	riddle: string;
}

export const GameLayout: React.FC<GameLayoutProps> = ({
	title,
	rules,
	Game,
	riddle
}) => {
	const [phase, setPhase] = useState<"rules" | "play" | "result" | 'riddle'>("rules");
	const [success, setSuccess] = useState<boolean | null>(null);


	const handleComplete = (ok: boolean) => {
		setSuccess(ok);
		setPhase("result");
	};

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-purple-500 text-white text-center p-4">
			{phase === "rules" && (
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-4"
				>
					<h2 className="text-3xl font-bold">{title}</h2>
					<p className="text-lg opacity-90">{rules}</p>
					<button
						onClick={() => setPhase("play")}
						className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold shadow-md active:scale-95"
					>
						Начать
					</button>
				</motion.div>
			)}

			{phase === "play" && (
				<motion.div
					key="play"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="w-full h-full flex items-center justify-center"
				>
					<Game onComplete={handleComplete} />
				</motion.div>
			)}

			{phase === "result" && success !== null && (
				<GameResult onLose={() => setPhase('play')} onComplete={() => setPhase("riddle")} success={success} />
			)}

			{phase === "riddle" && <Riddle text={riddle} />}
		</div>
	);
};
