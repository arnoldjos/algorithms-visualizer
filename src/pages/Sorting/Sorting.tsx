import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import * as algs from "./algorithms";
import css from "./Sorting.module.scss";

export default class Sorting extends Component {
	state = {
		array: [],
		numBars: Math.floor(window.innerWidth / 15),
		disabled: false
	};

	componentDidMount() {
		this.resetArray();
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	updateDimensions = () => {
		this.setState({ numBars: Math.floor(window.innerWidth / 15) });
		this.resetArray();
	};

	resetArray = () => {
		const array = [];
		for (let i = 0; i < this.state.numBars; i++) {
			array.push(this.randomIntFromInterval(5, 500));
		}
		this.setState({ array });
	};

	mergeSort = () => {
		this.disableButtons();
		const [animations, sortedArray] = algs.getMergeSortAnimations([
			...this.state.array
		]);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars: any = document.getElementsByClassName(
				css.Bars__bar
			);
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? "#e91e63" : "#7986cb";
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * 2);
			} else {
				setTimeout(() => {
					const [barOneIdx, newHeight] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
					if (i === animations.length - 1) {
						this.enableButtons();
						this.setState({ array: sortedArray });
					}
				}, i * 2);
			}
		}
	};

	bubbleSort = async () => {
		this.disableButtons();

		const sort = console.log("Bubble Sort");
		console.log(this.state.array);
		const arrayBars: any = document.getElementsByClassName(css.Bars__bar);

		const sortedArray = await algs.bubbleSort(
			[...this.state.array],
			arrayBars,
			0.5
		);
		// console.log(sortedArray);
		// this.setState({ array: sortedArray });
	};

	disableButtons = () => {
		this.setState({ disabled: true });
	};

	enableButtons = () => {
		this.setState({ disabled: false });
	};

	render() {
		const { array, disabled } = this.state;

		return (
			<React.Fragment>
				<Container maxWidth="xl">
					<div className={css.Bars__controls}>
						<Button
							variant="contained"
							onClick={this.resetArray}
							color="secondary"
							disabled={disabled}
						>
							Generate New Array
						</Button>
						<Button
							variant="contained"
							onClick={this.bubbleSort}
							color="secondary"
							disabled={disabled}
						>
							Bubble Sort
						</Button>
						<Button
							variant="contained"
							onClick={this.mergeSort}
							color="secondary"
							disabled={disabled}
						>
							Merge Sort
						</Button>

						<Button
							variant="contained"
							onClick={this.mergeSort}
							color="secondary"
							disabled={disabled}
						>
							Quick Sort
						</Button>
					</div>

					<div className={css.Bars}>
						{array.map((value, idx) => (
							<div
								style={{ height: `${value}px` }}
								className={css.Bars__bar}
								key={idx}
							></div>
						))}
					</div>
				</Container>
			</React.Fragment>
		);
	}

	randomIntFromInterval = (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
}
