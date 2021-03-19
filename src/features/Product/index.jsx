import { Box, Container } from "@material-ui/core";
import React, { lazy, Suspense } from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import RenderRoute from "../../components/RenderRoute";

const ProdutListPage = lazy(() => import("./pages/List"));
const ProdutDetailPage = lazy(() => import("./pages/Detail"));
const NotFound = lazy(() => import("../../components/NotFound"));
function ProductFeatures(props) {
	const match = useRouteMatch();

	return (
		<Box mt={2}>
			<Container fixed>
				<Breadcrumb />
				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						<RenderRoute
							exact
							path={`${match.path}`}
							component={ProdutListPage}
						/>
						<RenderRoute
							title="products"
							path={`${match.path}/:productID`}
							component={ProdutDetailPage}
						/>
						<RenderRoute component={NotFound} title="404" />
					</Switch>
				</Suspense>
			</Container>
		</Box>
	);
}

export default ProductFeatures;
