import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import Header from './header.js';

/**
 * The available navbar item.
 *
 * It is not directly related to the page.
 */
export enum NavbarEntry {
	Recommends = 'recommended',
	Favorites = 'favorites',
	HotCourses = 'hot_courses',
	Hashtags = 'hashtags',
}

export const NavbarItemUrlMap: Record<NavbarEntry, string> = {
	[NavbarEntry.Recommends]: '/recommends',
	[NavbarEntry.Favorites]: '/favorites',
	[NavbarEntry.HotCourses]: '/hot-courses',
	[NavbarEntry.Hashtags]: '/hashtags',
};

export const NavbarItemDisplayNameMap: Record<NavbarEntry, string> = {
	[NavbarEntry.Recommends]: '個人推薦',
	[NavbarEntry.Favorites]: '收藏課程',
	[NavbarEntry.HotCourses]: '話題課程',
	[NavbarEntry.Hashtags]: 'Hashtags',
};

export type NavbarItemsProps = {
	/**
	 * 要選取的 Navbar 項目。
	 */
	selected?: NavbarEntry;
};

/**
 * NavbarItems 的項目。
 *
 * `selected` 會讓指定的 Navbar 項目變為粗體。
 * 通常與 {@link Header} 配合使用。
 *
 * @example
 * import { NavbarItems, NavbarEntry } from "@courseapi-fe/components";
 *
 * // 沒有選取任何項目。
 * <NavbarItems />
 *
 * // 選取「個人推薦」(Recommends) 項目。
 * <NavbarItems selected={NavbarEntry.Recommended} />
 */
export function NavbarItems(props: NavbarItemsProps) {
	return (
		<section className="flex items-center gap-5 navbar-items">
			{Object.values(NavbarEntry).map((item) => {
				const url = NavbarItemUrlMap[item] as string | undefined;
				const displayName = NavbarItemDisplayNameMap[item] as
					| string
					| undefined;

				// 有時候，因為 Storybook 的未知 bug，
				// 所以 item 會得出非預期的值。
				// 此時，url 和 displayName 會是 null。
				//
				// 因此，我們將 NavbarItem*Map[item] 取出的值
				// 假設為 string | null，然後再檢查是不是 null；
				// 如果是 null，則不顯示。
				if (!url || !displayName) return null;

				return (
					<Link key={item} href={url}>
						<span
							className={classNames('cursor-pointer', {
								'font-bold': props.selected === item,
							})}
						>
							{displayName}
						</span>
					</Link>
				);
			})}
		</section>
	);
}

export default NavbarItems;
