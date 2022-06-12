import { SearchIcon } from '@courseapi-fe/icons';
import type { Nullify } from '@courseapi-fe/types';
import classNames from 'classnames';
import React from 'react';

export enum SearchBarVariant {
	Collapsed = 'collapsed',
	Expanded = 'expanded',
}

export type SbVariantProps<T extends SearchBarVariant> = { variant: T };

export type SbBarProps = {
	content: string;
	isFullWidth?: boolean;

	/**
	 * The placeholder text.
	 *
	 * @default "搜尋課程、關鍵字或 Hashtag……"
	 */
	placeholderText?: string;
};

export type SbIconProps = {
	/**
	 * Trigger when a user pressed the search icon.
	 */
	onSearchIconPressed?: () => void;
};

export type SearchBarProps =
	| (SbVariantProps<SearchBarVariant.Collapsed> &
			Nullify<SbBarProps> &
			Required<SbIconProps>)
	| (SbVariantProps<SearchBarVariant.Expanded> &
			SbBarProps &
			SbIconProps &
			React.ComponentPropsWithoutRef<'input'>);

/**
 * CourseAPI 的搜尋列。
 *
 * 有兩個變體：搜尋按鈕 (`collapsed`) 和搜尋列 (`expanded`)。用法見範例。
 *
 * @example
 * import { SearchBar, SearchBarVariant } from '@courseapi-fe/components';
 *
 * // 搜尋按鈕，需傳入按下按鈕的事件。
 * <SearchBar variant={SearchBarVariant.Collapsed} onSearchIconPressed={expandSearchBar}/>
 *
 * // 搜尋列，需傳入搜尋列的內容（可以做雙向綁定）。
 * const [content, setContent] = setState('');
 * <SearchBar variant={SearchBarVairant.Expanded} content={content} onChange={setContent} />
 */
export function SearchBar({
	variant,
	content,
	placeholderText = '搜尋課程、關鍵字或 Hashtag……',
	onSearchIconPressed,
	isFullWidth,
	...inputProps
}: SearchBarProps) {
	return (
		<section
			className={classNames(
				'flex gap-3 py-2 search-bar text-primary bg-secondary rounded text-sm',
				{
					'px-3': variant === SearchBarVariant.Collapsed,
					'px-5': variant === SearchBarVariant.Expanded,
				},
			)}
		>
			{/* add y-padding to make the button size match the input box */}
			<button
				type="button"
				className="flex items-center justify-center py-1"
				onClick={() => {
					if (onSearchIconPressed) onSearchIconPressed();
				}}
			>
				<SearchIcon />
			</button>
			{variant === SearchBarVariant.Expanded && placeholderText && (
				<input
					spellCheck
					className={classNames('bg-transparent focus:outline-none min-w-max', {
						'w-full': isFullWidth,
					})}
					type="search"
					// Make the size match the placeholder length.
					//
					// We make the size the 1.5 times the length of the placeholder,
					// as `placeholderText.length` did not consider the text size in Chinese.
					//
					// `1.5` is a magic number that makes the above work.
					// You can adjust it by yourself,
					// but I did not plan to separate it as a parameter.
					size={placeholderText.length * 1.5}
					placeholder={placeholderText}
					value={content}
					{...inputProps}
				/>
			)}
		</section>
	);
}
