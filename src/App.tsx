// ** Import core packages
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// ** Import pages
const Home = lazy(() => import("./pages/Home"));
const Create = lazy(() => import("./pages/Create"));

// ** Import components
import Header from "./components/Header";
import Loader from "./components/Loader";

export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create" element={<Create />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}
