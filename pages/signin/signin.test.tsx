import React from 'react';
import SignInSide from './index';
import { mount } from 'enzyme';

test('When user lands on signin page', () => {
 const wrapper = mount(<SignInSide></SignInSide>);
 expect(wrapper.text()).toMatch('Sign In (Using Google OAuth2)');
});
