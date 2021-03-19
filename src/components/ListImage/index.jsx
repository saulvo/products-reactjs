import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import "./index.scss";

ListImage.propTypes = {
	list: PropTypes.array,
	onRemove: PropTypes.func,
};

ListImage.defaultProps = {
	list: [],
	onRemove: null,
};

function ListImage({ list, onRemove }) {

	const handleRemoveClick = (idx) => {
		if (onRemove) onRemove(idx);
	};

	return (
		<Box className="list-img">
			{list.length > 0 &&
				list.map((img, idx) => (
					<Box
						position="relative"
						width="5rem"
						height="5rem"
						mr={1}
            mb={1}
						className="list-img__item"
						key={idx}
					>
						<Box component="img" src={img} />
						<Box
							className="list-img__btn"
							onClick={() => handleRemoveClick(idx)}
						>
							<FontAwesomeIcon icon="trash" />
						</Box>
					</Box>
				))}
		</Box>
	);
}

export default ListImage;
