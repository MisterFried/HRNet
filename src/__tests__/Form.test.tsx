import { test, describe, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Form from "../components/Form";

describe("Given the form component, ", () => {
	test("it should render correctly", () => {
		render(<Form />);
		expect(screen.getByTestId("form")).toBeDefined();
	});
	test("it should save a new record correctly", async () => {
		localStorage.clear();
		const user = userEvent.setup();
		render(<Form />);

		const submit = screen.getByTestId("submit");

		await user.click(submit);

		expect(localStorage.setItem).toHaveBeenCalled();
	});
	test("it should not save a record if a text field is incorrect", async () => {
		localStorage.clear();
		const user = userEvent.setup();
		render(<Form />);

		const firstNameInput = screen.getByTestId("firstName-input");
		const submit = screen.getByTestId("submit");

		await user.type(firstNameInput, "12345");
		await user.click(submit);

		const errorMessage = screen.getByText(
			"First name can only contain letters and hyphens"
		);

		expect(errorMessage).toBeDefined();
		expect(localStorage.setItem).not.toHaveBeenCalled();
	});
});
