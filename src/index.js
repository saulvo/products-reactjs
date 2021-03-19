import { CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import store from "./app/store";
import App from "./components/App";
import NotFound from "./components/NotFound";
import "./i18n";
import reportWebVitals from "./reportWebVitals";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#1e1e27",
		},
		secondary: {
			main: "#fe4c50",
		},
	},
});

ReactDOM.render(
	// <React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<CssBaseline />
					<Suspense fallback={<div>Loading</div>}>
						<Switch>
							<Redirect exact from="/" to="/vi" />
							<Route path="/:lng" component={App} />
							<Route component={NotFound} />
						</Switch>
					</Suspense>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	// </React.StrictMode>
	,
	document.getElementById("root"),
);

reportWebVitals();
