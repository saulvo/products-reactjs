import React from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { DropzoneArea } from "material-ui-dropzone";

UploadField.propTypes = {
	name: PropTypes.string.isRequired,
	form: PropTypes.object.isRequired,

	filesLimit: PropTypes.number,
  acceptedFiles: PropTypes.array,
};

UploadField.defaultProps = {
	filesLimit: 4,
  acceptedFiles:['image/*']
};

function UploadField(props) {
	const { name, form,filesLimit, acceptedFiles  } = props;
	const { errors } = form;
	const errorMessage = errors[name]?.message;
	const hasError = !!errorMessage;

	return (
		<Box mt={1} mb={2}>
			<Controller
				name={name}
				control={form.control}
				render={({ value, onChange }) => (
					<DropzoneArea name={name} value={value} onChange={onChange} filesLimit={filesLimit} acceptedFiles={acceptedFiles} />

				)}
			/>
		</Box>
	);
}

export default UploadField;
