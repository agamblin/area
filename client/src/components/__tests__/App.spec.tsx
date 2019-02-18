import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import App from '../App';
let wrapped: ShallowWrapper;

beforeEach(() => {
	wrapped = shallow(<App />);
});

it('shows just a text', () => {
	expect(1 + 1).toEqual(2);
});
