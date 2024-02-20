// ** Import core packages
import { useState } from "react";

// ** Import icons
import { ArrowLeftIcon, ArrowRightIcon, CalendarDays } from "lucide-react";

// ** Import third party
import { FieldErrors, UseFormSetValue } from "react-hook-form";

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
import { FormFieldsType } from "../pages/create/Create";

// TODO - Accessibility

export default function DatePicker({
	name,
	value,
	setValue,
	errors,
	text,
}: {
	name: keyof FormFieldsType;
	value: string;
	setValue: UseFormSetValue<FormFieldsType>;
	errors: FieldErrors<FormFieldsType>;
	text: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [year, setyear] = useState(THIS_YEAR);
	const [month, setMonth] = useState(THIS_MONTH);

	const firstDayOfMonth = getMonthStart(year, month);
	const daysInMonth = getMonthLength(year, month);

	const days = [];

	for (let i = 0; i < firstDayOfMonth; i++) {
		days.push(<div key={`empty-${i}`} className="bg-gray-300"></div>);
	}

	for (let day = 1; day <= daysInMonth; day++) {
		days.push(
			<button
				type="button"
				key={day}
				onClick={() => {
					setValue(name, `${year}/${zeroPad(month + 1)}/${zeroPad(day)}`);
					setIsOpen(false);
				}}
				className="cursor-pointer bg-gray-100 transition-all hover:bg-orange-200 focus:z-10 focus:bg-orange-200"
			>
				{zeroPad(day)}
			</button>
		);
	}

	return (
		<div className="flex flex-col gap-1">
			<p className="text-sm font-medium">{text}</p>
			<div className="relative rounded-md border-[1px] border-gray-300 p-2 transition-all">
				<span>{value}</span>
				<button
					type="button"
					className="absolute right-2 top-1/2 -translate-y-1/2 transition-all hover:scale-110 focus:scale-110"
					onClick={() => setIsOpen(!isOpen)}
				>
					<CalendarDays />
				</button>
				{isOpen && (
					<div className="datePicker absolute left-0 top-[calc(100%_+_0.5rem)] z-10 grid w-full cursor-auto grid-cols-1 gap-2 rounded-md border-[1px] border-gray-400 bg-white p-2 text-center shadow-md">
						<div className="grid grid-cols-2 gap-1">
							<p className="relative rounded-sm border-[1px] border-gray-200">
								<button
									type="button"
									onClick={() => {
										if (month === 0) {
											setyear(year - 1);
											setMonth(11);
										} else setMonth(month - 1);
									}}
									className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
								>
									<ArrowLeftIcon size={18} />
								</button>
								{getFullMonth(month)}
								<button
									type="button"
									onClick={() => {
										if (month === 11) {
											setyear(year + 1);
											setMonth(0);
										} else setMonth(month + 1);
									}}
									className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
								>
									<ArrowRightIcon size={18} />
								</button>
							</p>

							<p className="relative select-none rounded-sm border-[1px] border-gray-200">
								<button
									type="button"
									onClick={() => setyear(year - 1)}
									className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
								>
									<ArrowLeftIcon size={18} />
								</button>
								{year}
								<button
									type="button"
									onClick={() => setyear(year + 1)}
									className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
								>
									<ArrowRightIcon size={18} />
								</button>
							</p>
						</div>

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
			{errors[name] && <span className="text-red-400">{errors[name]?.message}</span>}
		</div>
	);
}
