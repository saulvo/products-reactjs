import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, TableCell, TableRow } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import QuantityButton from "../../../../components/QuantityButton";
import Price from "../../../Product/components/Price";
import "./index.scss";
CartItem.propTypes = {
	itemCart: PropTypes.object.isRequired,
	removeClick: PropTypes.func,
	itemClick: PropTypes.func,
	onChange: PropTypes.func,
	idxUpdate: PropTypes.number,
};

CartItem.defaultProps = {
	removeClick: null,
	itemClick: null,
	onChange: null,
	idxUpdate: -1,
};

function CartItem({ itemCart, removeClick, idxUpdate, itemClick }) {
	const handleRemoveClick = (id) => {
		if (!removeClick) return;

		removeClick(id);
	};

	const handleItemClick = (id) => {
		if (!itemClick) return;
		itemClick(id);
	};

	return (
		<TableRow>
			<TableCell>
				<Box
					onClick={() => handleItemClick(itemCart.prodID)}
					component="span"
					className="cursor-pointer"
				>
					<img src={itemCart.image} alt={itemCart.info} />
				</Box>
			</TableCell>
			<TableCell>
				<Box
					onClick={() => handleItemClick(itemCart.prodID)}
					component="span"
					className="cursor-pointer"
				>
					{itemCart.info}
				</Box>
			</TableCell>
			<TableCell align="center">
				<Price number={itemCart.price || 0} />
			</TableCell>
			<TableCell align="center">
				<Box display="flex" alignItems="center" justifyContent="center">
					<QuantityButton number={itemCart.quantity} idxUpdate={idxUpdate} />
				</Box>
			</TableCell>
			<TableCell align="center">
				<Price number={itemCart.money || 0} />
			</TableCell>
			<TableCell align="center">
				<button
					type="button"
					className="btn-remove"
					onClick={() => handleRemoveClick(itemCart.prodID)}
				>
					<FontAwesomeIcon icon="times-circle" />
				</button>
			</TableCell>
		</TableRow>
	);
}

export default CartItem;
