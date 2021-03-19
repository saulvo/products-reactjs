import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

ProductFilterCat.propTypes = {
	list: PropTypes.array,
	categoryId: PropTypes.string,
	onClick: PropTypes.func,
};

ProductFilterCat.defaultProps = {
	list: [],
	categoryId: "",
	onClick: null,
};

function ProductFilterCat({ onClick, categoryId, list }) {
	const { t } = useTranslation(["productFilter"]);
	const handleCatClick = (e) => {
		if (!onClick) return;
		onClick(e.currentTarget.dataset.value);
	};
	return (
		<div>
			<Typography variant="h6" component="h5">
				{t("productCat")}
			</Typography>
			<ul className="prod-cat">
				{list.map((cat) => (
					<li
						key={cat.id}
						data-value={cat.id}
						onClick={handleCatClick}
						className={categoryId === cat.id ? "is-active" : ""}
					>
						{categoryId === cat.id && (
							<FontAwesomeIcon icon="angle-double-right" className="icon" />
						)}
						{cat.name}
					</li>
				))}
			</ul>
		</div>
	);
}

export default ProductFilterCat;
