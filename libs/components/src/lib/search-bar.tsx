import classNames from 'classnames';

import { SearchIcon } from './icons.js';

export type SbBarProps = {
	content?: string;
	isFullWidth?: boolean;

	/**
	 * The placeholder text.
	 *
	 * @default "搜尋課程、關鍵字或 Hashtag……"
	 */
	placeholderText?: string;
};

export type SearchBarProps = (
	| {
			variant: 'collapsed';
			content?: undefined;
			isFullWidth?: undefined;
			placeholderText?: undefined;
	  }
	| {
			variant: 'expanded';
			content?: string;
			isFullWidth?: boolean;

			/**
			 * The placeholder text.
			 *
			 * @default "搜尋課程、關鍵字或 Hashtag……"
			 */
			placeholderText?: string;
	  }
) & {
	/**
	 * Trigger when a user pressed the search icon.
	 */
	onSearchIconPressed?: () => void;
} & React.ComponentPropsWithoutRef<'input'>;

export const SearchBar = ({
	variant,
	content,
	placeholderText = '搜尋課程、關鍵字或 Hashtag……',
	onSearchIconPressed,
	isFullWidth,
	...inputProps
}: SearchBarProps) => {
	return (
		<section
			className={classNames(
				'flex gap-3 py-2 search-bar text-primary bg-secondary rounded text-sm',
				{
					'px-3': variant === 'collapsed',
					'px-5': variant === 'expanded',
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
			{variant === 'expanded' && placeholderText && (
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
};
