import Bootbox from "bootbox-react";
import PropTypes from "prop-types";
import React from "react";
import "./index.scss";

ConfirmBox.propTypes = {
	showConfirm: PropTypes.bool,
	onSuccess: PropTypes.func,
	onCancel: PropTypes.func,
	message: PropTypes.string,
	successLabel: PropTypes.string,
	cancelLabel: PropTypes.string,
};
ConfirmBox.defaulProps = {
	showConfirm: false,
	onSuccess: null,
	onCancel: null,
	message: "confirm?",
	successLabel: "yes",
	cancelLabel: "no",
};

function ConfirmBox(props) {
	const {
		showConfirm,
		onSuccess,
		onCancel,
		message,
		successLabel,
		cancelLabel,
	} = props;
	const handleConfirm = () => {
		if (onSuccess) onSuccess();
	};
	const handleCancel = () => {
		if (onCancel) onCancel();
	};

	return (
		<>
			<Bootbox
				show={showConfirm}
				type={"confirm"}
				message={message}
				onSuccess={handleConfirm}
				onCancel={handleCancel}
				successLabel={successLabel}
				cancelLabel={cancelLabel}
			/>
		</>
	);
}

export default ConfirmBox;
