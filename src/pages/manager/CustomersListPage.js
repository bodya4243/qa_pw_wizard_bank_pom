import {expect} from '@playwright/test';

export class CustomersListPage {
    constructor(page) {
        this.page = page
        this.customersRows = page.locator('tbody tr')
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

    async assertCurrentCustomerNotPresent(firstName) {
        const currentCustomer = this.getCurrentUser({firstName: firstName})
        await expect(currentCustomer).not.toBeVisible()
    }

    async assertAddedCustomerFirstNameIsPresent(firstName){
        const currentCustomer = this.getCurrentUser({firstName: firstName})
        await expect(currentCustomer).toContainText(firstName)
    }

    async assertAddedCustomerLastNameIsPresent(lastName){
        const currentCustomer = this.getCurrentUser({lastName: lastName})

        await expect(currentCustomer.locator('td').nth(1)).toContainText(lastName)
    }

    async assertAddedCustomerPostCodeIsPresent(postCode){
        const currentCustomer = this.getCurrentUser({postCode: postCode})

        await expect(currentCustomer.locator('td').nth(2)).toContainText(postCode)
    }

    async assertAccountNumberIsAbsent(firstName){
        const currentCustomer = this.getCurrentUser({firstName: firstName})
        const accountNumber = currentCustomer.locator('td').nth(3)

        await expect(accountNumber).toBeEmpty()
    }

    async assertAccountNumberIsPresent(firstName){
        const currentCustomer = this.getCurrentUser({firstName: firstName})
        const accountNumber = currentCustomer.locator('td').nth(3)

        await expect(accountNumber).not.toBeEmpty()
    }

    async assertFilteredCustomerFirstNameIsPresent(fistName){
        await expect(this.customersRows.first().locator('td').first()).toHaveText(fistName)
    }

    async assertOnlyFilteredCustomerIsPresent(){
        await expect(this.customersRows).toHaveCount(1)
    }

    async deleteCurrentCustomer(firstName){
        const currentCustomer = this.getCurrentUser({firstName: firstName})

        await currentCustomer
            .locator('td')
            .last()
            .getByRole('button', {name: 'Delete'})
            .click()
    }

    getCurrentUser(criteria = {}) {
        let loc = this.customersRows;

        for (const val of Object.values(criteria)) {
            if (val) {
                loc = loc.filter({ has: this.page.locator('td').getByText(val, { exact: true }) });
            }
        }

        return loc
    }
}
