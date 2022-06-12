import type { Story } from '@ladle/react';
import React from 'react';

import type { IconProps } from '../icons.js';
import { DownloadIcon } from '../icons.js';

// eslint-disable-next-line react/function-component-definition
export const Default: Story<IconProps> = (props) => <DownloadIcon {...props} />;
Default.args = {
	width: '14px',
	height: '14px',
};
Default.argTypes = {
	mode: {
		options: ['img', 'next'],
		control: { type: 'radio' },
		defaultValue: 'img',
	},
};
