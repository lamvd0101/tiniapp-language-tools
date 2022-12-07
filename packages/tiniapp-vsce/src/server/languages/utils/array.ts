export function findFirst<T>(array: T[], p: (x: T) => boolean): number {
  let low = 0,
    high = array.length;
  if (high === 0) {
    return 0; // no children
  }
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (p(array[mid])) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
}

export function binarySearch<T>(
  array: T[],
  key: T,
  comparator: (op1: T, op2: T) => number,
): number {
  let low = 0,
    high = array.length - 1;

  while (low <= high) {
    const mid = ((low + high) / 2) | 0;
    const comp = comparator(array[mid], key);
    if (comp < 0) {
      low = mid + 1;
    } else if (comp > 0) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -(low + 1);
}
