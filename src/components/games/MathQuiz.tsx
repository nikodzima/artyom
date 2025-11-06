import React, { useState, useEffect } from "react";

export const MathQuiz = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
	const [question, setQuestion] = useState({ a: 0, b: 0 });
	const [answer, setAnswer] = useState("");
	const [correct, setCorrect] = useState(0);

	const newQuestion = () => {
		setQuestion({ a: Math.floor(Math.random() * 9) + 1, b: Math.floor(Math.random() * 9) + 1 });
		setAnswer("");
	};

	useEffect(() => {
		newQuestion();
	}, []);

	const handleSubmit = () => {
		if (parseInt(answer) === question.a + question.b) {
			setCorrect((c) => c + 1);
			if (correct + 1 >= 5) return onComplete(true);
		}
		newQuestion();
	};

	return (
		<div className="flex flex-col items-center gap-3">
			<p className="text-white text-lg">
				Сколько будет {question.a} + {question.b}?
			</p>
			<input
				value={answer}
				onChange={(e) => setAnswer(e.target.value)}
				className="px-4 py-2 rounded text-black text-center w-20"
				type="number"
			/>
			<button
				onClick={handleSubmit}
				className="bg-pink-500 text-white px-4 py-2 rounded-lg active:scale-95"
			>
				Ответить
			</button>
			<p className="text-white">Правильно: {correct}/5</p>
		</div>
	);
};
