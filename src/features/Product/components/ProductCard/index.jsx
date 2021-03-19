import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import Price from "../Price";
import "./index.scss";

ProductCard.propTypes = {
	product: PropTypes.object.isRequired,
	addCart: PropTypes.func,
	cardClick: PropTypes.func,
	onRemove: PropTypes.func,
	onEdit: PropTypes.func,
};

ProductCard.defaultProps = {
	addCart: null,
	cardClick: null,
	onRemove: null,
	onEdit: null,
};

function ProductCard(props) {
	const { product, addCart, cardClick, onRemove, onEdit } = props;
	const { t } = useTranslation(["cart"]);

	const isSale = product.salePrice === product.originalPrice;
	const promotionPercent =
		Math.round((100 - (product.salePrice * 100) / product.originalPrice) * 10) /
		10;

	const handleAddCartClick = (product, e) => {
		e.stopPropagation();
		if (addCart) addCart(product);
	};

	const handleCardClick = (id) => {
		if (cardClick) cardClick(id);
	};

	const handleRemoveClick = (product, e) => {
		e.stopPropagation();
		if (onRemove) onRemove(product);
	};

	const handleEditClick = (product,e) => {
		e.stopPropagation();
		if (onEdit) onEdit(product);
	};

	return (
		<div className="prod-card" onClick={() => handleCardClick(product.id)}>
			<div className="prod-card__btns">
				<Button onClick={(e) => handleEditClick(product, e)}>
					<FontAwesomeIcon icon="pencil-alt" />
				</Button>
				<Button onClick={(e) => handleRemoveClick(product, e)}>
					<FontAwesomeIcon icon="trash" />
				</Button>
			</div>
			<figure className="prod-card__thumb">
				<img src={product.images[0]} alt={product.name} />
				{!isSale && <span className="sale">{`-${promotionPercent}%`}</span>}
			</figure>
			<div className="prod-card__inf">
				<h3 className="prod-card__name">{product.name}</h3>
				<div className="prod-card__price">
					{isSale && <Price number={product.originalPrice || 0} />}
					{!isSale && (
						<>
							<Price number={product.salePrice || 0} />
							<span>
								<Price number={product.originalPrice || 0} />
							</span>
						</>
					)}
				</div>
				<button
					className="prod-card__btn"
					onClick={(e) => handleAddCartClick(product, e)}
				>
					{t("addCart")}
				</button>
			</div>
		</div>
	);
}

export default ProductCard;
