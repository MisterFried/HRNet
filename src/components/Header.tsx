// ** Import core packages
import { useNavigate } from "react-router-dom";

// ** Import components
import Button from "./Button";

export default function Header() {
	const navigate = useNavigate();

	return (
		<header className="flex w-full flex-wrap items-center justify-between gap-4 border-b-[1px] border-b-main-300 bg-main-50 p-4 shadow-md">
			<h1 className="text-2xl font-semibold">HR Net</h1>
			<menu className="flex gap-4">
				<Button label="View employees" onClick={() => navigate("/")} />
				<Button label="Create employees" onClick={() => navigate("/create")} />
			</menu>
		</header>
	);
}
