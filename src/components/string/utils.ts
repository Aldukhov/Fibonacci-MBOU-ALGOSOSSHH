export function reverseArray<T>(elements: T[], l: number, r: number, temp: T): void {

    if (elements.length > 1) {
        temp = elements[l];
        elements[l] = elements[r];
        elements[r] = temp;
    }

}