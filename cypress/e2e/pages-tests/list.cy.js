import '@testing-library/cypress/add-commands';
import {
    appUrl, form, inputId,
    secondForm, btn, btnId,
    inputIndexId, circleId, circles,
    input,smallCircleClass, isSmallId, headId, tailId, letterId, modified, defaultC, inputIndex, chanding
} from '../../../src/constants/constants'


describe('stack works correctly', function () {

    it('empty input', function () {
        cy.visit(`${appUrl}/list`);
        cy.get('form').first().as('form');
        cy.get(form).find(inputId).as('input');
        cy.get(form).find(btnId).as('btn');
        cy.get(btn).should('be.disabled');

        cy.get(secondForm).find(inputIndexId).as('inputIndex');
        cy.get(secondForm).find(btnId).as('btn');
        cy.get(btn).should('be.disabled');

    });


    it('the first list form works correctly', function () {
        cy.visit(`${appUrl}/list`);
        cy.get('form').first().as('form');
        cy.get(form).find(inputId).as('input');
        cy.get(form).find(btnId).as('btn');
        cy.get(circleId).as('circles');
        cy.get(circles).should('be.visible').should('have.length', 4);

        // Добавление в head
        cy.get(input).clear().type(5);
        cy.get(btn).contains('Добавить в head').click();


        cy.get(smallCircleClass).should('exist');

        cy.wait(500);

        cy.get(circles).first().find(isSmallId).should('have.css', 'border',
            `4px solid ${modified}`);

        cy.get(circles).first().find(isSmallId).should('have.css', 'border',
           `4px solid ${defaultC}`);
        cy.get(circles).first().find(headId).should('contain', 'head');
        //Добавление в tail

        cy.get(input).clear().type(2);
        cy.get(btn).contains('Добавить в tail').click();


        cy.get(circles).last().find(isSmallId).should('have.css', 'border',
            `4px solid ${modified}`);

        cy.get(circles).last().find(isSmallId).should('have.css', 'border',
           `4px solid ${defaultC}`);
        cy.get(circles).last().find(tailId).should('contain', 'tail');

        //Удаление в head
        cy.get(input).clear().type(3);
        cy.get(btn).contains('Добавить в head').click();
        cy.wait(2000);
        cy.get(btn).contains('Удалить из head').click();
        cy.get(circles).first().find(letterId).should('contain', '5');
        cy.get(circles).first().find(headId).should('contain', 'head');

        //Удаление в tail

        cy.get(input).clear().type(3);
        cy.get(btn).contains('Добавить в tail').click();
        cy.wait(2000);
        cy.get(btn).contains('Удалить из tail').click();
        cy.get(circles).last().find(letterId).should('contain', '2');
        cy.get(circles).last().find(tailId).should('contain', 'tail');


    });

    it('the second list form works correctly', function () {

        let value = '5'
        let index = 2

        cy.visit(`${appUrl}/list`);
        cy.get('form').first().as('form');
        cy.get(form).find(inputId).as('input');
        cy.get(circleId).as('circles');
        cy.get(circles).should('be.visible').should('have.length', 4);
        cy.get(secondForm).find(inputIndexId).as('inputIndex');
        cy.get(secondForm).find(btnId).as('btn');

        cy.get(input).clear().type(value);
        cy.get(inputIndex).clear().type(index);

        let resultArray = [];

        cy.get(circles).each(($circle) => {
            const letter = $circle.find(letterId).text();
            cy.log(letter);

            const number = parseInt(letter, 10);
            cy.log(number);

            if (!isNaN(number)) {
                resultArray.push(number);
                cy.log(resultArray[resultArray.length - 1]);
            }
        }).then(() => {
            resultArray.splice(index, 0, +value)
            cy.get(btn).contains('Добавить по индексу').click();

            cy.get(smallCircleClass).should('exist');

            for (let k = 0; k <= index; k++) {
                cy.get('.list_bigCircle__mpUsa').then((circle) => {
                    cy.wrap(circle)
                        .eq(k)
                        .find(isSmallId)
                        .should('have.css', 'border-color', chanding)
                })

                cy.wait(500);
            }

            cy.get(smallCircleClass).should('not.exist');

            cy.get(circles).then((circle) => {
                cy.wrap(circle)
                    .eq(index)
                    .find(isSmallId)
                    .should('have.css', 'border-color', modified)
            })

            cy.wait(500);

            for (let k = 0; k < resultArray.length; k++) {
                cy.get(circles).then((circle) => {
                    cy.wrap(circle)
                        .eq(k)
                        .find(isSmallId)
                        .should('have.css', 'border-color', defaultC)
                    cy.wrap(circle)
                        .eq(k)
                        .find(isSmallId)
                        .should('have.text', resultArray[k])
                })
            }
        })



    })

    it('the second delete to index works correctly', function () {

        cy.clock()

        let index = 2

        cy.visit(`${appUrl}/list`);
        cy.get(circleId).as('circles');
        cy.get(circles).should('be.visible').should('have.length', 4);
        cy.get(secondForm).find(inputIndexId).as('inputIndex');
        cy.get(secondForm).find(btnId).as('btn');

        cy.get(inputIndex).clear().type(index);

        let resultArray = [];

        cy.get(circles).each(($circle) => {
            const letter = $circle.find(letterId).text();
            cy.log(letter);

            const number = parseInt(letter, 10);
            cy.log(number);

            if (!isNaN(number)) {
                resultArray.push(number);
                cy.log(resultArray[resultArray.length - 1]);
            }
        }).then(() => {
            let deletedElement = resultArray.splice(index, 1)

            cy.get(btn).contains('Удалить по индексу').click()

            for (let k = 0; k <= index; k++) {
                cy.get('.list_bigCircle__mpUsa').then((circle) => {
                    cy.tick(1000);
                    cy.wrap(circle)
                        .eq(k)
                        .find(isSmallId)
                        .should('have.css', 'border-color', chanding)
                })
            }

            cy.tick(1000);

            cy.get(smallCircleClass).should('exist');

            cy.get(smallCircleClass).find(isSmallId)
                .should('have.text', deletedElement[0])
                .should('have.css', 'border-color', chanding)

            cy.get('.list_bigCircle__mpUsa').then((circle) => {
                cy.wrap(circle)
                    .eq(index)
                    .find(isSmallId)
                    .should('have.text', '')
            })

            cy.tick(1000);

            cy.get('.list_bigCircle__mpUsa').then((circle) => {
                cy.wrap(circle)
                    .eq(index - 1)
                    .find(isSmallId)
                    .should('have.css', 'border-color', modified)
            })

        })

    })


}); 