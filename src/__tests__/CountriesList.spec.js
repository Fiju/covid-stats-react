import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CountriesList from "../components/CountriesList";

test("if country input is rendered", () => {
  render(<CountriesList />);

  const input = screen.getByTestId("country-list");
  expect(input).toBeInTheDocument();
});

test("if country dropdown is rendered or not", () => {
  render(
    <CountriesList
      countries={[
        {
          Country: "Kuwait",
          Slug: "kuwait",
          ISO2: "KW",
        },
        {
          Country: "Panama",
          Slug: "panama",
          ISO2: "PA",
        },
      ]}
    />
  );
  const input = screen.getByTestId("country-list");
  userEvent.click(input);
  const dropdown = screen.getByTestId("country-picker");
  expect(dropdown).toBeInTheDocument();
});
