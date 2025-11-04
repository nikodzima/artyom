import React, { PropsWithChildren } from "react";

export default function PageLayout({ children }: PropsWithChildren) {
	return (
		<div className="w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 via-orange-400 to-yellow-300 relative text-center">
			{children}
		</div>
	);
}