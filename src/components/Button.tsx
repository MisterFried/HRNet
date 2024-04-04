// ** Types
interface ButtonProps {
	type?: "button" | "submit";
	label: string;
	onClick?: () => void;
	isDisabled?: boolean;
}

/**
 * Renders a button with specific styling and behavior.
 *
 * @param label - The text to display on the button.
 * @param  onClick - The function to call when the button is clicked (default: () => {}).
 * @param  isDisabled - Indicates if the button is disabled (default: false).
 * @param  type - The type of the button (default: "button", also used for data-testid).
 * @return The button component with specified properties.
 */
export default function Button({
	type = "button",
	label,
	onClick = () => {},
	isDisabled = false,
}: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={isDisabled}
			data-testid={`${type === "submit" ? "submit" : ""}`}
			className={`relative isolation-auto z-10 overflow-hidden
			rounded-md border-[1px] border-main-400 bg-white px-4 py-1 transition-all before:absolute before:-right-full
			before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-main-400 before:transition-all 
			before:duration-500 sm:py-2 ${isDisabled ? "cursor-progress" : "cursor-pointer"}  
			hover:text-main-50 before:hover:right-0 before:hover:w-full before:hover:scale-150 before:hover:duration-500 
			focus:text-main-50 before:focus:right-0 before:focus:w-full before:focus:scale-150 before:focus:duration-500`}
		>
			{label}
		</button>
	);
}
