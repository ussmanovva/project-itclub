import { useState } from "react";
import { useSelector } from "react-redux";
import ImageCr from "..//assets/image/Group.svg";
import Basket from "./Basket";

const Header = () => {
	const basket = useSelector((state) => state.shop.basket);
	const [isBasketOpen, setIsBasketOpen] = useState(false);

	return (
		<header className="flex justify-between items-center p-6 bg-gradient-to-r bg-blue-500  text-white shadow-lg">
			<h1 className="text-3xl font-bold">Cross Store</h1>
			<div className="relative flex items-center space-x-4">
				<button
					className="relative"
					onClick={() => setIsBasketOpen(!isBasketOpen)}>
					<img src={ImageCr} alt="Корзина" />
					{basket.length > 0 && (
						<span className="absolute top-0 right-0 bg-blue-200 text-white rounded-full px-2 py-1 text-xs">
							{basket.length}
						</span>
					)}
				</button>
			</div>

			{isBasketOpen && (
				<>
					<div
						className="fixed inset-0 bg-black opacity-50 z-40"
						onClick={() => setIsBasketOpen(false)}></div>
					<Basket onClose={() => setIsBasketOpen(false)} />
				</>
			)}
		</header>
	);
};

export default Header;
