import { Box, Button, Container, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CartList from "./components/List";
import "./index.scss";
import { removeItemCart } from "./cartSlice";

FeatureCart.propTypes = {};

function FeatureCart(props) {
	const { t } = useTranslation(["common", "cart"]);
	const currentLang = useSelector((state) => state.language.current);
	const cartList = useSelector((state) => state.cart.list);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleRemoveClick = (id) => {
		dispatch(removeItemCart(id));
	};

	const handleItemClick = (prodID) => {
		history.push(`/${currentLang}/products/${prodID}`);
	}

	return (
		<Box pt={5}>
			<Container fixed>
				<Box textAlign="center" pb={5} style={{ textTransform: "uppercase" }}>
					<Typography component="h2" variant="h5">
						{t("common:cart")}
					</Typography>
				</Box>

				{cartList.length > 0 && (
					<CartList
						list={cartList}
						removeClick={handleRemoveClick}
						itemClick={handleItemClick}
					/>
				)}
				{cartList.length <= 0 && (
					<Typography component="p" variant="body2" align="center">{`${t(
						"cart:emptyCart",
					)}!!!`}</Typography>
				)}
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					mt={5}
					paddingLeft={3}
					paddingRight={3}
				>
					<Link to={`/${currentLang}/products`}>
						<Button variant="contained" color="primary">
							{t("cart:shopping")}
						</Button>
					</Link>
					{cartList.length > 0 && (
						<Button variant="contained" color="secondary">
							{t("cart:order")}
						</Button>
					)}
				</Box>
			</Container>
		</Box>
	);
}

export default FeatureCart;
