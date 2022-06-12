import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { FilledStarIcon } from '../icons.js';

const config: ComponentMeta<typeof FilledStarIcon> = {
	component: FilledStarIcon,
};
export default config;

// eslint-disable-next-line react/function-component-definition
export const Default: ComponentStory<typeof FilledStarIcon> = (props) => (
	<FilledStarIcon {...props} />
);
