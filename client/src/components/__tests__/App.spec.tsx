import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import App from '../App';
let wrapped: ShallowWrapper;

beforeEach(() => {
	wrapped = shallow(<App />);
});

it('shows just a text', () => {
	expect(wrapped.html()).toContain('Hello');
});
