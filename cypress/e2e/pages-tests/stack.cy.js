import '@testing-library/cypress/add-commands';
import { appUrl, btn, btnId, chanding, circleId, defaultC, form, input, inputId, isSmallId } from '../../../src/constants/constants'


describe('stack works correctly', function () {

    it('empty input', function () {
        cy.visit(`${appUrl}/stack`);
        cy.get('form').first().as('form');
        cy.get(form).find(inputId).as('input');
        cy.get(form).find(btnId).as('btn');
        cy.get(btn).should('be.disabled');

    });


    it('the fib numbers generate correctly', function () {
        cy.visit(`${appUrl}/stack`);
        cy.get('form').first().as('form');
        cy.get(form).find(inputId).as('input');
        cy.get(form).find(btnId).as('btn');
    
        const numbersToAdd = ['5', '3', '1'];
    
        numbersToAdd.forEach(number => {
            cy.get(input).clear().type(number);
            cy.get(btn).contains('Добавить').click();
    
            cy.get(circleId).last().find(isSmallId).should('have.css', 'border', `4px solid ${chanding}`);
            cy.wait(500);
            cy.get(circleId).last().find(isSmallId).should('have.css', 'border', `4px solid ${defaultC}`);
        });
    
        const container = cy.get(circleId);
        
        container.then(($elementsBeforeDelete) => {
            const countBeforeDelete = $elementsBeforeDelete.length;
            cy.get(btn).contains('Удалить').click();
    
            cy.get(circleId).last().find(isSmallId).should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    
            container.then(($elementsAfterDelete) => {
                const countAfterDelete = $elementsAfterDelete.length;
                expect(countAfterDelete).to.equal(countBeforeDelete - 2);
            });
        });
    
        cy.get(btn).contains('Очистить').click().then(() => {
            cy.get(circleId).should('not.exist');
        });
    });
    


}); 