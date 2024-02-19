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

function getDepartmentName(value: string) {
	const department = departments.find(department => department.value === value);
	return department ? department.name : "department not found";
}

export { departments, getDepartmentName };
