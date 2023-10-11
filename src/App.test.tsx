import { RenderResult, render } from "@testing-library/react";
import App from "./App";

test("should mount component properly", () => {
  const component: RenderResult = render(<App />);

  expect(component).toBeTruthy();
});
