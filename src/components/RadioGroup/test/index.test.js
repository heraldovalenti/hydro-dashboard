import React from "react";
import RadioGroup from "../";
import ShallowRenderer from "react-test-renderer/shallow";

describe("<RadioGroup/>", () => {
  it("renders no items", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<RadioGroup items={[]} />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });

  it("renders several items", () => {
    const items = [
      { value: 1, label: "one" },
      { value: 2, label: "two" }
    ];
    const renderer = new ShallowRenderer();
    renderer.render(<RadioGroup items={items} />);
    const tree = renderer.getRenderOutput();
    expect(tree).toMatchSnapshot();
  });
});
