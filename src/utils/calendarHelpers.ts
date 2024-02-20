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

function getMonthLength(year: number, month: number) {
	return new Date(year, month + 1, 0).getDate();
}

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
