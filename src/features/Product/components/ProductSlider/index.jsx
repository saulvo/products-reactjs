import PropTypes from "prop-types";
import React from "react";
import SliderImage from "react-zoom-slider";
import "./index.scss";

ProductSlider.propTypes = {
	images: PropTypes.array,
};

ProductSlider.defaultProps = {
	images: [],
};

function ProductSlider({ images }) {
	return (
		<>
			{images.length > 0 && (
				<SliderImage
					data={images.map((x) => ({ image: x }))}
					showDescription={false}
					direction="right"
				/>
			)}
		</>
	);
}

export default ProductSlider;
