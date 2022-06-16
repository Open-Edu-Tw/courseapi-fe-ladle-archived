import type { Story } from '@ladle/react';
import * as React from 'react';

type Props = React.ComponentPropsWithoutRef<'svg'>;

export function constructStory(
	Component: React.ComponentType<Props>,
): Story<Props> {
	// eslint-disable-next-line react/function-component-definition
	const Story: Story<Props> = (props) => <Component {...props} />;
	Story.args = {
		width: '5vw',
		height: '5vh',
	};

	return Story;
}
