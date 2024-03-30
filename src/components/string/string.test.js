import React from 'react';
import { reverseArray } from './utils';

describe('reverseArray function', () => {
    it('should reverse the array correctly', () => {
        const elements = [2, 3, 4, 5];
        const temp = null;

        let l = 0;
        let r = elements.length - 1;

        while (l < r) {
            reverseArray(elements, l, r, temp);

            l++;
            r--;
        }
        expect(elements).toEqual([5, 4, 3, 2]);
    });

    it('should reverse the odd array correctly', () => {
        const elements = [1, 2, 3, 4, 5];
        const temp = null;

        let l = 0;
        let r = elements.length - 1;

        while (l < r) {
            reverseArray(elements, l, r, temp);

            l++;
            r--;
        }
        expect(elements).toEqual([5, 4, 3, 2, 1]);
    });


    it('should reverse the one simvol array correctly', () => {
        const elements = [1];
        const temp = null;

        let l = 0;
        let r = elements.length - 1;

        while (l < r) {
            reverseArray(elements, l, r, temp);

            l++;
            r--;
        }
        expect(elements).toEqual([1]);
    });

    it('should reverse the empty array correctly', () => {
        const elements = [];
        const temp = null;

        let l = 0;
        let r = elements.length - 1;

        while (l < r) {
            reverseArray(elements, l, r, temp);

            l++;
            r--;
        }
        expect(elements).toEqual([]);
    });



});

