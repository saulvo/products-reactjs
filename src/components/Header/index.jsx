import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Container, Grid, Hidden } from "@material-ui/core";
import classNames from "classnames";
import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import productApi from "../../api/productApi";
import { auth } from "../../app/firebase";
import ProductForm from "../../features/Product/components/ProductForm";
import { useScollTop } from "../../hooks/useScollTop";
import { updateUser } from "./authSlice";
import "./index.scss";
import { updateLang } from "./languageSlice";

function Header(props) {
	const dispatch = useDispatch();
	const currentLang = useSelector((state) => state.language.current);
	const cartList = useSelector((state) => state.cart.list);
	const { i18n } = useTranslation(["common", "product"]);
	const [showForm, setShowForm] = useState(false);
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
		i18n.changeLanguage(currentLang);
	}, [i18n, currentLang]);

	const handleClose = (isShow) => {
		setShowForm(isShow);
	};

	const handleSubmit = async (values) => {
		const promotionPercent =
			100 - (values.salePrice * 100) / values.originalPrice;
		const originalPrice = Number.parseInt(values.originalPrice);
		const salePrice =
			Number.parseInt(values.salePrice) !== 0
				? Number.parseInt(values.salePrice)
				: originalPrice;

		const formValues = {
			...values,
			originalPrice,
			salePrice,
			isPromotion: promotionPercent !== 100 ? 1 : 0,
			promotionPercent: promotionPercent,
		};
		try {
			await productApi.add(formValues);
			setShowForm(false);
		} catch (error) {
			console.log("Failed to add product:", error);
		}
	};

	const scrollTop = useScollTop();

	const [user] = useAuthState(auth);
	const handleSigninClick = async () => {
		try {
			const provider = new firebase.auth.GoogleAuthProvider();
			await auth.signInWithPopup(provider);
		} catch (error) {
			console.log("Sign in failed...", error);
		}
	};
	const handleSignOutClick = () => {
		auth.signOut();
		dispatch(updateUser({}));
	};

	useEffect(() => {
		(() => {
			if (user)
				dispatch(
					updateUser({
						name: user.displayName,
						email: user.email,
						photo: user.photoURL
					}),
				);
		})();
	}, [user, dispatch]);

	return (
		<>
			<header className={`header ${classNames({ fixed: scrollTop > 0 })}`}>
				<div className="header__top">
					<Container fixed>
						<Grid container spacing={0}>
							<Hidden mdDown>
								<Grid item xs={12} sm={6}>
									<div className="header__top-left">
										<Trans i18nKey="common:header_slogan">
											free shipping on all u.s orders over $50
										</Trans>
									</div>
								</Grid>
							</Hidden>

							<Grid item xs={12} md={6}>
								<div className="header__top-right">
									<div className="add-edit" onClick={() => setShowForm(true)}>
										<FontAwesomeIcon icon="plus" />
										<Box marginLeft="0.2rem" component="span">
											<Trans i18nKey="product:addProduct"></Trans>
										</Box>
									</div>
									<div className="language">
										<div className="language__current">
											<Trans i18nKey={`common:${currentLang}`}>English</Trans>
										</div>
										<ul className="language__selection">
											<li
												className={`${currentLang === "en" ? "active" : ""}`}
												onClick={() => {
													dispatch(updateLang("en"));
												}}
											>
												<Trans i18nKey="common:en">English</Trans>
											</li>
											<li
												className={`${currentLang === "vi" ? "active" : ""}`}
												onClick={() => {
													dispatch(updateLang("vi"));
												}}
											>
												<Trans i18nKey="common:vi">Viet Nam</Trans>
											</li>
										</ul>
									</div>

									<div className="account">
										<Link to="#">
											{user && <Box display="flex" alignItems="center">
												<Avatar className="avatar" alt="Remy Sharp" src={user.photoURL}/>
												<Box ml={1}>{user.displayName}</Box>
											</Box>}
											{!user && (
												<Trans i18nKey="common:account">My Account</Trans>
											)}
										</Link>
										<ul className="account__selection">
											{!user && (
												<li>
													<span onClick={handleSigninClick}>
														<FontAwesomeIcon icon="sign-in-alt" />
														<Trans i18nKey="common:signin">Sign In</Trans>
													</span>
												</li>
											)}
											{user && (
												<li>
													<span onClick={handleSignOutClick}>
														<FontAwesomeIcon icon="sign-out-alt" />
														<Trans i18nKey="common:signout">Sign Out</Trans>
													</span>
												</li>
											)}
										</ul>
									</div>
								</div>
							</Grid>
						</Grid>
					</Container>
				</div>
				<div className="header__bot">
					<Container fixed>
						<Grid container spacing={0} className="header__bot-container">
							<Grid item xs={12}>
								<div className="logo">
									<NavLink exact to={`/${currentLang}`}>
										Online <span>Shop</span>
									</NavLink>
								</div>
								<nav className="navbar">
									<div
										className={`navbar__menu ${classNames({ show: showMenu })}`}
									>
										<button
											className="navbar__btn-close"
											onClick={() => setShowMenu(false)}
										>
											<FontAwesomeIcon icon="times" />
										</button>
										<NavLink exact to={`/${currentLang}`}>
											<Trans i18nKey="common:home">Home</Trans>
										</NavLink>
										<NavLink to={`/${currentLang}/products`}>
											<Trans i18nKey="common:products">Products</Trans>
										</NavLink>
										<NavLink to={`/${currentLang}/promotion`}>
											<Trans i18nKey="common:promotion">Promotion</Trans>
										</NavLink>
										<NavLink to={`/${currentLang}/blog`}>
											<Trans i18nKey="common:blog">Blog</Trans>
										</NavLink>
										<NavLink to={`/${currentLang}/contact`}>
											<Trans i18nKey="common:contact">Contact</Trans>
										</NavLink>
									</div>

									<ul className="navbar__user">
										<li>
											<Link to="#">
												<FontAwesomeIcon icon="search" />
											</Link>
										</li>
										<li className="checkout">
											<Link to={`/${currentLang}/cart`}>
												<FontAwesomeIcon icon="shopping-cart" />
												<span className="checkout__items">
													{cartList.length}
												</span>
											</Link>
										</li>
										<li>
											<button
												className="navbar__btn-menu"
												onClick={() => setShowMenu(true)}
											>
												<FontAwesomeIcon icon="bars" />
											</button>
										</li>
									</ul>
								</nav>
							</Grid>
						</Grid>
					</Container>
				</div>
			</header>

			{showForm && (
				<ProductForm closeClick={handleClose} onSubmit={handleSubmit} />
			)}
		</>
	);
}

export default Header;
