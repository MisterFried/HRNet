// ** Import core packages

import { ChevronDown, ChevronUp } from "lucide-react";

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

export default function OrderTh({ title, reorderAlphabetically }) {

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
