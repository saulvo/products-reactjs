import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import categoryApi from "../../../../api/categoryApi";
import CheckboxField from "../../../../components/FormFields/CheckboxField";
import InputField from "../../../../components/FormFields/InputField";
import RandomPhotoField from "../../../../components/FormFields/RandomPhotoField";
import SelectField from "../../../../components/FormFields/SelectField";
import TextareaField from "../../../../components/FormFields/TextareaField";

ProductForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	add: PropTypes.bool,
	initialValues: PropTypes.object,
};

ProductForm.defaultProps = {
	add: true,
	initialValues: null,
};

function ProductForm({ closeClick, onSubmit, add, initialValues }) {
	const { t } = useTranslation(["product"]);

	const handleClose = () => {
		closeClick(false);
	};

	const schema = yup.object().shape({
		name: yup
			.string()
			.required(t("product:enter_product_name"))
			.test("at least 2 words", t("product:length_product_name"), (value) => {
				return value.split(" ").length >= 2;
			}),
		originalPrice: yup
			.number()
			.required(t("product:enter_price"))
			.min(1000, t("product:min_price")),
		salePrice: yup.number().when("originalPrice", (originalPrice, schema) => {
			return schema.test({
				test: (value) => originalPrice > value,
				message: t("product:sale_price"),
			});
		}),
		shortDescription: yup
			.string()
			.test("at least 100 character", t("product:desc_vali"), (value) => {
				return value.length >= 100;
			}),
		categoryId: yup.string().required(t("product:cat_vali")),
		images: yup.array().min(1,t("product:img_choose"))
	});

	const form = useForm({
		mode: "onBlur",
		defaultValues: initialValues || {
			name: "",
			isPromotion: 0,
			promotionPercent: 0,
			images: [],
			isFreeShip: false,
			categoryId: "",
			shortDescription: "",
		},
		resolver: yupResolver(schema),
	});

	const handleFormSubmit = async (values) => {
		if (onSubmit) {
			await onSubmit(values);
		}
	};

	const [categoryList, setCategoryList] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const res = await categoryApi.getAll();
				setCategoryList(res);
			} catch (error) {
				console.log("Fail to fetch category list:", error);
			}
		})();
	}, []);

	const { isSubmitting } = form.formState;
	return (
		<>
			<Dialog
				maxWidth="sm"
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={true}
			>
				<Box padding={5}>
					<Typography component="h2" variant="h5">
						{add && (
							<Box mb={2}>
								<FontAwesomeIcon icon="plus" color="#fe4c50" />
								<Box component="span" ml={1}>
									{t("product:addProduct")}
								</Box>
							</Box>
						)}
						{!add && (
							<Box mb={2}>
								<FontAwesomeIcon icon="pencil-alt" color="#fe4c50" />
								<Box component="span" ml={1}>
									{t("product:editProduct")}
								</Box>
							</Box>
						)}
					</Typography>
					<form
						noValidate
						autoComplete="off"
						onSubmit={form.handleSubmit(handleFormSubmit)}
					>
						<InputField
							name="name"
							label={t("product:productName")}
							form={form}
						/>
						<Box display="flex" justifyContent="space-between">
							<Box width="49%">
								<InputField
									type="number"
									name="originalPrice"
									label={t("product:price")}
									form={form}
									defaultValue="1000"
								/>
							</Box>
							<Box width="49%">
								<InputField
									type="number"
									name="salePrice"
									label={t("product:promotionalPrice")}
									form={form}
									defaultValue="0"
								/>
							</Box>
						</Box>
						<SelectField
							name="categoryId"
							label={t("product:productCat")}
							form={form}
							options={categoryList.map((x) => {
								return {
									value: x.id,
									label: x.name,
								};
							})}
						/>
						<TextareaField
							name="shortDescription"
							label={t("product:description")}
							form={form}
						/>
						<CheckboxField
							name="isFreeShip"
							label={t("product:freeShip")}
							form={form}
						/>
						<RandomPhotoField
							name="images"
							label={t("product:images")}
							form={form}
							listImage={initialValues ? initialValues.images : []}
						/>

						<Box textAlign="right">
							<Button
								color="secondary"
								variant="contained"
								style={{ marginRight: ".5rem" }}
								onClick={handleClose}
							>
								{t("cancel")}
							</Button>
							<Button
								disabled={isSubmitting}
								type="submit"
								color="primary"
								variant="contained"
							>
								{add ? t("product:add") : t("product:update")}
							</Button>
						</Box>
					</form>
				</Box>
			</Dialog>
		</>
	);
}

export default ProductForm;
