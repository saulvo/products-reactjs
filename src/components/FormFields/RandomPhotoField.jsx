import { Box, Button, FormLabel, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ListImage from "../ListImage";

RandomPhotoField.propTypes = {
	name: PropTypes.string.isRequired,
	form: PropTypes.object.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
	listImage: PropTypes.array,
};

RandomPhotoField.defaultProps = {
	label: "",
	disabled: false,
	listImage: [],
};

function RandomPhotoField(props) {
	const { name, label, form, listImage } = props;
	const { errors } = form;
	const errorMessage = errors[name]?.message;
	const hasError = !!errorMessage;
	const { t } = useTranslation(["product"]);

	const [images, setimages] = useState(listImage);
	const [selectedImage, setSelectedImage] = useState("");

	const handleRandomClick = () => {
		const randomNumber = Math.trunc(Math.random() * 1000);
		const newValue = `https://picsum.photos/id/${randomNumber}/200/200`;
		setSelectedImage(newValue);
	};

	const handleAddImageClick = () => {
		if (selectedImage === "") return;

		const newImages = [...images, selectedImage];

		setimages((x) => [...x, selectedImage]);
		form.setValue(name, newImages, { shouldValidate: true });
		setSelectedImage("");
	};

	const handleRemoveImageClick = (idx) => {
		const newImages = [...images.slice(0, idx), ...images.slice(idx + 1)];

		setimages(newImages);
		form.setValue(name, newImages, { shouldValidate: true });
	};

	return (
		<Box mt={1} mb={2}>
			<FormLabel>{label}</FormLabel>

			<Controller
				name={name}
				control={form.control}
				defaultValue=""
				render={({ value, onChange }) => (
					<>
						<Box display="flex" alignItems="center" mb={1}>
							<Box
								component="img"
								src={selectedImage || "https://via.placeholder.com/200x200.png"}
								onError={() => handleRandomClick(onChange)}
								mr={2}
							/>

							<Box>
								<Box mb={1}>
									<Button
										type="button"
										onClick={handleRandomClick}
										color="primary"
										variant="outlined"
									>
										{t("product:randomImage")}
									</Button>
								</Box>
								<Box mb={1}>
									<Button
										type="button"
										onClick={handleAddImageClick}
										color="secondary"
										variant="outlined"
										disabled={selectedImage === ""}
									>
										{t("product:choose")}
									</Button>
								</Box>
								{hasError && (
									<Typography component="p" color="secondary" variant="body2">
										{errorMessage}
									</Typography>
								)}
							</Box>
						</Box>
						<ListImage
							list={images}
							onError={() => handleRandomClick(onChange)}
							onRemove={handleRemoveImageClick}
						/>
					</>
				)}
			/>
		</Box>
	);
}

export default RandomPhotoField;
