import * as React from 'react';

export function FilledStarIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M5.80418 1.70565L4.21703 4.92371L0.665984 5.44142C0.0291782 5.53378 -0.22603 6.31885 0.235775 6.7685L2.80487 9.27197L2.19723 12.8084C2.08786 13.4477 2.76112 13.9265 3.32501 13.6275L6.50175 11.9577L9.67848 13.6275C10.2424 13.9241 10.9156 13.4477 10.8063 12.8084L10.1986 9.27197L12.7677 6.7685C13.2295 6.31885 12.9743 5.53378 12.3375 5.44142L8.78647 4.92371L7.19932 1.70565C6.91494 1.13204 6.09098 1.12475 5.80418 1.70565Z"
				className="fill-slate-800 dark:fill-slate-200"
			/>
		</svg>
	);
}
