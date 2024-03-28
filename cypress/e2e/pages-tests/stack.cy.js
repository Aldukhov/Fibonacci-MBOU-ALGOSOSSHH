import '@testing-library/cypress/add-commands';
import { appUrl } from '../../../src/constants/constants'


describe('stack works correctly', function () {

    it('empty input', function () {
        cy.visit(`${appUrl}/stack`);
        cy.get('form').first().as('form');
        cy.get('@form').find('[data-testid="input"]').as('input');
        cy.get('@form').find('[data-testid="btn"]').as('btn');
        cy.get('@btn').should('be.disabled');

    });


    it('the fib numbers generate correctly', function () {
        cy.visit(`${appUrl}/stack`);
        cy.get('form').first().as('form');
        cy.get('@form').find('[data-testid="input"]').as('input');
        cy.get('@form').find('[data-testid="btn"]').as('btn');
    
        const numbersToAdd = ['5', '3', '1'];
    
        numbersToAdd.forEach(number => {
            cy.get('@input').clear().type(number);
            cy.get('@btn').contains('Добавить').click();
    
            cy.get('[data-testid="circle"]').last().find('[data-testid="isSmall"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
            cy.wait(500);
            cy.get('[data-testid="circle"]').last().find('[data-testid="isSmall"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        });
    
        const container = cy.get('[data-testid="circle"]');
        
        container.then(($elementsBeforeDelete) => {
            const countBeforeDelete = $elementsBeforeDelete.length;
            cy.get('@btn').contains('Удалить').click();
    
            cy.get('[data-testid="circle"]').last().find('[data-testid="isSmall"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
    
            container.then(($elementsAfterDelete) => {
                const countAfterDelete = $elementsAfterDelete.length;
                expect(countAfterDelete).to.equal(countBeforeDelete - 2);
            });
        });
    
        cy.get('@btn').contains('Очистить').click().then(() => {
            cy.get('[data-testid="circle"]').should('not.exist');
        });
    });
    


}); 