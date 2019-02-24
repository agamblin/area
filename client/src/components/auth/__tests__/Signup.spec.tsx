import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Signup from "../Signup";
import { Input } from "semantic-ui-react";

import Root from "../../../Root";

let signup: ReactWrapper;

beforeEach(() => {
  signup = mount(
    <Root>
      <Signup />
    </Root>
  );
});

// signup check

it("contains an button Sign up", () => {
  expect(
    signup
      .find(".ui.positive.button")
      .first()
      .text()
  ).toEqual("Sign up");
});

it("contains an button Cancel", () => {
  expect(
    signup
      .find(".ui.button")
      .first()
      .text()
  ).toEqual("Cancel");
});

it("contains an email field", () => {
  expect(signup.find("input").first());
});

it("contains an user field", () => {
  expect(signup.find("input").first());
});

it("contains an password field", () => {
  expect(signup.find("input").first());
});

it("contains an confirm password field", () => {
  expect(signup.find("input").first());
});

afterEach(() => {
  signup.unmount();
});
