import '@testing-library/cypress/add-commands';
import { appUrl } from '../../../src/constants/constants'


describe('stack works correctly', function () {

    it('empty input', function () {
        cy.visit(`${appUrl}/queue`);
        cy.get('form').first().as('form');
        cy.get('@form').find('[data-testid="input"]').as('input');
        cy.get('@form').find('[data-testid="btn"]').as('btn');
        cy.get('@btn').should('be.disabled');

    });


    it('the queue numbers generate correctly', function () {
        cy.visit(`${appUrl}/queue`);
        cy.get('form').first().as('form');
        cy.get('@form').find('[data-testid="input"]').as('input');
        cy.get('@form').find('[data-testid="btn"]').as('btn');
        cy.get('[data-testid="circle"]').as('circles');
        cy.get('@circles').should('be.visible').should('have.length', 8);
        const numbersToAdd = ['5', '3', '1', '5','7'];

        // Добавление
        numbersToAdd.forEach((number, index) => {
            cy.get('@input').clear().type(number);
            cy.get('@btn').contains('Добавить').click();
            if (index === 0) {
                cy.get('@circles').eq(index).find('[data-testid="head"]').should('contain', 'top');
                cy.get('@circles').eq(index).find('[data-testid="tail"]').should('contain', 'tail');
            } else {
                cy.get('@circles').eq(index).find('[data-testid="tail"]').should('contain', 'tail');
            }

            cy.get('@circles').eq(index).find('[data-testid="isSmall"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
            cy.wait(500);
            cy.get('@circles').eq(index).find('[data-testid="isSmall"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        });

        
        //Удаление

        cy.get('@btn').contains('Удалить').click();
        cy.get('@circles').first().find('[data-testid="isSmall"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.wait(500);
        cy.get('@circles').eq(1).find('[data-testid="head"]').should('contain', 'top');

        cy.wait(1000);

        //Очищение
        cy.get('@btn').contains('Очистить').click().then(() => {
            // Проверьте, что у всех кругов нет текста
            cy.get('[data-testid="circle"]').each($circle => {
                cy.wrap($circle).should('not.have.text');
            });
        });

    });



}); 