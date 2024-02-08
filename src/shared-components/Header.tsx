// ** Import core packages

import { useNavigate } from "react-router-dom";
import Button from "./Button";

// ** Import icons

// ** Import assets

// ** Import pages

// ** Import third party

// ** Import shared components

// ** Import components

// ** Import sub pages / sections

// ** Import config

// ** Import state manager

// ** Import utils / lib

// ** Import hooks

// ** Import APIs

// ** Import styles

// ** Import Types

// ** Types

export default function Header() {
	const navigate = useNavigate();

	return (
		<header className="flex w-full flex-wrap items-center justify-between gap-4 border-b-[1px] border-b-main-300 bg-main-50 p-4 shadow-md">
			<h1 className="text-2xl font-semibold">HR Net</h1>
			<menu className="flex gap-4">
				<Button text="View employees" onClick={() => navigate("/")} />
				<Button text="Create employees" onClick={() => navigate("/create")} />
			</menu>
		</header>
	);
}
