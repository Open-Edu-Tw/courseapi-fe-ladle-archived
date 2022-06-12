import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { DownloadIcon } from '../icons.js';

const config: ComponentMeta<typeof DownloadIcon> = {
	component: DownloadIcon,
};
export default config;

// eslint-disable-next-line react/function-component-definition
export const Default: ComponentStory<typeof DownloadIcon> = (props) => (
	<DownloadIcon {...props} />
);
