// ** Import core packages

// ** Import icons

// ** Import assets

// ** Import pages

// ** Import third party
import { FieldErrors, UseFormRegister } from "react-hook-form";

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
import { FormFieldsType } from "../pages/create/Create";

// ** Types
interface propsInterface {
	text: string;
	name: keyof FormFieldsType;
	options: Array<{ name: string; value: string }>;
	register: UseFormRegister<FormFieldsType>;
	errors: FieldErrors<FormFieldsType>;
}

export default function SelectInput(props: propsInterface) {
	const { text, name, options, register, errors } = props;

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={name} className="text-sm font-medium">
				{text}
			</label>
			<select
				{...register(name)}
				name="name"
				id="name"
				className="rounded-md border-[1px] border-gray-300 bg-white p-2"
			>
				{options.map((option, index) => (
					<option value={option.value} key={`${option.value}_${index}`}>
						{option.name}
					</option>
				))}
			</select>
			{errors[name] && <span className="text-red-400">{errors[name]?.message}</span>}
		</div>
	);
}
