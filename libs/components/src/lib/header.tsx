import { debounce } from 'lodash-es';
import Image from 'next/image';
import toeduIcon from 'public/logo.png';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { BarsIcon } from './icons.js';
import { NavbarItems, NavbarItemsProps } from './navbar-items.js';
import { SearchBar } from './search-bar.js';

export enum HeaderStyle {
	MobileWithSearchBar = 'mobile_with_search_bar',
	Mobile = 'mobile',
	Desktop = 'desktop',
}

/**
 * 使用者停止輸入幾毫秒後才觸發 onSearch？
 */
const searchDebounceSeconds = 500;

export type HeaderProps =
	| HeaderConfig<HeaderStyle.Mobile, true, false, false, true>
	| HeaderConfig<HeaderStyle.MobileWithSearchBar, true, true, false, true>
	| HeaderConfig<HeaderStyle.Desktop, false, true, true, false>;

type HpSearchIcon = {
	/**
	 * 如果使用者按下「搜尋」按鈕，則觸發這個 event。
	 */
	onSearchIconPressed?: () => void;
};

type HpSearchBar = {
	/**
	 * 當使用者輸入關鍵字時，或按下 Enter 時，觸發這個 event。
	 *
	 * 這個請求已經 debounced，亦即只會在使用者停止輸入後才會觸發。
	 * 所以不需要在外層設定 debounce。
	 */
	onSearch?: (keyword: string) => void;
};

type HpNavbarItems = NavbarItemsProps;

type HpMenu = {
	/**
	 * 當使用者按下展開 menu 的按鈕時，觸發這個 event。
	 */
	onToggleMenu: () => void;
};

/**
 * 根據設定
 */
type HeaderConfig<
	Style extends HeaderStyle,
	HasSearchIcon extends boolean,
	HasSearchBar extends boolean,
	HasNavbarItems extends boolean,
	HasMenu extends boolean,
> = { style: Style } & (HasSearchIcon extends true
	? HpSearchIcon
	: { onSearchIconPressed?: undefined }) &
	(HasSearchBar extends true ? HpSearchBar : { onSearch?: undefined }) &
	(HasNavbarItems extends true ? HpNavbarItems : { selected?: undefined }) &
	(HasMenu extends true ? HpMenu : { onToggleMenu?: undefined });

export const Header = ({
	style,
	onSearchIconPressed,
	onSearch,
	selected,
	onToggleMenu,
}: HeaderProps) => {
	const InnerHeader = useCallback(() => {
		switch (style) {
			case HeaderStyle.Desktop:
				return <DesktopHeader selected={selected} onSearch={onSearch} />;
			case HeaderStyle.Mobile:
				return (
					<MobileHeader
						onSearchIconPressed={onSearchIconPressed}
						onToggleMenu={onToggleMenu}
					/>
				);
			case HeaderStyle.MobileWithSearchBar:
				return (
					<MobileWithSearchBarHeader
						onSearch={onSearch}
						onSearchIconPressed={onSearchIconPressed}
						onToggleMenu={onToggleMenu}
					/>
				);
			default:
				throw new TypeError('not a valid HeaderStyle');
		}
	}, [onSearch, onSearchIconPressed, onToggleMenu, selected, style]);

	return (
		<header>
			<InnerHeader />
		</header>
	);
};

const MobileHeader = ({
	onSearchIconPressed,
	onToggleMenu,
}: HpSearchIcon & HpMenu) => {
	return (
		<div className="flex items-center justify-between w-full h-full">
			<HeaderMenu onToggleMenu={onToggleMenu} />
			<Logo />
			<SearchBar
				variant="collapsed"
				onSearchIconPressed={onSearchIconPressed}
			/>
		</div>
	);
};

const MobileWithSearchBarHeader = ({
	onSearchIconPressed,
	onSearch,
	onToggleMenu,
}: HpSearchBar & HpSearchIcon & HpMenu) => {
	return (
		<div className="flex flex-col w-full h-full gap-3">
			<MobileHeader
				onSearchIconPressed={onSearchIconPressed}
				onToggleMenu={onToggleMenu}
			/>
			<InternalExpandedSearchBar isFullWidth onSearch={onSearch} />
		</div>
	);
};

const DesktopHeader = ({ onSearch, selected }: HpSearchBar & HpNavbarItems) => {
	return (
		<div className="flex items-center justify-between w-full h-full">
			<Logo />
			<NavbarItems selected={selected} />
			<InternalExpandedSearchBar isFullWidth={false} onSearch={onSearch} />
		</div>
	);
};

const Logo = () => (
	<Image src={toeduIcon as string} alt="TOEDU" width="100px" height="30px" />
);

const HeaderMenu = ({ onToggleMenu }: HpMenu) => (
	<button type="button" onClick={onToggleMenu}>
		<BarsIcon />
	</button>
);

const InternalExpandedSearchBar = ({
	onSearch,
	isFullWidth,
}: HpSearchBar & { isFullWidth: boolean }) => {
	const [content, setContent] = useState('');
	const onChangeEvent = useMemo(
		() =>
			debounce((element: ChangeEvent<HTMLInputElement>) => {
				setContent(element.target.value);
			}, searchDebounceSeconds),
		[setContent],
	);

	useEffect(() => {
		if (onSearch) onSearch(content);
	}, [content, onSearch]);

	return (
		<SearchBar
			variant="expanded"
			isFullWidth={isFullWidth}
			onChange={onChangeEvent}
		/>
	);
};

export default Header;
