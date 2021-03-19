import { Box } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { Trans } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";

Breadcrumb.propTypes = {};

const useStyles = makeStyles((theme) => ({
	beadcrumb: {
		textTransform: "capitalize",
		paddingBottom: "1rem",
		marginBottom: "2.5rem",
		borderBottom: '1px solid #eee'
	},
	link: {
		display: "flex",
		fontSize: "0.9rem",
		color: "rgba(0, 0, 0, 0.54)"
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
}));

function Breadcrumb(props) {
	const { url } = useRouteMatch();
	const currentLang = useSelector((state) => state.language.current);
	const classes = useStyles();
	return (
		<>
			<Breadcrumbs aria-label="breadcrumb" className={classes.beadcrumb}>
				<NavLink color="inherit" to={`/${currentLang}`} className={classes.link}>
					<HomeIcon className={classes.icon} />
					<Trans i18nKey="common:home">Home</Trans>
				</NavLink>
				<Typography color="textPrimary">
					<Box fontSize="0.9rem" component="span">
						<Trans i18nKey={`common:${url.slice(4)}`}>url.slice(4)</Trans>
					</Box>
				</Typography>
			</Breadcrumbs>
		</>
	);
}

export default Breadcrumb;
