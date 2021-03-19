import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect } from "react";

Price.propTypes = {
  number: PropTypes.number.isRequired,
};

Price.defaultProps = {
  Price: 0
}

function Price({ number }) {
	const lng = useSelector((state) => state.language.current);
	const [price, setPrice] = useState('');

	const formatPrice = (number, lng) => {
		switch (lng) {
			case "en": {
				return (
					number / process.env.REACT_APP_DOLLAR_TO_VND
				).toLocaleString("en-US", { style: "currency", currency: "USD" });
			}
			default:
				return number.toLocaleString("it-IT", {
					style: "currency",
					currency: "VND",
				});
		}
	};

	useEffect(() => {
		setPrice(formatPrice(number, lng));
	}, [lng, number]);

	return <>{price}</>;
}

export default Price;
