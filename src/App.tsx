import React from "react";
import "./App.css";

import "./sass/_main.scss";

import SortingVisualizer from "./components/SortingVisualizer/SortingVisualizer";

const App: React.FC = () => {
	return (
		<div className="App">
			<SortingVisualizer />
		</div>
	);
};

export default App;
