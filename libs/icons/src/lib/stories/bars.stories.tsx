import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { BarsIcon } from '../icons.js';

const config: ComponentMeta<typeof BarsIcon> = {
	component: BarsIcon,
};
export default config;

// eslint-disable-next-line react/function-component-definition
export const Default: ComponentStory<typeof BarsIcon> = (props) => (
	<BarsIcon {...props} />
);
