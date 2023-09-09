export function findDuplicates<T>(arr: T[]): T[] {
  const duplicates: T[] = [];
  const counter: Record<string, number> = {};

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    counter[JSON.stringify(element)] =
      (counter[JSON.stringify(element)] || 0) + 1;
    if (counter[JSON.stringify(element)] === 2) {
      duplicates.push(element);
    }
  }

  return duplicates;
}
