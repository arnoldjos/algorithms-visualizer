import React, { Component } from "react";

import * as algs from "../../algorithms/algorithms";
import css from "./SortingVisualizer.module.scss";

export default class SortingVisualizer extends Component {
	state = { array: [], numBars: 10 };

	componentDidMount() {
		console.log("reset");
		this.resetArray();
	}

	resetArray = () => {
		const array = [];
		for (let i = 0; i < this.state.numBars; i++) {
			array.push(this.randomIntFromInterval(5, 750));
		}
		this.setState({ array });
	};

	mergeSort = () => {
		console.log(this.state.array);
		const arrayBars = document.getElementsByClassName("Bars__bar");
		console.log(arrayBars);
		const sortedArr = algs.getMergeSortAnimations(this.state.array);
		// console.log(sortedArr);
		console.log(this.state.array);
	};

	render() {
		const { array } = this.state;

		return (
			<div className={css.Bars}>
				{array.map((value, idx) => (
					<div
						style={{ height: `${value}px` }}
						className={css.Bars__bar}
						key={idx}
					></div>
				))}
				<button onClick={this.resetArray} className={css.Bars__button}>
					Generate New Array
				</button>
				<button onClick={this.mergeSort} className={css.Bars__button}>
					Merge Sort
				</button>
			</div>
		);
	}

	randomIntFromInterval = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
}
