import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setProducts, addToBasket } from "../features/shopSlice";

const ProductList = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.shop.products);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		axios
			.get("https://7a43772ce41a06ba.mokky.dev/store")
			.then((response) => {
				dispatch(setProducts(response.data));
			})
			.catch((error) => {
				console.error("Ошибка загрузки данных", error);
			});
	}, [dispatch]);

	const handleAddToBasket = (product) => {
		dispatch(addToBasket(product));
	};

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="container mx-auto">
			<hr className="my-6 border-t-2 border-gray-300" />

			<h1 className="text-3xl font-bold mb-6 text-center">Наши кроссовки:</h1>

			<input
				type="text"
				placeholder="Поиск по кроссовкам..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="border p-2 mb-6 w-64 block mx-auto" 
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{filteredProducts.map((product) => (
					<div
						key={product.id}
						className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
						<img
							src={product.image}
							alt={product.name}
							className="w-full h-48 object-cover mb-4 rounded-lg"
						/>
						<h2 className="text-lg font-bold mb-2">{product.name}</h2>
						<p className="text-gray-500 mb-2">{product.price} руб.</p>
						<button
							onClick={() => handleAddToBasket(product)}
							className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full transition-colors hover:bg-blue-600">
							Добавить в корзину
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductList;
