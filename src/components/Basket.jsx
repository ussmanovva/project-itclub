import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../features/shopSlice";

const Basket = ({ onClose }) => {
	const basket = useSelector((state) => state.shop.basket);
	const totalPrice = useSelector((state) => state.shop.totalPrice);
	const dispatch = useDispatch();

	const handleIncrease = (item) => {
		dispatch(increaseQuantity(item.id));
	};

	const handleDecrease = (item) => {
		dispatch(decreaseQuantity(item.id));
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
			<aside className="w-1/3 h-full bg-gray-100 shadow-lg p-6 overflow-y-auto relative">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-3xl font-bold text-gray-800">Ваша корзина:</h2>
					<button
						className="text-3xl font-bold text-gray-500 hover:text-gray-800 transition"
						onClick={onClose}>
						&times;
					</button>
				</div>

				{basket.length === 0 ? (
					<p className="text-center text-lg text-gray-500">
						Корзина пуста 😢 <br /> Добавьте товары, чтобы они появились здесь!
					</p>
				) : (
					<>
						<ul>
							{basket.map((item) => (
								<li
									key={item.id}
									className="mb-4 flex items-center bg-white p-4 rounded-lg shadow-md justify-between">
									<div className="flex items-center">
										<img
											src={item.image}
											alt={item.name}
											className="w-16 h-16 object-cover rounded-lg mr-4"
										/>
										<div>
											<span className="font-bold text-gray-800">
												{item.name}
											</span>{" "}
											— {item.price} руб.
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<button
											className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded-lg"
											onClick={() => handleDecrease(item)}
											disabled={item.quantity === 1}>
											-
										</button>
										<span className="font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
											{item.quantity}
										</span>
										<button
											className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded-lg"
											onClick={() => handleIncrease(item)}>
											+
										</button>
									</div>
								</li>
							))}
						</ul>
						<div className="mt-6 text-lg font-bold text-gray-800">
							Общая сумма: {totalPrice} руб.
						</div>

						<button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg w-full transition-colors hover:bg-blue-200">
							Оформить заказ
						</button>
					</>
				)}
			</aside>
		</div>
	);
};

export default Basket;
