import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { SearchIcon } from '../icons.js';

const config: ComponentMeta<typeof SearchIcon> = {
	component: SearchIcon,
};
export default config;

// eslint-disable-next-line react/function-component-definition
export const Default: ComponentStory<typeof SearchIcon> = (props) => (
	<SearchIcon {...props} />
);
