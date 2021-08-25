// import React from 'react';
// import SignInSide from '../../pages/signin/index';
// import { mount } from 'enzyme';

// TODO - fix SyntaxError: Unexpected token '<' issue
// test('When user lands on signin page', () => {
//  const wrapper = mount(<SignInSide></SignInSide>);
//  expect(wrapper.text()).toMatch('Sign In (Using Google OAuth2)');
// });

// import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import React from "react";
import SignInSide from "../pages/signin/index";

/**
 * @jest-environment jsdom
 */
describe("When user lands on signin page", () => {
  it("renders signin page", () => {
    const wrapper = shallow(<SignInSide></SignInSide>);
    expect(wrapper.find('.avatar')).toBeTruthy();
  });
});