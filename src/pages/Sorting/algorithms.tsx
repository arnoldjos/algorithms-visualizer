export function getMergeSortAnimations(arr: Array<number>): Array<any> {
	if (arr.length < 2) return arr;
	const animations: Array<any> = [];
	const auxArray = arr.slice();
	mergeSort(arr, 0, arr.length - 1, auxArray, animations);
	return [animations, arr];
}

function mergeSort(
	mainArray: Array<number>,
	startIdx: number,
	endIdx: number,
	auxArray: Array<number>,
	animations: Array<any>
) {
	if (startIdx === endIdx) return;
	const midIdx = Math.floor((startIdx + endIdx) / 2);
	mergeSort(auxArray, startIdx, midIdx, mainArray, animations);
	mergeSort(auxArray, midIdx + 1, endIdx, mainArray, animations);
	merge(mainArray, startIdx, midIdx, endIdx, auxArray, animations);
}

function merge(
	mainArray: Array<number>,
	startIdx: number,
	midIdx: number,
	endIdx: number,
	auxArray: Array<number>,
	animations: Array<any>
) {
	// Counter for main array
	let k = startIdx;
	// Counter for left side of array
	let i = startIdx;
	// Counter for right side of array
	let j = midIdx + 1;

	// Compare values of left and right arrays then set the mainarray at index k to the lowest of the two
	while (i <= midIdx && j <= endIdx) {
		animations.push([i, j]);
		animations.push([i, j]);
		if (auxArray[i] <= auxArray[j]) {
			animations.push([k, auxArray[i]]);
			mainArray[k++] = auxArray[i++];
		} else {
			animations.push([k, auxArray[j]]);
			mainArray[k++] = auxArray[j++];
		}
	}

	// Push to the end of the main array the remaining values of the left side of the array
	while (i <= midIdx) {
		animations.push([i, i]);
		animations.push([i, i]);
		animations.push([k, auxArray[i]]);
		mainArray[k++] = auxArray[i++];
	}

	// Push to the end of the main array the remaining values of the right side of the array
	while (j <= endIdx) {
		animations.push([j, j]);
		animations.push([j, j]);
		animations.push([k, auxArray[j]]);
		mainArray[k++] = auxArray[j++];
	}
}

export async function bubbleSort(
	array: Array<number>,
	arrayBars: any,
	speed: number
) {
	let animations: Array<any> = [];
	const arrLength = array.length;
	for (let i = 0; i < arrLength - 1; i++) {
		for (let j = 0; j < arrLength - i - 1; j++) {
			await new Promise(resolve =>
				setTimeout(() => {
					resolve();
				}, speed)
			);
			arrayBars[j].style.backgroundColor = "#FF4949";
			arrayBars[j + 1].style.backgroundColor = "#FF4949";

			if (array[j] > array[j + 1]) {
				const temp = array[j];

				array[j] = array[j + 1];
				array[j + 1] = temp;

				arrayBars[j].style.height = `${array[j]}px`;
				arrayBars[j + 1].style.height = `${array[j + 1]}px`;
				arrayBars[j].style.backgroundColor = "green";
				arrayBars[j + 1].style.backgroundColor = "greem";
			}
		}
	}
	return [array];
}
