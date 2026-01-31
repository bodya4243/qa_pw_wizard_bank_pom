export class AddCustomerPage {
    constructor(page) {
        this.page = page
        this.firstNameInputField = page.getByPlaceholder('First Name')
        this.lastNameInputField = page.getByPlaceholder('Last Name')
        this.postCodeInputField = page.getByPlaceholder('Post Code')
        this.addCustomerFormButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' })
    }

    async open() {
        await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
    }

    async fillFirstNameField(firstName) {
        await this.firstNameInputField.fill(firstName)
    }

    async fillLastNameField(lastName) {
        await this.lastNameInputField.fill(lastName)
    }

    async fillPostCodeField(postCode) {
        await this.postCodeInputField.fill(postCode)
    }

    async clickAddCustomerFormButton() {
        await this.addCustomerFormButton.click()
    }
}
