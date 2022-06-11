import classNames from 'classnames';
import Link from 'next/link';

/**
 * The available navbar item.
 *
 * It is not directly related to the page.
 */
export enum NavbarItem {
	Recommends = 'recommended',
	Favorites = 'favorites',
	HotCourses = 'hot_courses',
	Hashtags = 'hashtags',
}

export const NavbarItemUrlMap: Record<NavbarItem, string> = {
	[NavbarItem.Recommends]: '/recommends',
	[NavbarItem.Favorites]: '/favorites',
	[NavbarItem.HotCourses]: '/hot-courses',
	[NavbarItem.Hashtags]: '/hashtags',
};

export const NavbarItemDisplayNameMap: Record<NavbarItem, string> = {
	[NavbarItem.Recommends]: '個人推薦',
	[NavbarItem.Favorites]: '收藏課程',
	[NavbarItem.HotCourses]: '話題課程',
	[NavbarItem.Hashtags]: 'Hashtags',
};

export type NavbarItemsProps = {
	/**
	 * 要選取的 Navbar 項目。
	 */
	selected?: NavbarItem;
};

export const NavbarItems = (props: NavbarItemsProps) => {
	return (
		<section className="flex items-center gap-5 navbar-items">
			{Object.values(NavbarItem).map((item) => {
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
};

export default NavbarItems;
