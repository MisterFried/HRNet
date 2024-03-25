// ** Import core packages
import { useRef } from "react";

// ** Import third party
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ** Import components
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import Button from "./Button";
import Modal from "./Modal";
import DatePicker from "./DatePicker";

// ** Import utils / lib
import states from "../data/states";
import departments from "../data/departments";
import { zeroPad } from "../utils/calendarHelpers";

// Form data schema
const schema = z.object({
	firstName: z
		.string()
		.min(1, "First name is required")
		.min(3, "First name must be at least 3 characters")
		.regex(
			/^(?:[A-Za-z]+(?:[' -][A-Za-z]+)?){3,}$/,
			"First name can only contain letters and hyphens"
		),
	lastName: z
		.string()
		.min(1, "Last name is required")
		.min(3, "Last name must be at least 3 characters")
		.regex(
			/^(?:[A-Za-z]+(?:[' -][A-Za-z]+)?){3,}$/,
			"Last name can only contain letters and hyphens"
		),
	dateOfBirth: z.coerce.date().max(new Date(), "Date of birth must be in the past"),
	startDate: z.coerce.date().max(new Date(), "Start date must be in the past"),
	street: z.string().min(1, "Street is required").min(2, "Street must be at least 3 characters"),
	city: z
		.string()
		.min(1, "City is required")
		.min(2, "City must be at least 3 characters")
		.regex(/^[A-Za-z\s-]+$/, "City can only contain letters"),
	state: z.string().min(1, "State is required"),
	zip: z.coerce
		.number({
			required_error: "Zip code is required",
			invalid_type_error: "Zip code must be a number",
		})
		.gte(1000, "Zip code must be at least 4 digits")
		.lte(99999, "Zip code must be at most 5 digits"),
	department: z.string().min(1, "Department is required"),
});

export type FormFieldsType = z.infer<typeof schema>;

export default function Form() {
	const modalRef = useRef<HTMLDialogElement | null>(null);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
		setValue,
		control,
	} = useForm<FormFieldsType>({
		resolver: zodResolver(schema),
		defaultValues: {
			firstName: "John",
			lastName: "Doe",
			street: "123 Main St",
			city: "Anytown",
			zip: 12345,
		},
	});

	function onSubmit(data: FormFieldsType) {
		try {
			const employeeID = uuidv4();
			const newEmployee = {
				id: employeeID,
				dateOfBirth: `${data.dateOfBirth.getFullYear()}-${zeroPad(data.dateOfBirth.getMonth() + 1)}-${zeroPad(data.dateOfBirth.getDate())}`,
				startDate: `${data.startDate.getFullYear()}-${zeroPad(data.startDate.getMonth() + 1)}-${zeroPad(data.startDate.getDate())}`,
				firstName: data.firstName,
				lastName: data.lastName,
				street: data.street,
				city: data.city,
				state: data.state,
				zip: data.zip,
				department: data.department,
			};

			const employeeList = JSON.parse(localStorage.getItem("employee") || "[]");
			employeeList.push(newEmployee);
			localStorage.setItem("employee", JSON.stringify(employeeList));

			modalRef.current?.showModal();
		} catch (error) {
			// Used to simulate errors from the server, won't occur when using local storage
			setError("root", { message: "An error occurred on our server" });
		}
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-70 flex flex-col gap-4 rounded-lg border-[1px] border-gray-300 p-4 sm:w-80"
			>
				<TextInput
					label="First Name"
					placeholder="John"
					name="firstName"
					register={register}
					errors={errors}
				/>
				<TextInput
					label="Last Name"
					placeholder="Doe"
					name="lastName"
					register={register}
					errors={errors}
				/>
				<Controller
					control={control}
					name="dateOfBirth"
					defaultValue={new Date("2000-01-01")}
					render={({ field }) => (
						<DatePicker
							label="Date of Birth"
							name={field.name}
							value={field.value}
							setValue={setValue}
							errors={errors}
						/>
					)}
				/>
				<Controller
					control={control}
					name="startDate"
					defaultValue={new Date("2000-01-01")}
					render={({ field }) => (
						<DatePicker
							label="Start date"
							name={field.name}
							value={field.value}
							setValue={setValue}
							errors={errors}
						/>
					)}
				/>
				<fieldset className="flex flex-col gap-2 rounded-md border-[1px] border-gray-200 p-4">
					<legend className="px-2">Address</legend>
					<TextInput
						label="Street"
						placeholder="123 Main St"
						name="street"
						register={register}
						errors={errors}
					/>
					<TextInput
						label="City"
						placeholder="Anytown"
						name="city"
						register={register}
						errors={errors}
					/>
					<SelectInput
						label="State"
						name="state"
						options={states}
						register={register}
						errors={errors}
						setValue={setValue}
					/>
					<TextInput
						label="Zip"
						placeholder="12345"
						name="zip"
						register={register}
						errors={errors}
					/>
				</fieldset>
				<SelectInput
					label="Department"
					name="department"
					options={departments}
					register={register}
					errors={errors}
					setValue={setValue}
				/>
				<Button
					label={isSubmitting ? "Creation..." : "Create"}
					type="submit"
					disabled={isSubmitting}
				/>
				{errors.root && <p className="text-red-500">{errors.root.message}</p>}
			</form>
			<Modal ref={modalRef}>
				<p>Employee created successfully</p>
			</Modal>
		</>
	);
}
