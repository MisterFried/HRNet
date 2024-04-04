// ** Import Types
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormFieldsType } from "./Form";

// ** Types
interface propsInterface {
	label: string;
	placeholder: string;
	name: keyof FormFieldsType;
	register: UseFormRegister<FormFieldsType>;
	errors: FieldErrors<FormFieldsType>;
}

/**
 * Renders a text input component with label, placeholder and registration / error handling.
 *
 * @param label - The displayed label
 * @param placeholder - The placeholder text
 * @param name - The name attribute for the input field
 * @param register - The function (from react-hook-form) for input field registration
 * @param errors - The errors object (from react-hook-form) containing validation errors
 * @return The rendered text input component
 */
export default function TextInput({
	label,
	placeholder,
	name,
	register,
	errors,
}: propsInterface) {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={name} className="text-sm font-medium">
				{label}
			</label>
			<input
				type="text"
				{...register(name)}
				id={name}
				placeholder={placeholder}
				className="rounded-md border-[1px] border-gray-300 px-2 py-1"
				data-testid={`${name}-input`}
			/>
			{errors[name] && (
				<span className="text-red-400">{errors[name]?.message}</span>
			)}
		</div>
	);
}
