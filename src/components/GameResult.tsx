import React from "react";
import { motion } from "framer-motion";

const successMessages = [
	"Сойдёт",
	"Сярик бы справился лучше",
	"Детская хуйня. Нечем гордиться 😎",
	"Под пивко потянет",
];

const failMessages = [
	"Ну ты чмо",
	"На заводе так же?",
	"Видно что сосал",
	"Проебал - выпил",
];

export const GameResult: React.FC<{
	success: boolean;
	onComplete: () => void;
	onLose: () => void;
}> = ({ success, onComplete, onLose }) => {
	// Выбираем случайное сообщение
	const message = success
		? successMessages[Math.floor(Math.random() * successMessages.length)]
		: failMessages[Math.floor(Math.random() * failMessages.length)];

	return (
		<motion.div
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			className="flex flex-col items-center justify-center h-full space-y-6"
		>
			<h2 className="text-3xl font-bold text-center">{message}</h2>
			<button
				onClick={() => (success ? onComplete() : onLose())}
				className={`px-8 py-3 rounded-full font-bold text-lg ${success ? "bg-green-400 text-white" : "bg-red-400 text-white"
					} shadow-md active:scale-95`}
			>
				{success ? "Перейти к загадке" : "Попробовать снова"}
			</button>
		</motion.div>
	);
};
