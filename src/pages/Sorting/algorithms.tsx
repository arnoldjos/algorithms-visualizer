import { theme } from "../../themes/theme";

export async function startMergeSort(arr: Array<number>, arrayBars: any) {
	if (arr.length < 2) return arr;
	const auxArray = arr.slice();
	await mergeSort(arr, 0, arr.length - 1, auxArray, arrayBars);
	return arr;
}

async function mergeSort(
	mainArray: Array<number>,
	startIdx: number,
	endIdx: number,
	auxArray: Array<number>,
	arrayBars: any
) {
	if (startIdx === endIdx) return;
	const midIdx = Math.floor((startIdx + endIdx) / 2);
	await mergeSort(auxArray, startIdx, midIdx, mainArray, arrayBars);
	await mergeSort(auxArray, midIdx + 1, endIdx, mainArray, arrayBars);
	await merge(mainArray, startIdx, midIdx, endIdx, auxArray, arrayBars);
}

async function merge(
	mainArray: Array<number>,
	startIdx: number,
	midIdx: number,
	endIdx: number,
	auxArray: Array<number>,
	arrayBars: any
) {
	// Counter for main array
	let k = startIdx;
	// Counter for left side of array
	let i = startIdx;
	// Counter for right side of array
	let j = midIdx + 1;

	// Compare values of left and right arrays then set the mainarray at index k to the lowest of the two
	while (i <= midIdx && j <= endIdx) {
		let isIndexI = false;

		arrayBars[i].style.backgroundColor = theme.palette.error.main;
		arrayBars[j].style.backgroundColor = theme.palette.error.main;

		await new Promise(resolve =>
			setTimeout(() => {
				resolve();
			}, 50)
		);

		if (auxArray[i] <= auxArray[j]) {
			// arrayBars[k].style.backgroundColor = theme.palette.success.main;
			isIndexI = true;
			arrayBars[k].style.height = `${auxArray[i]}px`;
			mainArray[k++] = auxArray[i];
		} else {
			// arrayBars[k].style.backgroundColor = theme.palette.success.main;
			isIndexI = false;
			arrayBars[k].style.height = `${auxArray[j]}px`;
			mainArray[k++] = auxArray[j];
		}

		arrayBars[!isIndexI ? j++ : j].style.backgroundColor =
			theme.palette.tertiary.light;
		arrayBars[isIndexI ? i++ : i].style.backgroundColor =
			theme.palette.tertiary.light;
	}

	// Push to the end of the main array the remaining values of the left side of the array
	while (i <= midIdx) {
		arrayBars[k].style.height = `${auxArray[i]}px`;
		mainArray[k++] = auxArray[i++];
	}

	// Push to the end of the main array the remaining values of the right side of the array
	while (j <= endIdx) {
		arrayBars[k].style.height = `${auxArray[j]}px`;
		mainArray[k++] = auxArray[j++];
	}
}

export async function bubbleSort(
	array: Array<number>,
	arrayBars: any,
	speed: number
) {
	const arrLength = array.length;
	for (let i = 0; i < arrLength - 1; i++) {
		for (let j = 0; j < arrLength - i - 1; j++) {
			arrayBars[j].style.backgroundColor = theme.palette.error.main;
			arrayBars[j + 1].style.backgroundColor = theme.palette.error.main;

			await new Promise(resolve =>
				setTimeout(() => {
					resolve();
				}, speed)
			);

			if (array[j] > array[j + 1]) {
				swap(array, j, j + 1);

				arrayBars[j].style.height = `${array[j]}px`;
				arrayBars[j + 1].style.height = `${array[j + 1]}px`;
			}

			arrayBars[j].style.backgroundColor = theme.palette.tertiary.light;
			arrayBars[j + 1].style.backgroundColor =
				theme.palette.tertiary.light;
		}

		arrayBars[arrayBars.length - i - 1].style.backgroundColor =
			theme.palette.success.main;
		if (i === array.length - 2) {
			arrayBars[0].style.backgroundColor = theme.palette.success.main;
		}
	}
	return array;
}

export async function quickSort(
	array: Array<number>,
	arrayBars: any,
	low: number = 0,
	high: number = array.length - 1
) {
	if (array.length < 2) return array;

	if (low < high) {
		let pi: number = await partition(array, low, high, arrayBars);

		quickSort(array, arrayBars, low, pi - 1);
		quickSort(array, arrayBars, pi + 1, high);
	}

	return array;
}

async function partition(
	array: Array<number>,
	low: number,
	high: number,
	arrayBars: any
) {
	let i = low - 1;
	let pivot = array[high];

	for (let j = low; j <= high; j++) {
		arrayBars[j].style.backgroundColor = theme.palette.error.main;
		arrayBars[high].style.backgroundColor = theme.palette.error.main;
		await new Promise(resolve =>
			setTimeout(() => {
				resolve();
			}, 25)
		);

		if (array[j] < pivot) {
			i++;
			arrayBars[i].style.height = `${array[j]}px`;
			arrayBars[j].style.height = `${array[i]}px`;
			swap(array, i, j);
		}

		arrayBars[j].style.backgroundColor = theme.palette.tertiary.light;
		arrayBars[high].style.backgroundColor = theme.palette.tertiary.light;
		// arrayBars[i + 1].style.backgroundColor = theme.palette.tertiary.light;
	}

	arrayBars[i + 1].style.height = `${array[high]}px`;
	arrayBars[high].style.height = `${array[i + 1]}px`;
	swap(array, i + 1, high);

	return i + 1;
}

function swap(array: Array<number>, idx1: number, idx2: number) {
	const temp = array[idx1];
	array[idx1] = array[idx2];
	array[idx2] = temp;
}
