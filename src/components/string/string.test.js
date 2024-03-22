import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { StringComponent } from './string';


test('Correctly reverses string with even number of characters', async () => {
    // Рендерим компонент
    const { getByText, getByTestId, getAllByTestId } = render(
        <BrowserRouter>
            <StringComponent />
        </BrowserRouter>
    );

    // Получаем инпут
    const input = getByTestId('input');

    // Вводим строку с четным количеством символов
    fireEvent.change(input, { target: { value: 'abcd' } });

    // Получаем кнопку "Развернуть"
    const button = getByText('Развернуть');

    // Нажимаем на кнопку
    fireEvent.click(button);

    await waitFor(() => {
        const btn = getByTestId('btn');
        if (btn.classList.contains('isLoader')) {
            
                const circlesElements = getAllByTestId('circle');
                const letterTexts = circlesElements.map(circle => {
                    const letterElement = circle.querySelector('[data-testid="letter"]');
                    return letterElement ? letterElement.textContent.trim() : '';
                });
                console.log(letterTexts);
             
        }
    })


});