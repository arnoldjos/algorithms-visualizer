import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import * as algs from "./algorithms";
import css from "./Sorting.module.scss";
import { theme } from "../../themes/theme";

export default class Sorting extends Component {
	state = {
		array: [],
		numBars: Math.floor(window.innerWidth / 15),
		disabled: false,
		sorting: false
	};

	componentDidMount() {
		this.createArray(null, true);
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	updateDimensions = () => {
		if (!this.state.sorting) {
			this.setState({ numBars: Math.floor(window.innerWidth / 15) });
			this.createArray(null);
		}
	};

	createArray = (event: any, initial = false) => {
		const array = [];
		for (let i = 0; i < this.state.numBars; i++) {
			array.push(this.randomIntFromInterval(5, 500));
		}
		this.resetBarColors(initial);
		this.setState({ array });
	};

	resetBarColors = (initial = false) => {
		if (!initial) {
			const arrayBars: any = this.getBars();

			for (let i = 0; i < arrayBars.length; i++) {
				arrayBars[i].style.backgroundColor =
					theme.palette.tertiary.light;
			}
		}
	};

	mergeSort = () => {
		this.startSort();
		const [animations, sortedArray] = algs.getMergeSortAnimations([
			...this.state.array
		]);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars: any = this.getBars();
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
						this.endSort();
						this.setState({ array: sortedArray });
					}
				}, i * 2);
			}
		}
	};

	bubbleSort = async () => {
		this.startSort();
		this.setState({ sorting: true });

		const arrayBars: any = this.getBars();
		const sortedArray = await algs.bubbleSort(
			[...this.state.array],
			arrayBars,
			0.5
		);

		this.endSort();
		this.setState({ sorting: false, array: sortedArray });
	};

	getBars = () => {
		return document.getElementsByClassName(css.Bars__bar);
	};

	startSort = () => {
		this.setState({ sorting: true });
	};

	endSort = () => {
		this.setState({ sorting: false });
	};

	render() {
		const { array, sorting } = this.state;

		return (
			<React.Fragment>
				<Container maxWidth="xl">
					<div className={css.Bars__controls}>
						<Button
							variant="contained"
							onClick={event => this.createArray(event, false)}
							color="secondary"
							disabled={sorting}
						>
							Generate New Array
						</Button>
						<Button
							variant="contained"
							onClick={this.bubbleSort}
							color="secondary"
							disabled={sorting}
						>
							Bubble Sort
						</Button>
						<Button
							variant="contained"
							onClick={this.mergeSort}
							color="secondary"
							disabled={sorting}
						>
							Merge Sort
						</Button>

						<Button
							variant="contained"
							onClick={this.mergeSort}
							color="secondary"
							disabled={sorting}
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
