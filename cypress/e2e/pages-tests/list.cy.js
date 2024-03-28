import '@testing-library/cypress/add-commands';
import { appUrl } from '../../../src/constants/constants'


describe('stack works correctly', function () {

    it('empty input', function () {
        cy.visit(`${appUrl}/list`);
        cy.get('form').first().as('form');
        cy.get('@form').find('[data-testid="input"]').as('input');
        cy.get('@form').find('[data-testid="btn"]').as('btn');
        cy.get('@btn').should('be.disabled');

        cy.get('[data-testid="secondForm"]').find('[data-testid="inputIndex"]').as('inputIndex');
        cy.get('[data-testid="secondForm"]').find('[data-testid="btn"]').as('btn');
        cy.get('@btn').should('be.disabled');

    });


    it('the first list form works correctly', function () {
        cy.visit(`${appUrl}/list`);
        cy.get('form').first().as('form');
        cy.get('@form').find('[data-testid="input"]').as('input');
        cy.get('@form').find('[data-testid="btn"]').as('btn');
        cy.get('[data-testid="circle"]').as('circles');
        cy.get('@circles').should('be.visible').should('have.length', 4);

        // Добавление в head
        cy.get('@input').clear().type(5);
        cy.get('@btn').contains('Добавить в head').click();


        cy.get('.list_smallCircle__UOhVu').should('exist');

        cy.wait(500);

        cy.get("@circles").first().find('[data-testid="isSmall"]').should('have.css', 'border',
            '4px solid rgb(127, 224, 81)');

        cy.get("@circles").first().find('[data-testid="isSmall"]').should('have.css', 'border',
            '4px solid rgb(0, 50, 255)');
        cy.get('@circles').first().find('[data-testid="head"]').should('contain', 'head');
        //Добавление в tail

        cy.get('@input').clear().type(2);
        cy.get('@btn').contains('Добавить в tail').click();


        cy.get("@circles").last().find('[data-testid="isSmall"]').should('have.css', 'border',
            '4px solid rgb(127, 224, 81)');

        cy.get("@circles").last().find('[data-testid="isSmall"]').should('have.css', 'border',
            '4px solid rgb(0, 50, 255)');
        cy.get('@circles').last().find('[data-testid="tail"]').should('contain', 'tail');

        //Удаление в head
        cy.get('@input').clear().type(3);
        cy.get('@btn').contains('Добавить в head').click();
        cy.wait(2000);
        cy.get('@btn').contains('Удалить из head').click();
        cy.get('@circles').first().find('[data-testid="letter"]').should('contain', '5');
        cy.get('@circles').first().find('[data-testid="head"]').should('contain', 'head');

        //Удаление в tail

        cy.get('@input').clear().type(3);
        cy.get('@btn').contains('Добавить в tail').click();
        cy.wait(2000);
        cy.get('@btn').contains('Удалить из tail').click();
        cy.get('@circles').last().find('[data-testid="letter"]').should('contain', '2');
        cy.get('@circles').last().find('[data-testid="tail"]').should('contain', 'tail');


    });

    it('the second list form works correctly',function () {
        
        let value = '5'
        let index = 2

        cy.visit(`${appUrl}/list`);
        cy.get('form').first().as('form');
        cy.get('@form').find('[data-testid="input"]').as('input');
        cy.get('[data-testid="circle"]').as('circles');
        cy.get('@circles').should('be.visible').should('have.length', 4);
        cy.get('[data-testid="secondForm"]').find('[data-testid="inputIndex"]').as('inputIndex');
        cy.get('[data-testid="secondForm"]').find('[data-testid="btn"]').as('btn');

        cy.get('@input').clear().type(value);
        cy.get('@inputIndex').clear().type(index);
        
        let resultArray = []; 

        cy.get('[data-testid="circle"]').each(($circle) => {
            const letter = $circle.find('[data-testid="letter"]').text();
            const number = parseInt(letter, 10);
            if (!isNaN(number)) {
                resultArray.push(number);
            }
          });


        resultArray.splice(index, 0, +value)

        cy.get('@btn').contains('Добавить по индексу').click();

        cy.get('.list_smallCircle__UOhVu').should('exist');

        for (let k = 0; k <= index + 1; k++) {
            cy.get('@circles').then((circle) => {
                cy.wrap(circle)
                    .eq(k)
                    .find('[data-testid="isSmall"]')
                    .should('have.css', 'border-color', 'rgb(210, 82, 225)')
            })
        }

        cy.get('.list_smallCircle__UOhVu').should('not.exist');

        cy.get('@circles').then((circle) => {
            cy.wrap(circle)
                .eq(index)
                .find('[data-testid="isSmall"]')
                .should('have.css', 'border-color', 'rgb(127, 224, 81)')
        })

        cy.wait(500);

        for (let k = 0; k < resultArray.length; k++) {
            cy.get('@circles').then((circle) => {
                cy.wrap(circle)
                    .eq(k)
                    .find('[data-testid="isSmall"]')
                    .should('have.css', 'border-color', 'rgb(0, 50, 255)')
                cy.wrap(circle)
                    .eq(k)
                    .find('[data-testid="isSmall"]')
                    .should('have.text', resultArray[k])
            })
        }
    }) 

}); 