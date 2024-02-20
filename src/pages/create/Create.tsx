// ** Import core packages
import { useRef } from "react";

// ** Import icons

// ** Import assets

// ** Import pages

// ** Import third party
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ** Import shared components
import TextInput from "../../shared-components/TextInput";
import SelectInput from "../../shared-components/SelectInput";
import Button from "../../shared-components/Button";
import Modal from "../../shared-components/Modal";
import DatePicker from "../../shared-components/DatePicker";

// ** Import components

// ** Import sub pages / sections

// ** Import config

// ** Import state manager

// ** Import utils / lib
import states from "../../utils/states";
import departments from "../../utils/departments";

// ** Import hooks

// ** Import APIs

// ** Import styles

// ** Import Types

// ** Types

const dateRegex = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

const schema = z.object({
	firstName: z
		.string()
		.min(1, "First name is required")
		.min(3, "First name must be at least 3 characters"),
	lastName: z
		.string()
		.min(1, "Last name is required")
		.min(3, "Last name must be at least 3 characters"),
	dateOfBirth: z.string().min(1, "Date of Birth is required").regex(dateRegex, "Invalid date"),
	startDate: z.string().min(1, "Start date is required").regex(dateRegex, "Invalid date"),
	street: z.string().min(1, "Street is required").min(2, "Street must be at least 3 characters"),
	city: z.string().min(1, "City is required").min(2, "City must be at least 3 characters"),
	state: z.string().min(1, "State is required"),
	zip: z
		.string()
		.min(1, "Zip is required")
		.min(5, "Zip must be 5 characters long")
		.max(5, "Zip must be 5 characters long"),
	department: z.string().min(1, "Department is required"),
});

export type FormFieldsType = z.infer<typeof schema>;

export default function Create() {
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
			zip: "12345",
		},
	});

	function onSubmit(data: FormFieldsType) {
		try {
			const employeeID = uuidv4();
			const newEmployee = {
				id: employeeID,
				dateOfBirth: data.dateOfBirth,
				startDate: data.startDate,
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
			setError("root", { message: "An error occurred on our server" });
		}
	}

	function logEmployeeList() {
		const data = JSON.parse(localStorage.getItem("employee") || "[]");
		console.log(data);
	}

	function resetEmployeeList() {
		localStorage.setItem("employee", JSON.stringify([]));
	}

	return (
		<main className="mx-auto flex w-fit flex-col gap-4 p-4">
			<h2 className="mb-8 text-center text-xl font-bold">Create employee</h2>
			<p>Create a record for a new employee</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 rounded-lg border-[1px] border-gray-300 p-4"
			>
				<TextInput
					text="First Name"
					placeholder="John"
					name="firstName"
					register={register}
					errors={errors}
				/>
				<TextInput
					text="Last Name"
					placeholder="Doe"
					name="lastName"
					register={register}
					errors={errors}
				/>
				<Controller
					control={control}
					name="dateOfBirth"
					defaultValue="yyyy / mm / dd"
					render={({ field }) => (
						<DatePicker
							text="Date of Birth"
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
					defaultValue="yyyy / mm / dd"
					render={({ field }) => (
						<DatePicker
							text="Start date"
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
						text="Street"
						placeholder="123 Main St"
						name="street"
						register={register}
						errors={errors}
					/>
					<TextInput
						text="City"
						placeholder="Anytown"
						name="city"
						register={register}
						errors={errors}
					/>
					<SelectInput
						text="State"
						name="state"
						options={states}
						register={register}
						errors={errors}
						setValue={setValue}
					/>
					<TextInput
						text="Zip"
						placeholder="12345"
						name="zip"
						register={register}
						errors={errors}
					/>
				</fieldset>
				<SelectInput
					text="Department"
					name="department"
					options={departments}
					register={register}
					errors={errors}
					setValue={setValue}
				/>
				<Button
					text={isSubmitting ? "Creation..." : "Create"}
					type="submit"
					disabled={isSubmitting}
				/>
				{errors.root && <p className="text-red-500">{errors.root.message}</p>}
			</form>
			<button
				className="rounded-md border-[1px] border-gray-400 p-2 transition-all hover:bg-gray-300 "
				onClick={logEmployeeList}
			>
				Log employee list
			</button>
			<button
				className="rounded-md border-[1px] border-gray-400 p-2 transition-all hover:bg-gray-300"
				onClick={resetEmployeeList}
			>
				Reset employee list
			</button>
			<Modal ref={modalRef}>
				<p>Employee created successfully</p>
			</Modal>
		</main>
	);
}
