import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../features/Cart/cartSlice";
import "./index.scss";

QuantityButton.propTypes = {
	number: PropTypes.number,
	idxUpdate: PropTypes.number,
	onChange: PropTypes.func,
};

QuantityButton.defaultProps = {
	number: 1,
	idxUpdate: -1,
	onChange: null,
};

function QuantityButton({ number, idxUpdate, onChange }) {
	const [quantity, setQuantity] = useState(number);
	const dispatch = useDispatch();

	const handleIncreaseClick = () => {
		setQuantity((x) => x + 1);

		if (idxUpdate >= 0) {
			dispatch(updateQuantity({ idx: idxUpdate, newQuantity: quantity + 1 }));
		}

		if (onChange) onChange(quantity + 1);
	};

	const handleDecreaseClick = () => {
		if (quantity <= 1) return;
		setQuantity((x) => x - 1);

		if (idxUpdate >= 0) {
			dispatch(updateQuantity({ idx: idxUpdate, newQuantity: quantity - 1 }));
		}

		if (onChange) onChange(quantity - 1);
	};
	const inputEl = useRef(quantity);

	const handleInputChange = () => {
		const quantity = parseInt(inputEl.current.value);

		if (quantity < 1 || Number.isNaN(quantity)) {
			setQuantity(() => 1);
			return;
		}

		setQuantity(() => quantity);
		if (idxUpdate >= 0) {
			dispatch(updateQuantity({ idx: idxUpdate, newQuantity: quantity }));
		}

		if (onChange) onChange(quantity);
	};

	return (
		<div className="quantity">
			<button onClick={handleDecreaseClick}>
				<FontAwesomeIcon icon="minus" />
			</button>
			<input
				type="number"
				ref={inputEl}
				value={quantity}
				onChange={handleInputChange}
			/>
			<button onClick={handleIncreaseClick}>
				<FontAwesomeIcon icon="plus" />
			</button>
		</div>
	);
}

export default QuantityButton;
