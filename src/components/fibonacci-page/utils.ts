export function fibArray(n: number): number[] {

    const result = [];
    let a = 1, b = 1, temp;
    for (let i = 0; i <= n; i++) {
        result.push(a);
        temp = a + b;
        a = b;
        b = temp;
    }
    return result;

}