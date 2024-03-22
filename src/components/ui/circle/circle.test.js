import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { Circle } from './circle';
import { Button } from '../button/button';
import { ElementStates } from '../../../types/element-states';

test('Circle with letters', () => {
const { getByTestId } = render ( <Circle letter = 'a'/>)
const pElement = getByTestId('letter');

    expect(pElement).toBeInTheDocument();

    expect(pElement.textContent).toBe('a');
})

test('Circle without text', () => {
    const {getByTestId} = render (<Circle />);

    const pElement = getByTestId('letter');

    expect(pElement).toBeInTheDocument();

    expect(pElement.textContent).toBe('');
})

test('Circle with head', () => {
    const {getByTestId} = render (<Circle head = '1'/>);

    const head = getByTestId('head');

    expect(head).toBeInTheDocument();

    expect(head).toHaveTextContent('1');
})


test('Circle with React element head', () => {

    const {getByTestId} = render (<Circle head = {<Button/>}/>);

    const head = getByTestId('head');

    expect(head).toBeInTheDocument();

    if (React.isValidElement(head)) {
        expect(React.isValidElement(head.props.children)).toBeTruthy();
    }
})

test('Circle with tail', () => {
    const {getByTestId} = render (<Circle tail = '1'/>);

    const tail = getByTestId('tail');

    expect(tail).toBeInTheDocument();

    expect(tail).toHaveTextContent('1');
})


test('Circle with React element tail', () => {

    const {getByTestId} = render (<Circle tail = {<Button/>}/>);

    const tail = getByTestId('tail');

    expect(tail).toBeInTheDocument();

    if (React.isValidElement(tail)) {
        expect(React.isValidElement(tail.props.children)).toBeTruthy();
    }
})


test('Circle with index', () => {

    const {getByTestId} = render (<Circle index = {5}/>);

    const index = getByTestId('index');

    expect(index).toBeInTheDocument();

    expect(index).toHaveTextContent('5');
})

test('Circle with isSmall', () => {

    const {getByTestId} = render (<Circle isSmall = {true}/>);

    const isSmall = getByTestId('isSmall');

    expect(isSmall).toBeInTheDocument();

    expect(isSmall).toHaveClass('small');
})

test('Circle with state default', () => {

    const {getByTestId} = render (<Circle state = {ElementStates.Default}/>);

    const isSmall = getByTestId('isSmall');

    expect(isSmall).toBeInTheDocument();

    expect(isSmall).toHaveClass('default');
})

test('Circle with state changing', () => {

    const {getByTestId} = render (<Circle state = {ElementStates.Changing}/>);

    const isSmall = getByTestId('isSmall');

    expect(isSmall).toBeInTheDocument();

    expect(isSmall).toHaveClass('changing');
})

test('Circle with state modified', () => {

    const {getByTestId} = render (<Circle state = {ElementStates.Modified}/>);

    const isSmall = getByTestId('isSmall');

    expect(isSmall).toBeInTheDocument();

    expect(isSmall).toHaveClass('modified');
})