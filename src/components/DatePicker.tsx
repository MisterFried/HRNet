// ** Import core packages
import { useRef, useState } from "react";

// ** Import icons
import { ArrowLeftIcon, ArrowRightIcon, CalendarDays } from "lucide-react";

// ** Import utils / lib
import {
	DAYS,
	THIS_MONTH,
	THIS_YEAR,
	getFullMonth,
	getMonthLength,
	getMonthStart,
	zeroPad,
} from "../utils/calendarHelpers";

// ** Import types
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { FormFieldsType } from "./Form";

// ** Types
interface DatePickerProps {
	label: string;
	name: keyof FormFieldsType;
	value: Date;
	setValue: UseFormSetValue<FormFieldsType>;
	errors: FieldErrors<FormFieldsType>;
}

/**
 * Renders a date picker component with a label and registration / error handling.
 * This component needs to be wrapped in Controller element from react-hook-form.
 *
 * @param label - The displayed label
 * @param name - The name attribute for the date picker
 * @param value - The value for the date picker
 * @param setValue - The function (from react-hook-form) to register the selected date
 * @param  errors - The error object (from react-hook-form) containing validation errors
 * @return The rendered date picker component
 */

export default function DatePicker({
	label,
	name,
	value,
	setValue,
	errors,
}: DatePickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [year, setYear] = useState(THIS_YEAR);
	const [month, setMonth] = useState(THIS_MONTH);

	const firstDayOfMonth = getMonthStart(year, month);
	const daysInMonth = getMonthLength(year, month);

	const today = new Date();
	const days = [];

	// Close the calendar when clicking outside
	const calendarRef = useRef<HTMLDivElement>(null);
	document.addEventListener("click", e => {
		if (!calendarRef.current?.contains(e.target as HTMLElement))
			setIsOpen(false);
	});

	//Create the content of the date picker by adding empty days and days slots (div)
	// Empty days slot
	for (let i = 0; i < firstDayOfMonth; i++) {
		days.push(<div key={`empty-${i}`} className="bg-gray-300"></div>);
	}

	// Days slot
	for (let day = 1; day <= daysInMonth; day++) {
		const dateValue = new Date(
			`${year}-${zeroPad(month + 1)}-${zeroPad(day)}`
		);

		days.push(
			<button
				type="button"
				key={day}
				onClick={() => {
					setValue(name, dateValue);
					setIsOpen(false);
				}}
				className={`cursor-pointer ${today.toDateString() === dateValue.toDateString() ? "bg-orange-200" : "bg-gray-100"} transition-all hover:bg-orange-300 focus:z-10 focus:bg-orange-300`}
			>
				{zeroPad(day)}
			</button>
		);
	}

	return (
		<div
			className="flex flex-col gap-1"
			aria-label="date picker"
			ref={calendarRef}
		>
			<p className="text-sm font-medium">{label}</p>
			<div className="relative rounded-md border-[1px] border-gray-300 p-2 transition-all">
				<span>{value.toDateString()}</span>
				<button
					type="button"
					className="absolute right-2 top-1/2 -translate-y-1/2 transition-all hover:scale-110 focus:scale-110"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="open date picker"
				>
					<CalendarDays />
				</button>
				{isOpen && (
					<div className="datePicker absolute left-0 top-[calc(100%_+_0.5rem)] z-10 grid w-full cursor-auto grid-cols-1 gap-2 rounded-md border-[1px] border-gray-400 bg-white p-2 text-center shadow-md">
						<div className="grid grid-cols-2 gap-1">
							{/* Next / previous month */}
							<p className="relative rounded-sm border-[1px] border-gray-200">
								<button
									type="button"
									onClick={() => {
										if (month === 0) {
											setYear(year - 1);
											setMonth(11);
										} else setMonth(month - 1);
									}}
									className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-sm transition-all hover:bg-gray-200 hover:ring-1 hover:ring-gray-500 focus:bg-gray-200 focus:ring-1 focus:ring-gray-500"
								>
									<ArrowLeftIcon size={18} />
								</button>
								{getFullMonth(month)}
								<button
									type="button"
									onClick={() => {
										if (month === 11) {
											setYear(year + 1);
											setMonth(0);
										} else setMonth(month + 1);
									}}
									className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-sm transition-all hover:bg-gray-200 hover:ring-1 hover:ring-gray-500 focus:bg-gray-200 focus:ring-1 focus:ring-gray-500"
								>
									<ArrowRightIcon size={18} />
								</button>
							</p>

							{/* Next / previous year */}
							<p className="relative select-none rounded-sm border-[1px] border-gray-200">
								<button
									type="button"
									onClick={() => setYear(year - 1)}
									className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-sm transition-all hover:bg-gray-200 hover:ring-1 hover:ring-gray-500 focus:bg-gray-200 focus:ring-1 focus:ring-gray-500"
								>
									<ArrowLeftIcon size={18} />
								</button>
								{year}
								<button
									type="button"
									onClick={() => setYear(year + 1)}
									className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-sm transition-all hover:bg-gray-200 hover:ring-1 hover:ring-gray-500 focus:bg-gray-200 focus:ring-1 focus:ring-gray-500"
								>
									<ArrowRightIcon size={18} />
								</button>
							</p>
						</div>

						{/* Days of the month */}
						<div className="grid grid-cols-7 gap-[1px] border-[1px] border-gray-300 bg-gray-300">
							{DAYS.map(day => (
								<div key={day} className="bg-white">
									{day}
								</div>
							))}
							{days}
						</div>
					</div>
				)}
			</div>
			{errors[name] && (
				<span className="text-red-400">{errors[name]?.message}</span>
			)}
		</div>
	);
}
