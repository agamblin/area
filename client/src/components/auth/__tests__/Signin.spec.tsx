import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Signin from '../Signin';

import Root from '../../../Root';

let wrapped: ReactWrapper;

beforeEach(() => {
	wrapped = mount(
		<Root>
			<Signin />
		</Root>
	);
});

it('contains a Sign in title', () => {
	expect(wrapped.find('.content').text()).toEqual('Sign in');
});

it('contains a Sign in button', () => {
	expect(wrapped.find('.ui.fluid.positive.button').text()).toEqual('Sign in');
});

it('contains a button Sign up', () => {
	expect(
		wrapped
			.find('.ui.black.basic.button')
			.first()
			.text()
	).toEqual('Sign up');
});

afterEach(() => {
	wrapped.unmount();
});
