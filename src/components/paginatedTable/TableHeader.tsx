// ** Import icons
import { ChevronDown, ChevronUp } from "lucide-react";

// ** Import Types
import { TableHeaderProps } from "../../types/paginatedTableTypes";

/**
 * Renders a table header cell with title and sorting buttons
 *
 * @param title - The displayed title
 * @param sortText - The property name used for sorting
 * @param reorderAlphabetically - The function that reorder employee records
 * (taking order and sortText as parameters)
 * @param activeSort - The currently active sorting (structured as 'sortText_order')
 * @return The rendered table header cell with sorting buttons.
 */
export default function TableHeader({
	title,
	sortText,
	reorderAlphabetically,
	activeSort,
}: TableHeaderProps) {
	return (
		<th
			className="relative whitespace-nowrap border-[1px] border-gray-400 px-4 py-4 pr-8 transition-all"
			data-testid={`table-header-${sortText}`}
		>
			{title}
			<button
				onClick={() => reorderAlphabetically("asc", sortText)}
				className={`${activeSort === `${sortText}_asc` ? "opacity-100" : "opacity-40"} absolute bottom-2/4 right-1 cursor-pointer transition-all`}
				aria-label={`Reorder by ${sortText} in ascending order`}
				data-testid={`${sortText}-asc-reorder`}
			>
				<ChevronUp />
			</button>
			<button
				onClick={() => reorderAlphabetically("desc", sortText)}
				className={`${activeSort === `${sortText}_desc` ? "opacity-100" : "opacity-40"} absolute right-1 top-2/4 cursor-pointer transition-all`}
				aria-label={`Reorder by ${sortText} in descending order`}
				data-testid={`${sortText}-desc-reorder`}
			>
				<ChevronDown />
			</button>
		</th>
	);
}
