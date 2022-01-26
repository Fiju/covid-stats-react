import { render, screen } from "@testing-library/react";
import App from "../components/App";

test("renders app with header in the dom", () => {
  render(<App />);
  const header = screen.getByText(/covid statistics/i);
  expect(header).toBeInTheDocument();
});
