// ** Import core packages

// ** Import icons

// ** Import assets

// ** Import pages

// ** Import third party
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

// ** Import shared components
import TextInput from "../../shared-components/TextInput";
import DateInput from "../../shared-components/DateInput";
import SelectInput from "../../shared-components/SelectInput";
import Button from "../../shared-components/Button";
import { addEmployee } from "../../state/employeeSlice";

// ** Import components

// ** Import sub pages / sections

// ** Import config

// ** Import state manager
import { useDispatch } from "react-redux";

// ** Import utils / lib

// ** Import hooks

// ** Import APIs

// ** Import styles

// ** Import Types

// ** Types

const states = [
	{
		name: "Alabama",
		value: "AL",
	},
	{
		name: "Alaska",
		value: "AK",
	},
	{
		name: "American Samoa",
		value: "AS",
	},
	{
		name: "Arizona",
		value: "AZ",
	},
	{
		name: "Arkansas",
		value: "AR",
	},
	{
		name: "California",
		value: "CA",
	},
	{
		name: "Colorado",
		value: "CO",
	},
	{
		name: "Connecticut",
		value: "CT",
	},
	{
		name: "Delaware",
		value: "DE",
	},
	{
		name: "District Of Columbia",
		value: "DC",
	},
	{
		name: "Federated States Of Micronesia",
		value: "FM",
	},
	{
		name: "Florida",
		value: "FL",
	},
	{
		name: "Georgia",
		value: "GA",
	},
	{
		name: "Guam",
		value: "GU",
	},
	{
		name: "Hawaii",
		value: "HI",
	},
	{
		name: "Idaho",
		value: "ID",
	},
	{
		name: "Illinois",
		value: "IL",
	},
	{
		name: "Indiana",
		value: "IN",
	},
	{
		name: "Iowa",
		value: "IA",
	},
	{
		name: "Kansas",
		value: "KS",
	},
	{
		name: "Kentucky",
		value: "KY",
	},
	{
		name: "Louisiana",
		value: "LA",
	},
	{
		name: "Maine",
		value: "ME",
	},
	{
		name: "Marshall Islands",
		value: "MH",
	},
	{
		name: "Maryland",
		value: "MD",
	},
	{
		name: "Massachusetts",
		value: "MA",
	},
	{
		name: "Michigan",
		value: "MI",
	},
	{
		name: "Minnesota",
		value: "MN",
	},
	{
		name: "Mississippi",
		value: "MS",
	},
	{
		name: "Missouri",
		value: "MO",
	},
	{
		name: "Montana",
		value: "MT",
	},
	{
		name: "Nebraska",
		value: "NE",
	},
	{
		name: "Nevada",
		value: "NV",
	},
	{
		name: "New Hampshire",
		value: "NH",
	},
	{
		name: "New Jersey",
		value: "NJ",
	},
	{
		name: "New Mexico",
		value: "NM",
	},
	{
		name: "New York",
		value: "NY",
	},
	{
		name: "North Carolina",
		value: "NC",
	},
	{
		name: "North Dakota",
		value: "ND",
	},
	{
		name: "Northern Mariana Islands",
		value: "MP",
	},
	{
		name: "Ohio",
		value: "OH",
	},
	{
		name: "Oklahoma",
		value: "OK",
	},
	{
		name: "Oregon",
		value: "OR",
	},
	{
		name: "Palau",
		value: "PW",
	},
	{
		name: "Pennsylvania",
		value: "PA",
	},
	{
		name: "Puerto Rico",
		value: "PR",
	},
	{
		name: "Rhode Island",
		value: "RI",
	},
	{
		name: "South Carolina",
		value: "SC",
	},
	{
		name: "South Dakota",
		value: "SD",
	},
	{
		name: "Tennessee",
		value: "TN",
	},
	{
		name: "Texas",
		value: "TX",
	},
	{
		name: "Utah",
		value: "UT",
	},
	{
		name: "Vermont",
		value: "VT",
	},
	{
		name: "Virgin Islands",
		value: "VI",
	},
	{
		name: "Virginia",
		value: "VA",
	},
	{
		name: "Washington",
		value: "WA",
	},
	{
		name: "West Virginia",
		value: "WV",
	},
	{
		name: "Wisconsin",
		value: "WI",
	},
	{
		name: "Wyoming",
		value: "WY",
	},
];

const departments = [
	{
		name: "Sales",
		value: "sales",
	},
	{
		name: "Marketing",
		value: "marketing",
	},
	{
		name: "Engineering",
		value: "engineering",
	},
	{
		name: "Human Resources",
		value: "hr",
	},
	{
		name: "Legal",
		value: "legal",
	},
];

const schema = z.object({
	firstName: z
		.string()
		.min(1, "First name is required")
		.min(3, "First name must be at least 3 characters"),
	lastName: z
		.string()
		.min(1, "Last name is required")
		.min(3, "Last name must be at least 3 characters"),
	dateOfBirth: z.coerce.date().max(new Date(), "Date of birth must be in the past"),
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
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFieldsType>({ resolver: zodResolver(schema) });

	async function onSubmit(data: FormFieldsType) {
		try {
			await new Promise(resolve => setTimeout(resolve, 2000));

			const employeeID = uuidv4();
			const employeeDateOfBirth = data.dateOfBirth.toISOString();
			const newEmployee = {
				id: employeeID,
				dateOfBirth: employeeDateOfBirth,
				firstName: data.firstName,
				lastName: data.lastName,
				street: data.street,
				city: data.city,
				state: data.state,
				zip: data.zip,
				department: data.department,
			};
			dispatch(addEmployee(newEmployee));

			toast.success("Employee created successfully");
		} catch (error) {
			setError("root", { message: "An error occurred on our server" });
		}
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
				<DateInput
					text="Date of Birth"
					name="dateOfBirth"
					register={register}
					errors={errors}
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
				/>
				<Button
					text={isSubmitting ? "Creation..." : "Create"}
					type="submit"
					disabled={isSubmitting}
				/>
				{errors.root && <p className="text-red-500">{errors.root.message}</p>}
			</form>
		</main>
	);
}
