import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StrokeStarIcon } from '../icons.js';

const config: ComponentMeta<typeof StrokeStarIcon> = {
	component: StrokeStarIcon,
};
export default config;

// eslint-disable-next-line react/function-component-definition
export const Default: ComponentStory<typeof StrokeStarIcon> = (props) => (
	<StrokeStarIcon {...props} />
);
