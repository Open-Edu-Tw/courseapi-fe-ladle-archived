import Image, { ImageProps } from 'next/image';
import React from 'react';

import BarsSvg from './icons-svg/bars.svg';
import DownloadSvg from './icons-svg/download.svg';
import FilledStarSvg from './icons-svg/filled-star.svg';
import LinkSvg from './icons-svg/link.svg';
import SearchSvg from './icons-svg/search.svg';
import ShareSvg from './icons-svg/share.svg';
import StrokeStarSvg from './icons-svg/stroke-star.svg';
import TVSvg from './icons-svg/tv.svg';

export type IconProps = Partial<ImageProps>;
const Icon = ({
	id,
	icon,
	width = '14px',
	height = '14px',
	...props
}: {
	id: string;
	icon: ImageProps['src'];
} & IconProps) => {
	return (
		<Image
			unoptimized
			alt={id}
			src={icon}
			width={width}
			height={height}
			{...props}
		/>
	);
};

const createIconComponent = (id: string, icon: ImageProps['src']) =>
	React.memo((props?: IconProps) => <Icon id={id} icon={icon} {...props} />);

export const BarsIcon = createIconComponent('bars', BarsSvg);
export const DownloadIcon = createIconComponent('download', DownloadSvg);
export const FilledStarIcon = createIconComponent('filled star', FilledStarSvg);
export const LinkIcon = createIconComponent('link', LinkSvg);
export const SearchIcon = createIconComponent('search', SearchSvg);
export const ShareIcon = createIconComponent('share', ShareSvg);
export const StrokeStarIcon = createIconComponent('stroke star', StrokeStarSvg);
export const TvIcon = createIconComponent('stroke star', TVSvg);
