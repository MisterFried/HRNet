# HR Net

[![Netlify Status](https://api.netlify.com/api/v1/badges/926d31a1-7ee4-4d72-adb9-61b1a1b110da/deploy-status)](https://app.netlify.com/sites/hrnet-oc/deploys)

HR Net is a web app made to manage employee data. It is composed of two pages "Create employee" and "Display employees".

Access the live version here [HRNet](https://hrnet-oc.netlify.app/)

Below are detailed descriptions of the application's key features.

_This application was developed as part of my "Software Developer - React" training program._

## Features

The primary objective of this project was to transition from [an outdated JQuery based](https://github.com/OpenClassrooms-Student-Center/P12_Front-end) version of the application to a more modern React-based solution.
A second aim was to create modular components that could be reused on any other application. Notably a paginated table component, used to display data with functionality to paginate, filter and sort data. A standalone version of this component can be found here:

-   [GitHub](https://github.com/MisterFried/react-paginated-table)
-   [NPM](https://www.npmjs.com/package/react-paginated-table)

This repository also contains lighthouse performance comparison between the JQuery and the React version of the application.

### Create employee

The "Create employee" page features a form with data validation using react-hook-forms and zod. Upon successful form submission, a new employee record will be saved in the user's localStorage (to prevent data loss caused by page refresh / closure).
The page features two custom built components:
- A date picker with built in data validation to prevent futur dates.
- A modal component.

### Display employees

The "Display employees" page retrieves all employee records stored in the localStorage and display them using a custom table component.
This table component includes several features:
- Pagination functionality enabling users to select the number of records displayed per page.
- Sorting options allowing records the be arranged in ascending or descending order based on any field.
- Filtering capability based on user-input text.
- Action section enabling employee deletion from localStorage.

## Run locally

To run the application locally, follow these steps:

Clone the project:

```bash
  git clone https://github.com/MisterFried/HRNet
```

Go to the project directory:

```bash
  cd HRNet
```

Install dependencies:

```bash
  npm install
```

Start the server:

```bash
  npm run dev
```

## Related

As a personal project, I also recreated the same application using Vue.js. Discover more about this version here:
- [GitHub](https://github.com/MisterFried/HRNet-Vue)
- [Live](https://hrnet-vue.netlify.app/)
