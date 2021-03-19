import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, useHistory, useLocation } from "react-router-dom";
import content from "../../data/content";

function RenderRoute({ component: Component, title, path, ...rest }) {
	const history = useHistory();
	const location = useLocation();

	const currentLang = useSelector((state) => state.language.current);
	useEffect(() => {
		let newUrl = `/${currentLang}`;

		if (location.pathname.length !== 3) {
			newUrl = location.pathname.replace(/^\/.{2}\//, `/${currentLang}/`);
		}

		history.push(newUrl);
	}, [currentLang, history]);

	const { t } = useTranslation(["common"]);

	useEffect(() => {
		document.title = title
			? `${t(title)} | ${content.titlePage}`
			: content.titlePage;
	}, [currentLang, t, title, location.pathname]);

	return (
		<Route
			{...rest}
			render={(props) => {
				return (
					<div>
						<Component {...props} />
					</div>
				);
			}}
		/>
	);
}

export default RenderRoute;
