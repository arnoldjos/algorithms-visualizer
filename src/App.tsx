import React from "react";
import "./App.css";

import "./sass/_main.scss";
import Layout from "./Layouts/Layout";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import Sorting from "./pages/Sorting/Sorting";
import Pathfinding from "./pages/Pathfinding/PathFinding";
import Home from "./pages/Home/Home";
import { theme } from "./themes/theme";

const App: React.FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<Layout>
				<Switch>
					<Route path="/sorting">
						<Sorting />
					</Route>
					<Route path="/pathfinding">
						<Pathfinding />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</Layout>
		</ThemeProvider>
	);
};

export default App;
