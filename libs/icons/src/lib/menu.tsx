import * as React from 'react';

export function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<line
				y1="2.5"
				x2="14"
				y2="2.5"
				className="stroke-slate-800 dark:stroke-slate-200"
			/>
			<line
				y1="6.5"
				x2="14"
				y2="6.5"
				className="stroke-slate-800 dark:stroke-slate-200"
			/>
			<line
				y1="10.5"
				x2="14"
				y2="10.5"
				className="stroke-slate-800 dark:stroke-slate-200"
			/>
		</svg>
	);
}
