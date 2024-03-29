import '@testing-library/cypress/add-commands';
import { appUrl, btn, btnId, chanding, circleId, circles, defaultC, form, headId, inputId, isSmallId, tailId } from '../../../src/constants/constants'


describe('stack works correctly', function () {

    it('empty input', function () {
        cy.visit(`${appUrl}/queue`);
        cy.get('form').first().as('form');
        cy.get(form).find(inputId).as('input');
        cy.get(form).find(btnId).as('btn');
        cy.get(btn).should('be.disabled');

    });


    it('the queue numbers generate correctly', function () {
        cy.visit(`${appUrl}/queue`);
        cy.get('form').first().as('form');
        cy.get(form).find(inputId).as('input');
        cy.get(form).find(btnId).as('btn');
        cy.get(circleId).as('circles');
        cy.get(circles).should('be.visible').should('have.length', 8);
        const numbersToAdd = ['5', '3', '1', '5','7'];

        // Добавление
        numbersToAdd.forEach((number, index) => {
            cy.get('@input').clear().type(number);
            cy.get(btn).contains('Добавить').click();
            if (index === 0) {
                cy.get(circles).eq(index).find(headId).should('contain', 'top');
                cy.get(circles).eq(index).find(tailId).should('contain', 'tail');
            } else {
                cy.get(circles).eq(index).find(tailId).should('contain', 'tail');
            }

            cy.get(circles).eq(index).find(isSmallId).should('have.css', 'border', `4px solid ${chanding}`);
            cy.wait(500);
            cy.get(circles).eq(index).find(isSmallId).should('have.css', 'border', `4px solid ${defaultC}`);
        });

        
        //Удаление

        cy.get(btn).contains('Удалить').click();
        cy.get(circles).first().find(isSmallId).should('have.css', 'border', `4px solid ${chanding}`);
        cy.wait(500);
        cy.get(circles).eq(1).find(headId).should('contain', 'top');

        cy.wait(1000);

        //Очищение
        cy.get(btn).contains('Очистить').click().then(() => {
            // Проверьте, что у всех кругов нет текста
            cy.get(circleId).each($circle => {
                cy.wrap($circle).should('not.have.text');
            });
        });

    });



}); 