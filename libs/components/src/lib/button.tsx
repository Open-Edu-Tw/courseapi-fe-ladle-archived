import type { ReactNode } from 'react';
import React from 'react';
import type { RequireAtLeastOne } from 'type-fest';

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

/**
 * CourseAPI 的按鈕組件。
 *
 * @example
 * import { Button } from "@courseapi-fe/components";
 * import { DownloadIcon } from "@courseapi-fe/icons";
 *
 * <Button size="medium" color="basic" label="登入" />
 * <Button size="medium" color="accent" icon={<DownloadIcon />} />
 * <Button size="medium" color="accent" icon={<DownloadIcon />} label="下載 filename.zip" onClick={() => triggerDownload("filename.zip")}/>
 */
export function Button({
	size = 'medium',
	color = 'basic',
	label,
	icon,
	...props
}: ButtonProps) {
	if (!label && !icon)
		throw new TypeError('should be at least one of `label` or `icon`.');

	return (
		<button
			type="button"
			// FIXME:  min-height will be much better.
			className={`text-primary ${colorClass[color]} ${sizeClass[size]} rounded flex gap-3 items-center justify-items-center h-8`}
			{...props}
		>
			{icon && <div>{icon}</div>}
			{label && <div>{label}</div>}
		</button>
	);
}

const colorClass = {
	basic: 'bg-slate-200 dark:bg-slate-700',
	accent: 'bg-blue-200 dark:bg-sky-700',
} as const;

const sizeClass = {
	medium: 'px-5 py-2',
	large: 'px-10 py-4',
	xl: 'px-20 py-6 text-xl',
} as const;

export default Button;
