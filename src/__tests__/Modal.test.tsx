import { test, describe, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import Modal from "../components/Modal";

describe("Given the modal component, ", () => {
	test("it should render correctly", () => {
		render(
			<Modal>
				<div>Hello World</div>
			</Modal>
		);
		expect(screen.getByText("Hello World")).toBeDefined();
	});
});
