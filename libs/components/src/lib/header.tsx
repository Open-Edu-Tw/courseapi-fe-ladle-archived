import { BarsIcon } from '@courseapi-fe/icons';
import type { Nullify } from '@courseapi-fe/types';
import { debounce } from 'lodash-es';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import toeduIcon from 'public/logo.png';
import type { ChangeEvent } from 'react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import type { NavbarItemsProps } from './navbar-items';
import { NavbarItems } from './navbar-items';
import { SearchBar, SearchBarVariant } from './search-bar';

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
	| (HpStyle<HeaderStyle.Mobile> &
			HpSearchIcon &
			HpNoSearchBar &
			HpNoNavbarItems &
			HpMenu)
	| (HpStyle<HeaderStyle.MobileWithSearchBar> &
			HpSearchIcon &
			HpSearchBar &
			HpNoNavbarItems &
			HpMenu)
	| (HpStyle<HeaderStyle.Desktop> &
			HpNoSearchIcon &
			HpSearchBar &
			HpNavbarItems &
			HpNoMenu);

type HpStyle<S extends HeaderStyle> = { style: S };

type HpSearchIcon = {
	/**
	 * 如果使用者按下「搜尋」按鈕，則觸發這個 event。
	 */
	onSearchIconPressed: () => void;
};

type HpSearchBar = {
	/**
	 * 當使用者輸入關鍵字時，或按下 Enter 時，觸發這個 event。
	 *
	 * 這個請求已經 debounced，亦即只會在使用者停止輸入後才會觸發。
	 * 所以不需要在外層設定 debounce。
	 */
	onSearch: (keyword: string) => void;
};

type HpNavbarItems = NavbarItemsProps;

type HpMenu = {
	/**
	 * 當使用者按下展開 menu 的按鈕時，觸發這個 event。
	 */
	onToggleMenu: () => void;
};

type HpNoSearchIcon = Nullify<HpSearchIcon>;
type HpNoSearchBar = Nullify<HpSearchBar>;
type HpNoNavbarItems = Nullify<HpNavbarItems>;
type HpNoMenu = Nullify<HpMenu>;

/**
 * CourseAPI 的 Header 組件。
 *
 * - 如果 style 是 `Mobile`，則要 handle 搜尋按鈕按下，以及選單按鈕按下的事件。
 * - 如果 style 是 `MobileWithSearchBar`，則要 handle 搜尋按鈕按下、使用者搜尋，以及選單按鈕按下的事件。
 * - 如果 style 是 `Desktop`，則要 handle 使用者搜尋的事件，以及管理目前選擇的導覽列項目。
 *
 * @example
 * import { Header, HeaderStyle } from '@courseapi-fe/components';
 *
 * const [currentStyle, setCurrentStyle] = useState<HeaderStyle>(HeaderStyle.Mobile);
 * const onSearchIconPressed = useCallback(
 *    () => setCurrentStyle(
 *      currentStyle === HeaderStyle.Mobile
 *        ? HeaderStyle.MobileWithSearchBar
 *        : HeaderStyle.Mobile
 *    ),
 *    [currentStyle, setCurrentStyle],
 * );
 *
 * <Header
 *    style={currentStyle}
 *    onSearchIconPressed={onSearchIconPressed}
 *    onSearch={currentStyle === HeaderStyle.MobileWithSearchBar ? onSearch : undefined}
 *    onToggleMenu={toggleMenu}
 * />
 */
export function Header({
	style,
	onSearchIconPressed,
	onSearch,
	selected,
	onToggleMenu,
}: HeaderProps) {
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
}

function MobileHeader({
	onSearchIconPressed,
	onToggleMenu,
}: HpSearchIcon & HpMenu) {
	return (
		<div className="flex items-center justify-between w-full h-full">
			<HeaderMenu onToggleMenu={onToggleMenu} />
			<Logo />
			<SearchBar
				variant={SearchBarVariant.Collapsed}
				onSearchIconPressed={onSearchIconPressed}
			/>
		</div>
	);
}

function MobileWithSearchBarHeader({
	onSearchIconPressed,
	onSearch,
	onToggleMenu,
}: HpSearchBar & HpSearchIcon & HpMenu) {
	return (
		<div className="flex flex-col w-full h-full gap-3">
			<MobileHeader
				onSearchIconPressed={onSearchIconPressed}
				onToggleMenu={onToggleMenu}
			/>
			<InternalExpandedSearchBar isFullWidth onSearch={onSearch} />
		</div>
	);
}

function DesktopHeader({ onSearch, selected }: HpSearchBar & HpNavbarItems) {
	return (
		<div className="flex items-center justify-between w-full h-full">
			<Logo />
			<NavbarItems selected={selected} />
			<InternalExpandedSearchBar isFullWidth={false} onSearch={onSearch} />
		</div>
	);
}

function Logo() {
	return (
		<Image
			src={toeduIcon as ImageProps['src']}
			alt="TOEDU"
			width="100px"
			height="30px"
		/>
	);
}

function HeaderMenu({ onToggleMenu }: HpMenu) {
	return (
		<button type="button" onClick={onToggleMenu}>
			<BarsIcon />
		</button>
	);
}

function InternalExpandedSearchBar({
	onSearch,
	isFullWidth,
}: HpSearchBar & { isFullWidth: boolean }) {
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
			variant={SearchBarVariant.Expanded}
			content={content}
			isFullWidth={isFullWidth}
			onChange={onChangeEvent}
		/>
	);
}

export default Header;
