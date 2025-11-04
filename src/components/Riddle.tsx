import { motion } from "framer-motion";
import React from "react";

interface RiddleProps {
	text: string;
}

export default function Riddle({ text }: RiddleProps) {
	return (
		<motion.div
			key="riddle"
			initial={{ opacity: 0, y: 30, rotate: -5 }}
			animate={{ opacity: 1, y: 0, rotate: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.6 }}
			className="text-white text-xl px-6 font-semibold drop-shadow-md leading-relaxed"
		>
			{text}
		</motion.div>
	);
}
