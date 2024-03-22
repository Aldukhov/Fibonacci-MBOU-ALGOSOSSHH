import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { Button } from './button';


test('Btn with text', () => {
const { getByTestId } = render ( <Button text= 'Click'/>)
expect(getByTestId('btn')).toHaveTextContent('Click');
})

test('Btn without text', () => {
    const {getByTestId} = render (<Button />);

    expect(getByTestId('btn')).toBeInTheDocument();

    const pElement = getByTestId('btn').querySelector('p');

    expect(pElement).toBeInTheDocument();

    expect(pElement.textContent).toBe('');
})

test('Btn disabled', () => {
    const {getByTestId} = render (<Button disabled/>);

    expect(getByTestId('btn')).toBeDisabled();
})

test('Btn isLoader', () => {
    const {getByAltText} = render (<Button isLoader/>);

    expect(getByAltText('Загрузка.')).toBeInTheDocument();
})

test ('Btn onClick event', () => {
    const onClickMock = jest.fn();

    const { getByTestId } = render (<Button onClick={onClickMock}/>);

    fireEvent.click(getByTestId('btn'));

    expect(onClickMock).toHaveBeenCalledTimes(1);
})