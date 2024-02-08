// ** Import core packages
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// ** Import icons

// ** Import assets

// ** Import pages
const Home = lazy(() => import("./pages/home/Home"));
const Create = lazy(() => import("./pages/create/Create"));

// ** Import third party
import { Bounce, ToastContainer } from "react-toastify";

// ** Import shared components

// ** Import components
import Header from "./shared-components/Header";
import Loader from "./shared-components/Loader";

// ** Import sub pages / sections

// ** Import config

// ** Import state manager

// ** Import utils / lib

// ** Import hooks

// ** Import APIs

// ** Import styles
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./state/store";

// ** Import Types

// ** Types

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Header />
				<Suspense fallback={<Loader />}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/create" element={<Create />} />
					</Routes>
				</Suspense>
				<ToastContainer
					position="bottom-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
					transition={Bounce}
				/>
			</BrowserRouter>
		</Provider>
	);
}
