import type { Story } from '@ladle/react';
import React from 'react';

import type { ButtonProps } from './button.jsx';
import { Button } from './button.jsx';

function PlaceholdIcon() {
	return (
		<div
			style={{
				width: '12px',
				height: '12px',
				backgroundColor: '#000',
				borderRadius: '12px',
			}}
		/>
	);
}

const buttonArgTypes = {
	size: {
		options: ['medium', 'large', 'xl'],
		control: { type: 'radio' },
		defaultValue: 'medium',
	},
	color: {
		options: ['basic', 'accent'],
		control: { type: 'radio' },
		defaultValue: 'basic',
	},
};

const buttonProps = (object: ButtonProps) => object;

// eslint-disable-next-line react/function-component-definition
export const BasicMediumLoginButton: Story<ButtonProps> = (args) => (
	<Button {...args} />
);
BasicMediumLoginButton.args = buttonProps({
	label: '登入',
	size: 'medium',
	color: 'basic',
});
BasicMediumLoginButton.argTypes = buttonArgTypes;

export const LargeAccentIconWithoutText = BasicMediumLoginButton.bind({});
LargeAccentIconWithoutText.args = buttonProps({
	icon: <PlaceholdIcon />,
	size: 'large',
	color: 'accent',
});

export const XlIconWithTextAndEventHandler = BasicMediumLoginButton.bind({});
XlIconWithTextAndEventHandler.args = buttonProps({
	icon: <PlaceholdIcon />,
	label: '下載',
	size: 'xl',
	color: 'accent',
	onClick() {
		// eslint-disable-next-line no-alert
		alert('正在下載檔案⋯⋯');
	},
});
