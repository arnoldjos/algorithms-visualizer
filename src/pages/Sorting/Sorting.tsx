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

	mergeSort = async () => {
		this.startSort();
		const sortedArray = await algs.startMergeSort(
			[...this.state.array],
			this.getBars()
		);
		this.endSort();
		this.setState({ array: sortedArray });
	};

	bubbleSort = async () => {
		this.startSort();
		this.setState({ sorting: true });

		const arrayBars: any = this.getBars();
		const sortedArray = await algs.bubbleSort(
			[...this.state.array],
			arrayBars,
			50
		);

		this.endSort();
		this.setState({ array: sortedArray });
	};

	quickSort = async () => {
		console.log(this.state.array);
		const sortedArray = await algs.quickSort(
			[...this.state.array],
			this.getBars()
		);
		console.log(sortedArray);
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
							onClick={this.quickSort}
							color="secondary"
							disabled={sorting}
						>
							Quick Sort
						</Button>
					</div>

					<div className={css.Bars} id="Bars">
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
