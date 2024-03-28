import '@testing-library/cypress/add-commands';
import { appUrl } from '../../../src/constants/constants'
import {fibArray} from '../../../src/components/fibonacci-page/utils'

describe('fib works correctly', function () {

    it('empty input', function () {
        cy.visit(`${appUrl}/fibonacci`);
        cy.get('form').first().as('form');
        cy.get('@form').find('[data-testid="input"]').as('input');
        cy.get('@form').find('[data-testid="btn"]').as('btn');
        cy.get('@btn').should('be.disabled');

    });


    it('the fib numbers generate correctly', function () {
        cy.visit(`${appUrl}/fibonacci`);
        cy.get('form').first().as('form');
        cy.get('@form').find('[data-testid="input"]').as('input');
        cy.get('@form').find('[data-testid="btn"]').as('btn');

        cy.get('@input').clear().type('5');
        cy.get('@btn').click();

        // Проверяем, что круги располагаются на странице
        cy.get('[data-testid="circle"]').should('be.visible').should('have.length', 5);

        // Проверяем, что числа Фибоначчи генерируются корректно
        cy.get('[data-testid="circle"]').each(($circle, index) => {
            const expectedFibonacciNumber = fibArray(5)[index].toString();
            cy.wrap($circle).contains(expectedFibonacciNumber);
        });
    });


}); 