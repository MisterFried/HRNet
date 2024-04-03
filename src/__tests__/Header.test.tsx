import { test, describe, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";

import Header from "../components/Header";

// Mock the useNavigate from react-router
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...(jest.requireActual("react-router-dom") as {
		useNavigate: () => jest.Mock;
	}),
	useNavigate: () => mockedUsedNavigate,
}));

describe("Given the header component", () => {
	test("Should render correctly", () => {
		render(<Header />);
		expect(screen.getByText("HR Net")).toBeDefined();
		expect(screen.getByText("View employees")).toBeDefined();
		expect(screen.getByText("Create employee")).toBeDefined();
	});
});
