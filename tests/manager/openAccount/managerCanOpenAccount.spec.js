import {test} from '@playwright/test';
import {faker} from '@faker-js/faker';
import {AddCustomerPage} from "../../../src/pages/manager/AddCustomerPage";
import {BankManagerMainPage} from "../../../src/pages/manager/BankManagerMainPage";
import {OpenAccountPage} from "../../../src/pages/manager/OpenAccountPage";
import {CustomersListPage} from "../../../src/pages/manager/CustomersListPage";


test.describe('managerCanOpenAccount', ()=>{
    let addCustomerPage
    let bankManagerMainPage
    let firstName = faker.person.firstName()
    let lastName = faker.person.lastName()
    let postCode = faker.location.zipCode()

    test.beforeEach(async ({page}) => {
        addCustomerPage = new AddCustomerPage(page)
        bankManagerMainPage = new BankManagerMainPage(page)

        await addCustomerPage.open()
        await addCustomerPage.fillFirstNameField(firstName)
        await addCustomerPage.fillLastNameField(lastName)
        await addCustomerPage.fillPostCodeField(postCode)
        await addCustomerPage.clickAddCustomerFormButton()
        await bankManagerMainPage.reloadPage()

        /*
        Pre-conditons:
        1. Open Add Customer page
        2. Fill the First Name.
        3. Fill the Last Name.
        4. Fill the Postal Code.
        5. Click [Add Customer].
        6. Reload the page (This is a simplified step to close the popup).
        */
    });

    test('Assert manager can add new customer', async ({page}) => {
        const openAccountPage = new OpenAccountPage(page)
        const customersListPage = new CustomersListPage(page)

        await bankManagerMainPage.clickOpenAccountButton()
        await openAccountPage.clickOnCustomerSelectMenu()
        await openAccountPage.selectCurrentUser(firstName, lastName)
        await openAccountPage.selectCurrencyDollar()
        await openAccountPage.clickProcessButton()
        await bankManagerMainPage.reloadPage()
        await bankManagerMainPage.clickCustomersButton()
        await customersListPage.assertAccountNumberIsPresent()

        /*
        Test:
        1. Click [Open Account].
        2. Select Customer name you just created.
        3. Select currency.
        4. Click [Process].
        5. Reload the page (This is a simplified step to close the popup).
        6. Click [Customers].
        7. Assert the customer row has the account number not empty.

        Tips:
        1. Do not rely on the customer row id for the step 13.
          Use the ".last()" locator to get the last row.
        */
    });
})
