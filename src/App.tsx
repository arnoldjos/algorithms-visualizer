import React from "react";
import "./App.css";

import "./sass/_main.scss";
import Layout from "./Layouts/Layout";
import { Switch, Route } from "react-router-dom";

import Sorting from "./pages/Sorting/Sorting";
import Pathfinding from "./pages/Pathfinding/PathFinding";
import Home from "./pages/Home/Home";

const App: React.FC = () => {
	return (
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
	);
};

export default App;
