import React from "react";

import { motion } from "framer-motion";

export default function FloatingDecor() {
	return (
		<>
			<motion.div
				className="absolute w-20 h-20 bg-white/30 rounded-full top-10 left-6"
				animate={{ y: [0, 10, 0], rotate: [0, 20, 0] }}
				transition={{ repeat: Infinity, duration: 3 }}
			/>
			<motion.div
				className="absolute w-14 h-14 bg-white/20 rounded-full bottom-20 right-10"
				animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }}
				transition={{ repeat: Infinity, duration: 4 }}
			/>
		</>
	);
}
