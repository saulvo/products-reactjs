import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import Price from "../../../Product/components/Price";
import CartItem from "../CartItem";

CartList.propTypes = {
	list: PropTypes.array.isRequired,
	removeClick: PropTypes.func,
	itemClick: PropTypes.func,
};

CartList.defaultProps = {
	removeClick: null,
	itemClick: null,
};

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	tableHead: {
		textTransform: "capitalize",
	},
	lastCell: {
		width: "5rem",
	},
	widthCell: {
		width: "7rem",
	},
	borderNone: {
		border: "none",
	},
});

function CartList({ list, removeClick, itemClick }) {
	const { t } = useTranslation(["cart"]);
	const classes = useStyles();

	console.log(list);

	return (
		<>
			<Table className={classes.table} aria-label="simple table">
				<TableHead className={classes.tableHead}>
					<TableRow>
						<TableCell className={classes.widthCell}>{t("image")}</TableCell>
						<TableCell>{t("productInfo")}</TableCell>
						<TableCell align="center">{t("price")}</TableCell>
						<TableCell align="center" className={classes.widthCell}>
							{t("quantity")}
						</TableCell>
						<TableCell align="center" className={classes.widthCell}>
							{t("money")}
						</TableCell>
						<TableCell align="center" className={classes.lastCell}></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{list.map((item, idx) => (
						<CartItem
							itemCart={item}
							key={idx}
							idxUpdate={idx}
							removeClick={removeClick}
							itemClick={itemClick}
						/>
					))}
					<TableRow>
						<TableCell className={classes.borderNone}></TableCell>
						<TableCell className={classes.borderNone}></TableCell>
						<TableCell className={classes.borderNone}></TableCell>
						<TableCell className={classes.borderNone} align="right">
							{t("total")}:
						</TableCell>
						<TableCell className={classes.borderNone} align="center">
							<Typography color="secondary" component="span" variant="body1">
								<b>
									<Price
										number={
											list.reduce((a, b) => {
												return a + b.money;
											}, 0) || 0
										}
									/>
								</b>
							</Typography>
						</TableCell>
						<TableCell className={classes.borderNone}></TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</>
	);
}

export default CartList;
