import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import './index.scss';

Loading.propTypes = {
	type: PropTypes.string,
	color: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	className: PropTypes.string,
};

Loading.defaultProps = {
	type: "cylon",
	color: "#fe4c50",
	width: "64px",
  height: "64px",
  className: 'icon'
};
function Loading({ type, color, width, height }) {
	return (
		<div className="loading">
      <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
	);
}

export default Loading;
