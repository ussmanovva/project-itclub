import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./app/store";

const App = () => {
	return (
		<Provider store={store}>
			<div className="container mx-auto p-6">
				<Header />
				<Routes>
					<Route path="/" element={<ProductList />} />
				</Routes>
			</div>
		</Provider>
	);
};

export default App;
