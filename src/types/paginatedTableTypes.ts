import { EmployeesInterface } from "./employeesType";

export interface TablePropsInterface {
	data: Array<EmployeesInterface>;
	action: (id: string) => void;
	headers: Array<{ title: string; sortText: keyof EmployeesInterface }>;
	paginateOptions: Array<number>;
}

export interface parametersInterface {
	filter: string;
	sort: [keyof EmployeesInterface, "asc" | "desc"];
}

export interface TableHeaderProps {
	title: string;
	sortText: keyof EmployeesInterface;
	reorderAlphabetically: (
		order: "asc" | "desc",
		field: keyof EmployeesInterface
	) => void;
	activeSort: string;
}

export interface TableRowInterface {
	employee: EmployeesInterface;
	headers: Array<{
		title: string;
		sortText: keyof EmployeesInterface;
	}>;
	deleteEmployee: (id: string) => void;
}