/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/shared-components/**/*.tsx", "./src/pages/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				heading: ["Sanchez", "serif"],
				special: ["Fira Sans Extra Condensed", "sans-serif"],
				body: ["Alegreya Sans", "sans-serif"],
			},
			colors: {
				main: {
					50: "#f7f3f0",
					100: "#efe7e1",
					200: "#dfd0c3",
					300: "#d0b8a4",
					400: "#c0a186",
					500: "#b08968",
					600: "#8d6e53",
					700: "#6a523e",
					800: "#46372a",
					900: "#231b15",
				},
			},
		},
	},
	plugins: [],
};
