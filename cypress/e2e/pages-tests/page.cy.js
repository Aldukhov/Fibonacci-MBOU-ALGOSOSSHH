import '@testing-library/cypress/add-commands';
import  {appUrl} from '../../../src/constants/constants'
describe('service is available', function () {
    it('should be available on localhost:3000', function () {
        cy.visit(appUrl);
    });
});


describe('app works correctly with routes', function () {

    before(function () {
        cy.visit(appUrl);
    });

    it('Должен открывать главную страницу по умолчанию', function () {
        cy.contains('h1.main-page_title__eOF4m', 'МБОУ АЛГОСОШ').should('exist');
    });

    it('Должен открывать страницу рекурсии', function () {
        cy.visit(`${appUrl}/recursion`);
        cy.findByText('Строка').should('exist');
    });

    
    it('Должен открывать страницу чисел Фибоначчи', function () {
        cy.visit(`${appUrl}/fibonacci`);
        cy.findByText('Последовательность Фибоначчи').should('exist');
    });

    it('Должен открывать страницу сортировку массива', function () {
        cy.visit(`${appUrl}/sorting`);
        cy.findByText('Сортировка массива').should('exist');
    });

    it('Должен открывать страницу стека', function () {
        cy.visit(`${appUrl}/stack`);
        cy.findByText('Стек').should('exist');
    });

    it('Должен открывать страницу очереди', function () {
        cy.visit(`${appUrl}/queue`);
        cy.findByText('Очередь').should('exist');
    });

    it('Должен открывать главную страницу связного списка', function () {
        cy.visit(`${appUrl}/list`);
        cy.findByText('Связный список').should('exist');
    });

   
    it('Должен перенаправлять на главную страницу для несуществующего маршрута', function () {
        cy.visit(`${appUrl}/non-existent-route`);
        cy.location('pathname').should('eq', '/');
    });
    
}); 