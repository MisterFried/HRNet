// ** Import core packages

// ** Import icons
import { ChevronDown, ChevronUp } from "lucide-react";

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
interface OrderThProps {
	title: string;
	reorderAlphabetically: (order: "asc" | "desc") => void;
}

export default function OrderTh({ title, reorderAlphabetically }: OrderThProps) {
	return (
		<th className="relative border-[1px] border-gray-400 px-4 py-4 pr-8">
			{title}
			<ChevronUp
				onClick={() => reorderAlphabetically("asc")}
				className="absolute bottom-2/4 right-1 cursor-pointer"
			/>
			<ChevronDown
				onClick={() => reorderAlphabetically("desc")}
				className="absolute right-1 top-2/4 cursor-pointer"
			/>
		</th>
	);
}
