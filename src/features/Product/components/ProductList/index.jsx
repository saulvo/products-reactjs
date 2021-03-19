import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import ProductCard from "../ProductCard";

ProductList.propTypes = {
	list: PropTypes.array,
	addCart: PropTypes.func,
	cardClick: PropTypes.func,
	onRemove: PropTypes.func,
	onEdit: PropTypes.func,
};

ProductList.defaultProps = {
	list: [],
	addCart: null,
	cardClick: null,
	onRemove: null,
	onEdit: null,
};

function ProductList(props) {
	const { list, addCart, cardClick, onRemove,onEdit } = props;
	return (
		<>
			<Grid container spacing={0}>
				{list.map((prod) => (
					<Grid item xs={12} sm={6} md={3} key={prod.id}>
						<ProductCard product={prod}  addCart={addCart} cardClick={cardClick} onRemove={onRemove} onEdit={onEdit} />
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default ProductList;
