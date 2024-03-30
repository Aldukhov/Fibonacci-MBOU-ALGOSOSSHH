import '@testing-library/cypress/add-commands';
import { appUrl, btn, btnId, chanding, circleId, circles, defaultC, form, input, inputId, isSmallId, modified } from '../../../src/constants/constants'


describe('string works correctly', function () {

    it('empty input', function () {
        cy.visit(`${appUrl}/recursion`);
        cy.get('form').first().as('form');
        cy.get(form).find(inputId).as('input');
        cy.get(form).find(btnId).as('btn');
        cy.get(btn).should('be.disabled');

    });

    it('the string unfolds correctly', function () {
        cy.visit(`${appUrl}/recursion`);
        cy.get('form').first().as('form');
        cy.get(form).find(inputId).as('input');
        cy.get(form).find(btnId).as('btn');

        cy.get(input).clear().type('qwert');
        cy.get(btn).click();

        cy.get(circleId).as('circles');
        // Проверяем, что круги располагаются на странице
        cy.get(circles).should('be.visible').should('have.length', 5);



        cy.get(circles).then(circles => {
            let index = 0;
            const middleIndex = Math.floor(circles.length / 2);
            while (index < circles.length / 2) {

                if (circles.length % 2 !== 0 && index === middleIndex) {
                    cy.wrap(circles.eq(index)).contains('qwert'.charAt(index));
                    cy.wrap(circles.eq(index)).find(isSmallId).should('have.css', 'border', `4px solid ${defaultC}`);
                } else {
                    cy.wrap(circles.eq(index)).contains('qwert'.charAt(index));
                    cy.wrap(circles.eq(circles.length - index - 1)).contains('qwert'.charAt(circles.length - index - 1));

                    // Проверяем стиль border для каждого круга
                    cy.wrap(circles.eq(index)).find(isSmallId).should('have.css', 'border', `4px solid ${chanding}`);
                    cy.wrap(circles.eq(circles.length - index - 1)).find(isSmallId).should('have.css', 'border', `4px solid ${chanding}`);

                    cy.wait(1000);

                    cy.wrap(circles.eq(index)).find(isSmallId).should('have.css', 'border', `4px solid ${modified}`);
                    cy.wrap(circles.eq(circles.length - index - 1)).find(isSmallId).should('have.css', 'border', `4px solid ${modified}`);
                }
                index++;
            }
        });


    });


}); 