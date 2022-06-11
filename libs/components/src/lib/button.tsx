import type { ReactNode } from 'react';
import type { RequireAtLeastOne } from 'type-fest';

import InvalidParamReceived from '../exceptions/invalid-parameter-received.js';

export type ButtonProps = RequireAtLeastOne<
	{
		size?: 'medium' | 'large' | 'xl';
		color?: 'basic' | 'accent';
		label?: string;
		icon?: ReactNode;
	},
	'label' | 'icon'
> &
	React.ComponentPropsWithoutRef<'button'>;

export const Button = ({
	size = 'medium',
	color = 'basic',
	label,
	icon,
	...props
}: ButtonProps) => {
	if (!label && !icon)
		throw new InvalidParamReceived(
			'should be at least one of `label` or `icon`.',
		);

	const colorClass = getColor(color);
	const sizeClass = getSize(size);

	return (
		<button
			type="button"
			// FIXME:  min-height will be much better.
			className={`text-primary ${colorClass} ${sizeClass} rounded flex gap-3 items-center justify-items-center h-8`}
			{...props}
		>
			{icon && <div>{icon}</div>}
			{label && <div>{label}</div>}
		</button>
	);
};

const colorTable = {
	basic: 'bg-secondary',
	accent: 'bg-accent-background',
} as const;

/**
 * Get the background color class according to the `size` property of {@link ButtonProps}.
 *
 * @param color The color of the button.
 * @returns The according CSS class of this color.
 */
const getColor = (color: keyof typeof colorTable) => colorTable[color];

const sizeTable = {
	medium: 'px-5 py-2',
	large: 'px-10 py-4',
	xl: 'px-20 py-6 text-xl',
} as const;

/**
 * Get the class according to the `size` property of {@link ButtonProps}.
 *
 * @param size The size property of {@link ButtonProps}.
 * @returns The according CSS class of this size.
 */
const getSize = (size: keyof typeof sizeTable) => sizeTable[size];

export default Button;
