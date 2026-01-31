import {expect} from '@playwright/test';

export class CustomersListPage {
    constructor(page) {
        this.page = page
        this.customersRows = page.locator('tbody tr')
        this.currentCustomerRow = this.customersRows.last()
        this.currentCustomerAccountNumber = this.currentCustomerRow.locator('td').nth(3)
        this.searchField = page.getByPlaceholder('Search Customer')
    }

    async open() {
        await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
    }

    async reloadPage() {
        await this.page.reload()
    }

    async fillSearchField(value) {
        await this.searchField.fill(value)
    }

    async assertCurrentCustomerNotPresent() {
        const defaultAmountOfCustomers = await this.customersRows.count() + 1 //+1 logined
        await expect(this.customersRows).toHaveCount(defaultAmountOfCustomers -1)
    }

    async assertAddedCustomerFirstNameIsPresent(firstName){
        await expect(this.currentCustomerRow.locator('td').first()).toContainText(firstName)
    }

    async assertAddedCustomerLastNameIsPresent(lastName){
        await expect(this.currentCustomerRow.locator('td').nth(1)).toContainText(lastName)
    }

    async assertAddedCustomerPostCodeIsPresent(postCode){
        await expect(this.currentCustomerRow.locator('td').nth(2)).toContainText(postCode)
    }

    async assertAccountNumberIsAbsent(){
        await expect(this.currentCustomerAccountNumber).toBeEmpty();
    }

    async assertAccountNumberIsPresent(){
        await expect(this.currentCustomerAccountNumber).not.toBeEmpty()
    }

    async assertFilteredCustomerFirstNameIsPresent(fistName){
        await expect(this.customersRows.first().locator('td').first()).toHaveText(fistName)
    }

    async assertOnlyFilteredCustomerIsPresent(){
        await expect(this.customersRows).toHaveCount(1)
    }

    async deleteCurrentCustomer(){
        await this.customersRows
            .last()
            .locator('td')
            .last()
            .getByRole('button', {name: 'Delete'})
            .click()
    }
}
