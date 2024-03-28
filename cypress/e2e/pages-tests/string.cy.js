import '@testing-library/cypress/add-commands';
import { appUrl } from '../../../src/constants/constants'


describe('string works correctly', function () {

    it('empty input', function () {
        cy.visit(`${appUrl}/recursion`);
        cy.get('form').first().as('form');
        cy.get('@form').find('[data-testid="input"]').as('input');
        cy.get('@form').find('[data-testid="btn"]').as('btn');
        cy.get('@btn').should('be.disabled');

    });

    it('the string unfolds correctly', function () {
        cy.visit(`${appUrl}/recursion`);
        cy.get('form').first().as('form');
        cy.get('@form').find('[data-testid="input"]').as('input');
        cy.get('@form').find('[data-testid="btn"]').as('btn');

        cy.get('@input').clear().type('qwert');
        cy.get('@btn').click();

        cy.get('[data-testid="circle"]').as('circles');
        // Проверяем, что круги располагаются на странице
        cy.get('@circles').should('be.visible').should('have.length', 5);



        cy.get('@circles').then(circles => {
            let index = 0;
            const middleIndex = Math.floor(circles.length / 2);
            while (index < circles.length / 2) {

                if (circles.length % 2 !== 0 && index === middleIndex) {
                    cy.wrap(circles.eq(index)).contains('qwert'.charAt(index));
                    cy.wrap(circles.eq(index)).find('[data-testid="isSmall"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
                } else {
                    cy.wrap(circles.eq(index)).contains('qwert'.charAt(index));
                    cy.wrap(circles.eq(circles.length - index - 1)).contains('qwert'.charAt(circles.length - index - 1));

                    // Проверяем стиль border для каждого круга
                    cy.wrap(circles.eq(index)).find('[data-testid="isSmall"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
                    cy.wrap(circles.eq(circles.length - index - 1)).find('[data-testid="isSmall"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)');

                    cy.wait(1000);

                    cy.wrap(circles.eq(index)).find('[data-testid="isSmall"]').should('have.css', 'border', '4px solid rgb(127, 224, 81)');
                    cy.wrap(circles.eq(circles.length - index - 1)).find('[data-testid="isSmall"]').should('have.css', 'border', '4px solid rgb(127, 224, 81)');
                }
                index++;
            }
        });


    });


}); 