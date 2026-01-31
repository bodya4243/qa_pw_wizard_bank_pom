import {expect} from '@playwright/test';

export class OpenAccountPage {
    constructor(page) {
        this.page = page;
        this.currencySelectMenu = page.locator('#currency')
        this.customerSelectMenu = page.locator('#userSelect')
        this.processButton = page.getByRole('button', {name: 'Process'})
    }

    async open() {
        await this.page.goto(
            '/angularJs-protractor/BankingProject/#/manager/openAccount',
        );
    }

    async clickOnCurrencySelectMenu() {
        await this.currencySelectMenu.click()
    }

    async clickOnCustomerSelectMenu() {
        await this.customerSelectMenu.click()
    }

    async clickProcessButton() {
        await this.processButton.click()
    }

    async selectCurrencyDollar() {
        await this.currencySelectMenu.selectOption('Dollar')
    }

    async selectCurrencyPound() {
        await this.currencySelectMenu.selectOption('Pound')
    }

    async selectCurrencyRupee() {
        await this.currencySelectMenu.selectOption('Rupee')
    }

    async selectCurrentUser(firstName, lastName) {
        await this.customerSelectMenu.selectOption({ label: `${firstName} ${lastName}`});
    }

    async assertDropDownHasDollar() {
        await expect(this.currencySelectMenu).toHaveValue('Dollar')
    }

    async assertDropDownHasPound() {
        await expect(this.currencySelectMenu).toHaveValue('Pound')
    }

    async assertDropDownHasRupee() {
        await expect(this.currencySelectMenu).toHaveValue('Rupee')
    }
}
