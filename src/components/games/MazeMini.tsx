import React, { useState, useEffect } from "react";

interface MazeMiniProps {
	onComplete: (s: boolean) => void;
}

export const MazeMini: React.FC<MazeMiniProps> = ({ onComplete }) => {
	const [pos, setPos] = useState({ x: 50, y: 50 });
	const goal = { x: 80, y: 80 };
	const [permissionGranted, setPermissionGranted] = useState(false);

	useEffect(() => {
		// iOS 13+ требует запроса разрешения
		const requestPermission = async () => {
			if (
				typeof DeviceOrientationEvent !== "undefined" &&
				typeof (DeviceOrientationEvent as any).requestPermission === "function"
			) {
				try {
					const res = await (DeviceOrientationEvent as any).requestPermission();
					if (res === "granted") setPermissionGranted(true);
				} catch (err) {
					console.warn("DeviceOrientation permission denied:", err);
				}
			} else {
				// не iOS или разрешение не требуется
				setPermissionGranted(true);
			}
		};
		requestPermission();
	}, []);

	useEffect(() => {
		if (!permissionGranted) return;

		const handleMotion = (event: DeviceOrientationEvent) => {
			if (event.gamma === null || event.beta === null) return;

			// регулировка скорости движения
			const dx = event.gamma / 8; // влево/вправо
			const dy = event.beta / 8;  // вперед/назад

			setPos((p) => {
				const np = {
					x: Math.min(100, Math.max(0, p.x + dx)),
					y: Math.min(100, Math.max(0, p.y + dy)),
				};

				// проверка на достижение цели
				if (Math.abs(np.x - goal.x) < 5 && Math.abs(np.y - goal.y) < 5) {
					onComplete(true);
				}
				return np;
			});
		};

		window.addEventListener("deviceorientation", handleMotion, true);

		return () => {
			window.removeEventListener("deviceorientation", handleMotion);
		};
	}, [permissionGranted, onComplete]);

	return (
		<div className="relative w-full h-full bg-white/10 overflow-hidden rounded-md">
			{/* цель */}
			<div
				className="absolute w-8 h-8 bg-green-400 rounded-full"
				style={{ top: `${goal.y}%`, left: `${goal.x}%` }}
			></div>

			{/* шарик */}
			<div
				className="absolute w-10 h-10 bg-pink-500 rounded-full transition-all duration-50"
				style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
			></div>

			{/* предупреждение для iOS */}
			{!permissionGranted && (
				<div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 text-white p-4 text-center">
					<p>Разрешите доступ к датчикам движения, чтобы играть:</p>
					<button
						className="mt-4 px-4 py-2 bg-white text-black rounded"
						onClick={async () => {
							if (
								typeof DeviceOrientationEvent !== "undefined" &&
								typeof (DeviceOrientationEvent as any).requestPermission === "function"
							) {
								const res = await (DeviceOrientationEvent as any).requestPermission();
								if (res === "granted") setPermissionGranted(true);
							}
						}}
					>
						Разрешить
					</button>
				</div>
			)}
		</div>
	);
};
