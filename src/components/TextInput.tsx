// ** Import third party
import { FieldErrors, UseFormRegister } from "react-hook-form";

// ** Import Types
import { FormFieldsType } from "./Form";

// ** Types
interface propsInterface {
	label: string;
	placeholder: string;
	name: keyof FormFieldsType;
	register: UseFormRegister<FormFieldsType>;
	errors: FieldErrors<FormFieldsType>;
}

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
