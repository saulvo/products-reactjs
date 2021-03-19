import {
	Box,
	Button,
	Container,
	Grid,
	makeStyles,
	Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { store } from "react-notifications-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import productApi from "../../../../api/productApi";
import Loading from "../../../../components/Loading";
import QuantityButton from "../../../../components/QuantityButton";
import { addCart, updateQuantity } from "../../../Cart/cartSlice";
import Price from "../../components/Price";
import ProductSlider from "../../components/ProductSlider";
import renderHTML from "react-render-html";

const useStyles = makeStyles((theme) => ({
	desc: {
		color: "#444",
		background: "#00000005",
		border: "1px solid rgb(204 204 204 / 20%)",
	},
	priceSale: {
		color: "#888",
		textDecoration: "line-through",
	},
}));

function ProductDetailPage() {
	const params = useParams();
	const [prodInfo, setProdInfo] = useState({});
	const [loading, setLoading] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const classes = useStyles();
	const { t } = useTranslation(["cart"]);
	const isSale = prodInfo.originalPrice > prodInfo.salePrice;

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const data = await productApi.get(params.productID);
				setProdInfo(data);
			} catch (error) {
				console.log("Fail to fetch product detail", error);
			}

			setLoading(false);
		})();
	}, [params.productID]);

	const dispatch = useDispatch();
	const cartList = useSelector((state) => state.cart.list);

	const handleAddCartClick = (prod) => {
		const newCartList = [...cartList];
		const updateIdx = newCartList.findIndex((x) => x.prodID === prod.id);

		// update quantity for exist product in cart
		if (updateIdx >= 0) {
			dispatch(updateQuantity({ idx: updateIdx, newQuantity: quantity }));
		}

		// add new product to cart
		if (updateIdx < 0) {
			const isPromotion = prod.salePrice < prod.originalPrice;
			dispatch(
				addCart({
					prodID: prod.id,
					image: prod.images[0],
					info: prod.name,
					price: isPromotion ? prod.salePrice : prod.originalPrice,
					quantity: quantity,
					money: isPromotion
						? prod.salePrice * quantity
						: prod.originalPrice * quantity,
				}),
			);
		}

		store.addNotification({
			title: `${t("cart:addCartSuccess")}!!!`,
			message: prod.name.toUpperCase(),
			type: "success",
			insert: "top",
			container: "bottom-left",
			animationIn: ["animate__animated", "animate__fadeIn"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
				duration: 3000,
			},
		});
	};

	const handleQuantityChange = (quantity) => {
		setQuantity(quantity);
	};

	return (
		<>
			<Container fixed style={{ position: "relative" }}>
				{loading && <Loading />}
				<Grid container spacing={10}>
					<Grid item xs={12} sm={4}>
						<ProductSlider images={prodInfo.images} />
					</Grid>
					<Grid item xs={12} sm={8}>
						<Typography variant="h5" component="h1">
							<Box component="span" style={{ textTransform: "uppercase" }}>
								{prodInfo.name}
							</Box>
						</Typography>
						<Box display="flex" fontWeight="bold" mt={2}>
							<Typography component="span" variant="h4" color="secondary">
								<Price number={prodInfo.salePrice || 0} />
							</Typography>
							{isSale && (
								<Box ml={2} className={classes.priceSale}>
									<Typography component="span" variant="h5">
										<Price number={prodInfo.originalPrice || 0} />
									</Typography>
								</Box>
							)}
						</Box>
						<Box className={classes.desc} mt={2} mb={4} padding={2}>
							{renderHTML(prodInfo.shortDescription || '')}
						</Box>
						<Box mb={2}>
							<QuantityButton
								number={quantity}
								onChange={handleQuantityChange}
							/>
						</Box>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => handleAddCartClick(prodInfo)}
						>
							{t("cart:addCart")}
						</Button>
					</Grid>
				</Grid>
				<Box>{renderHTML(prodInfo.description || '')}</Box>
			</Container>
		</>
	);
}

export default ProductDetailPage;
