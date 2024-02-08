// ** Import core packages

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
interface ButtonProps {
	text: string;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
}

export default function Button(props: ButtonProps) {
	const { text, onClick, disabled = false, type = "button" } = props;

	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className="relative isolation-auto z-10 overflow-hidden
			rounded-md border-[1px] border-main-400 bg-white px-4 py-2 transition-all
			before:absolute before:-right-full before:-z-10 before:aspect-square before:w-full before:rounded-full 
			before:bg-main-400  before:transition-all before:duration-500  
			hover:text-main-50 before:hover:right-0 before:hover:w-full before:hover:scale-150 before:hover:duration-500 
			focus:text-main-50 before:focus:right-0 before:focus:w-full before:focus:scale-150 before:focus:duration-500"
		>
			{text}
		</button>
	);
}
