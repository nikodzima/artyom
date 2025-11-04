import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const emojis = ["🍕", "🐸", "🐱", "🍰", "🦄", "🍩", "🍔", "🐶"];

interface Card {
	id: number;
	emoji: string;
	isOpen: boolean;
	isMatched: boolean;
}

export const MemoryGame = ({ onSuccess }: { onSuccess: () => void }) => {
	const [cards, setCards] = useState<Card[]>([]);
	const [selected, setSelected] = useState<Card[]>([]);
	const [isChecking, setIsChecking] = useState(false);

	// создаём колоду из пар
	useEffect(() => {
		const pairs = [...emojis, ...emojis].slice(0, 16); // максимум 16 карточек
		const shuffled = pairs
			.map((emoji, i) => ({ id: i, emoji, isOpen: false, isMatched: false }))
			.sort(() => Math.random() - 0.5);
		setCards(shuffled);
	}, []);

	const handleClick = (card: Card) => {
		if (card.isOpen || card.isMatched || isChecking) return;

		const newCards = cards.map((c) =>
			c.id === card.id ? { ...c, isOpen: true } : c
		);
		setCards(newCards);
		setSelected((prev) => [...prev, { ...card, isOpen: true }]);
	};

	// проверка выбранных карточек
	useEffect(() => {
		if (selected.length === 2) {
			setIsChecking(true);
			const [first, second] = selected;

			if (first.emoji === second.emoji) {
				// совпадение
				setCards((prev) =>
					prev.map((c) =>
						c.emoji === first.emoji ? { ...c, isMatched: true } : c
					)
				);
				setTimeout(() => {
					setSelected([]);
					setIsChecking(false);
				}, 300);
			} else {
				// несовпадение — закрываем через 800ms
				setTimeout(() => {
					setCards((prev) =>
						prev.map((c) =>
							c.id === first.id || c.id === second.id ? { ...c, isOpen: false } : c
						)
					);
					setSelected([]);
					setIsChecking(false);
				}, 800);
			}
		}
	}, [selected]);

	// проверка окончания игры
	useEffect(() => {
		if (cards.length > 0 && cards.every((c) => c.isMatched)) {
			setTimeout(() => onSuccess(), 500);
		}
	}, [cards]);

	return (
		<div className="grid grid-cols-4 gap-2 w-full max-w-md mx-auto">
			{cards.map((card) => (
				<motion.button
					key={card.id}
					onClick={() => handleClick(card)}
					className="w-full aspect-square rounded-lg bg-white/20 flex items-center justify-center text-3xl text-white shadow-lg"
					whileTap={{ scale: 0.9 }}
				>
					<AnimatePresence>
						{card.isOpen || card.isMatched ? (
							<motion.span
								key="emoji"
								initial={{ rotateY: 90, opacity: 0 }}
								animate={{ rotateY: 0, opacity: 1 }}
								exit={{ rotateY: 90, opacity: 0 }}
								transition={{ duration: 0.3 }}
							>
								{card.emoji}
							</motion.span>
						) : null}
					</AnimatePresence>
				</motion.button>
			))}
		</div>
	);
};
