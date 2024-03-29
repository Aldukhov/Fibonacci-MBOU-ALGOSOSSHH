import '@testing-library/cypress/add-commands';
import { appUrl, btn, btnId, circleId, form, inputId} from '../../../src/constants/constants'
import {fibArray} from '../../../src/components/fibonacci-page/utils'

describe('fib works correctly', function () {

    it('empty input', function () {
        cy.visit(`${appUrl}/fibonacci`);
        cy.get('form').first().as('form');
        cy.get(form).find(inputId).as('input');
        cy.get(form).find(btnId).as('btn');
        cy.get(btn).should('be.disabled');

    });


    it('the fib numbers generate correctly', function () {
        cy.visit(`${appUrl}/fibonacci`);
        cy.get('form').first().as('form');
        cy.get(form).find(inputId).as('input');
        cy.get(form).find(btnId).as('btn');

        cy.get('@input').clear().type('5');
        cy.get(btn).click();

        // Проверяем, что круги располагаются на странице
        cy.get(circleId).should('be.visible').should('have.length', 5);

        // Проверяем, что числа Фибоначчи генерируются корректно
        cy.get(circleId).each(($circle, index) => {
            const expectedFibonacciNumber = fibArray(5)[index].toString();
            cy.wrap($circle).contains(expectedFibonacciNumber);
        });
    });


}); 