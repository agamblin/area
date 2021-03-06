import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Signin from '../Signin';

import Root from '../../../Root';

let signin: ReactWrapper;

beforeEach(() => {
	signin = mount(
		<Root>
			<Signin />
		</Root>
	);
});

// signin check

it('contains a Sign in title', () => {
	expect(signin.find('.content').text()).toEqual('Sign in');
});

it('contains a Sign in button', () => {
	expect(signin.find('.ui.fluid.positive.button').text()).toEqual('Sign in');
});

it('contains a button Sign up', () => {
	expect(
		signin
			.find('.ui.black.basic.button')
			.first()
			.text()
	).toEqual('Sign up');
});

it('contains an email field', () => {
	expect(signin.find('input').find({ placeholder: 'Email' }));
});

it('contains an password field', () => {
	expect(signin.find('input').find({ placeholder: 'Password' }));
});

afterEach(() => {
	signin.unmount();
});
