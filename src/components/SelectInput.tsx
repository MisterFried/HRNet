// ** Import third party
import { FieldErrors, UseFormRegister } from "react-hook-form";

// ** Import Types
import { FormFieldsType } from "./Form";

// ** Types
interface propsInterface {
	label: string;
	name: keyof FormFieldsType;
	options: Array<string>;
	register: UseFormRegister<FormFieldsType>;
	errors: FieldErrors<FormFieldsType>;
	setValue: (name: keyof FormFieldsType, value: string) => void;
}

export default function SelectInput({
	label,
	name,
	options,
	register,
	errors,
	setValue,
}: propsInterface) {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={name} className="text-sm font-medium">
				{label}
			</label>
			<select
				{...register(name)}
				name={name}
				id={name}
				onChange={e => setValue(name, e.target.value)}
				className="rounded-md border-[1px] border-gray-300 bg-white p-2"
			>
				{options.map((option, index) => (
					<option value={option} key={`${option}_${index}`}>
						{option}
					</option>
				))}
			</select>
			{errors[name] && <span className="text-red-400">{errors[name]?.message}</span>}
		</div>
	);
}
