import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { TvIcon } from '../icons.js';

const config: ComponentMeta<typeof TvIcon> = {
	component: TvIcon,
};
export default config;

// eslint-disable-next-line react/function-component-definition
export const Default: ComponentStory<typeof TvIcon> = (props) => (
	<TvIcon {...props} />
);
