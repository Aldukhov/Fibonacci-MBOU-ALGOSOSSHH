import React from 'react';
import { selectionFunc,bubbleFunc } from './utils';

describe('sortingArray function', () => {
    it('should sorting  the array correctly', () => {
        const elements = [2,8, 1, 5];
        selectionFunc(elements,false);

        expect(elements).toEqual([1, 2, 5, 8]);
    });

    
    it('should sorting the one simvol array correctly', () => {
        const elements = [1];

        selectionFunc(elements,false);

        expect(elements).toEqual([1]);
    });

    it('should sorting  the empty array correctly', () => {
        const elements = [];
       selectionFunc(elements,false);

        expect(elements).toEqual([]);
    });



});


describe('bubbleArray function', () => {
    it('should  bubble the array correctly', () => {
        const elements = [2,8, 1, 5];
        bubbleFunc(elements,false);

        expect(elements).toEqual([1, 2, 5, 8]);
    });

    
    it('should  bubble the one simvol array correctly', () => {
        const elements = [1];

        bubbleFunc(elements,false);

        expect(elements).toEqual([1]);
    });

    it('should  bubble the empty array correctly', () => {
        const elements = [];
        bubbleFunc(elements,false);

        expect(elements).toEqual([]);
    });



});

