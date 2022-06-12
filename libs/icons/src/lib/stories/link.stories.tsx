import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { LinkIcon } from '../icons.js';

const config: ComponentMeta<typeof LinkIcon> = {
	component: LinkIcon,
};
export default config;

// eslint-disable-next-line react/function-component-definition
export const Default: ComponentStory<typeof LinkIcon> = (props) => (
	<LinkIcon {...props} />
);
