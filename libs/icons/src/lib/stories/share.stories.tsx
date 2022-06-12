import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { ShareIcon } from '../icons.js';

const config: ComponentMeta<typeof ShareIcon> = {
	component: ShareIcon,
};
export default config;

// eslint-disable-next-line react/function-component-definition
export const Default: ComponentStory<typeof ShareIcon> = (props) => (
	<ShareIcon {...props} />
);
