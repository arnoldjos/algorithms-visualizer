import React, { Component } from "react";

import * as algs from "./algorithms";
import css from "./Sorting.module.scss";

export default class Sorting extends Component {
	state = { array: [], numBars: 100, refs: [] };

	componentDidMount() {
		this.resetArray();
	}

	resetArray = () => {
		const array = [];
		for (let i = 0; i < this.state.numBars; i++) {
			array.push(this.randomIntFromInterval(5, 500));
		}
		this.setState({ array });
	};

	mergeSort = () => {
		const animations = algs.getMergeSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars: any = document.getElementsByClassName(
				css.Bars__bar
			);
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? "red" : "#7986cb";
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * 2);
			} else {
				setTimeout(() => {
					const [barOneIdx, newHeight] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * 2);
			}
		}
	};

	render() {
		const { array } = this.state;
		console.log("rendering");

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
