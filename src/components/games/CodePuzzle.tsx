import React, { useState, useEffect } from "react";

export const CodePuzzle = ({ onComplete }: { onComplete: (s: boolean) => void }) => {
	const CODE_LENGTH = 5;
	const ALL_DIGITS = [...Array(10).keys()].map(String); // ["0", "1", ..., "9"]

	const [target, setTarget] = useState<string>("");
	const [input, setInput] = useState<string>("");
	const [digits, setDigits] = useState<string[]>([]);

	// Перемешивание массива
	const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

	// Генерация нового кода при старте
	useEffect(() => {
		let code = "";
		while (code.length < CODE_LENGTH) {
			code += Math.floor(Math.random() * 10).toString();
		}
		setTarget(code);
		setDigits(shuffle(ALL_DIGITS));
		setInput("");
	}, []);

	const handleAdd = (d: string) => {
		if (input.length >= CODE_LENGTH) return;

		const newInput = input + d;
		setInput(newInput);
		setDigits(shuffle(ALL_DIGITS)); // перемешиваем кнопки после каждого клика

		if (newInput.length === CODE_LENGTH) {
			setTimeout(() => onComplete(newInput === target), 200); // проверка после ввода 5 цифр
		}
	};

	const handleReset = () => {
		setInput("");
		setDigits(shuffle(ALL_DIGITS));
	};

	return (
		<div className="flex flex-col items-center gap-4 w-full px-4">
			<p className="text-white text-lg text-center">
				Введи код из 5 цифр (используй эти:{" "}
				{target.split("").join(" ")})
			</p>

			<div className="grid grid-cols-5 gap-2 w-full max-w-md mt-2">
				{digits.map((d) => (
					<button
						key={d + Math.random()} // уникальный ключ для ререндеров
						onClick={() => handleAdd(d)}
						className="bg-white/20 text-white text-xl px-3 py-2 rounded-full active:scale-90 transition-all"
					>
						{d}
					</button>
				))}
			</div>

			<p className="text-2xl font-bold mt-4 tracking-widest">{input}</p>

			{input.length > 0 && (
				<button
					onClick={handleReset}
					className="mt-2 bg-white/20 text-white px-4 py-2 rounded-full active:scale-95"
				>
					Сброс
				</button>
			)}
		</div>
	);
};
