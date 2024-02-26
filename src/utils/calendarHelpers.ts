const THIS_YEAR = new Date().getFullYear();
const THIS_MONTH = new Date().getMonth();
const THIS_DAY = new Date().getDate();

const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const WEEK_DAYS = {
	sun: "Sunday",
	mon: "Monday",
	tue: "Tuesday",
	wed: "Wednesday",
	thu: "Thursday",
	fri: "Friday",
	sat: "Saturday",
};

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const YEAR_MONTHS = {
	jan: "January",
	feb: "February",
	mar: "March",
	apr: "April",
	may: "May",
	jun: "June",
	jul: "July",
	aug: "August",
	sep: "September",
	oct: "October",
	nov: "November",
	dec: "December",
};

function zeroPad(num: number) {
	return num.toString().padStart(2, "0");
}

/**
 * Returns the number of days in a given month of a specific year.
 * @param year - The year.
 * @param month - The month (0-based index).
 * @returns The number of days in the specified month.
 */
function getMonthLength(year: number, month: number) {
	// Get the day before the first day of the next month, aka the last day of the current month.
	return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns the day of the week (0-6) for the start of the specified month.
 * @param year - The year of the month.
 * @param month - The month (0-11).
 * @returns The day of the week (0-6) for the start of the specified month.
 */
function getMonthStart(year: number, month: number) {
	const day = new Date(year, month, 1).getDay();
	return day;
}

function getMonth(month: number) {
	return MONTHS[month] as keyof typeof YEAR_MONTHS;
}

function getFullMonth(month: number) {
	const monthShort = getMonth(month);
	return YEAR_MONTHS[monthShort];
}

export {
	THIS_YEAR,
	THIS_MONTH,
	THIS_DAY,
	DAYS,
	WEEK_DAYS,
	MONTHS,
	YEAR_MONTHS,
	zeroPad,
	getMonthLength,
	getMonthStart,
	getMonth,
	getFullMonth,
};
