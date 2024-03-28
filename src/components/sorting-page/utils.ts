export async function selectionFunc
    (elements: number[],
        ascending: boolean,
        sortedColors?: string[],
        delay?: (ms: number) => Promise<void>,
        setColumnColors?: (value: React.SetStateAction<string[]>) => void,
        setArr?: (value: React.SetStateAction<number[]>) => void): Promise<void> {

    for (let i = 0; i < elements.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < elements.length; j++) {

            if (sortedColors) {
                sortedColors[j] = '#D252E1';
                if (setColumnColors) {
                    setColumnColors([...sortedColors]);
                }
            }

            if (delay) {
                await delay(500);
            }

            if (!ascending ? elements[j] < elements[minIndex] : elements[j] > elements[minIndex]) {
                minIndex = j;
            }
        }

        const temp = elements[i];
        elements[i] = elements[minIndex];
        elements[minIndex] = temp;


        if (setArr) {
            setArr([...elements]);
        }

        if (sortedColors) {
            sortedColors[i] = '#7FE051';
            sortedColors[minIndex] = '#7FE051';
            if (setColumnColors) {
                setColumnColors([...sortedColors]);
            }
        }

    }

}

export async function bubbleFunc(elements: number[],
    ascending: boolean,
    sortedColors?: string[],
    delay?: (ms: number) => Promise<void>,
    setColumnColors?: (value: React.SetStateAction<string[]>) => void,
    setArr?: (value: React.SetStateAction<number[]>) => void): Promise<void> {

    for (let i = 0; i < elements.length - 1; i++) {

        for (let j = 0; j < elements.length - i - 1; j++) {

            if (sortedColors) {
                sortedColors[j] = '#D252E1';
                sortedColors[j + 1] = '#D252E1';
            }
            if (setColumnColors && sortedColors) {
                setColumnColors([...sortedColors]);
            }

            if (delay) {
                await delay(500);
            }

            if (!ascending ? elements[j] > elements[j + 1] : elements[j] < elements[j + 1]) {
                const temp = elements[j];
                elements[j] = elements[j + 1];
                elements[j + 1] = temp;

                if (setArr) {
                    setArr([...elements]);
                }

                if (sortedColors) {
                    sortedColors[j] = '#7FE051';
                    sortedColors[j + 1] = '#7FE051';
                }

                if (setColumnColors && sortedColors) {
                    setColumnColors([...sortedColors]);
                }

                if (delay) {
                    await delay(500);
                }

            } else {
                if (sortedColors) {
                    sortedColors[j] = '#7FE051';
                    sortedColors[j + 1] = '#7FE051';
                }
                if (setColumnColors && sortedColors) {
                    setColumnColors([...sortedColors]);
                }
                if (delay) {
                    await delay(500);
                }
            }
        }
    }
} 