import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

ProductFilterSort.propTypes = {
	onChange: PropTypes.func.isRequired,
	sorts: PropTypes.array,
	loading: PropTypes.bool,
};
ProductFilterSort.defaultProps = {
	sorts: ["default"],
	loading: true,
};

function ProductFilterSort({ onChange, sorts, loading }) {
	const { t } = useTranslation(["productFilter"]);
	const [selected, setSelected] = useState(sorts[0]);

	const handleClick = (e) => {
		setSelected(e.currentTarget.dataset.value);
		onChange(e.currentTarget.dataset.value);
	};
	return (
		<div className="p-select">
			<span>{t(selected)}</span>
			<FontAwesomeIcon icon="angle-down" className="icon" />
			{!loading && (
				<ul>
					{sorts.map((item, idx) => (
						<li
							key={idx}
							className={selected === item ? "selected" : ""}
							data-value={item}
							onClick={handleClick}
						>
							{t(item)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default ProductFilterSort;
