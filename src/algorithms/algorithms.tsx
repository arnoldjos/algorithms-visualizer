export function mergeSort(arr: Array<number>): Array<number> {
	if (arr.length < 2) return arr;

	const mid = Math.floor(arr.length / 2);
	const left = arr.slice(0, mid);
	const right = arr.slice(mid);
	return merge(mergeSort(left), mergeSort(right));
}

function merge(left: Array<number>, right: Array<number>): Array<number> {
	let arr: Array<any> = [];

	while (left.length && right.length) {
		if (left[0] < right[0]) {
			arr.push(left.shift());
		} else {
			arr.push(right.shift());
		}
	}

	return arr.concat(left.concat(right));
}
