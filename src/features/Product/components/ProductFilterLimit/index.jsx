import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./index.scss";

ProductFilterLimit.propTypes = {
	onChange: PropTypes.func.isRequired,
	limits: PropTypes.array,
	loading: PropTypes.bool,
};

ProductFilterLimit.defaultProps = {
	limits: [12],
	loading: false,
};
function ProductFilterLimit({ onChange, limits, loading }) {
	const { t } = useTranslation(["productFilter"]);
	const [selected, setSelected] = useState(limits[0]);

	const handleClick = (e) => {
		setSelected(e.currentTarget.dataset.value);
		onChange(e.currentTarget.dataset.value);
	};
	return (
		<div className="p-select">
			<span>
				{t('show')}
				&nbsp;{selected}
			</span>
			<FontAwesomeIcon icon="angle-down" className="icon" />
			{!loading && (
				<ul>
					{limits.map((item, idx) => (
						<li
							key={idx}
							className={parseInt(selected) === item ? "selected" : ""}
							data-value={item}
							onClick={handleClick}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default ProductFilterLimit;
