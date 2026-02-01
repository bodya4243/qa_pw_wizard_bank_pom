import {test} from '@playwright/test';
import {faker} from '@faker-js/faker';
import {AddCustomerPage} from "../../../src/pages/manager/AddCustomerPage";
import {BankManagerMainPage} from "../../../src/pages/manager/BankManagerMainPage";
import {CustomersListPage} from "../../../src/pages/manager/CustomersListPage";

test('Assert manager can add new customer', async ({page}) => {
    /*
    Test:
    1. Open add customer page by link
      https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
    2. Fill the First Name.
    3. Fill the Last Name.
    4. Fill the Postal Code.
    5. Click [Add Customer].
    6. Reload the page (This is a simplified step to close the popup)
    7. Click [Customers] button.
    8. Assert the customer First Name is present in the table in the last row.
    9. Assert the customer Last Name is present in the table in the last row.
    10. Assert the customer Postal Code is present in the table in the last row.
    11. Assert there is no account number for the new customer in the last row.
    */

    const addCustomerPage = new AddCustomerPage(page)
    const bankManagerMainPage = new BankManagerMainPage(page)
    const customersListPage = new CustomersListPage(page)

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postCode = faker.location.zipCode();

    await addCustomerPage.open()
    await addCustomerPage.fillFirstNameField(firstName)
    await addCustomerPage.fillLastNameField(lastName)
    await addCustomerPage.fillPostCodeField(postCode)
    await addCustomerPage.clickAddCustomerFormButton()
    await bankManagerMainPage.reloadPage()
    await bankManagerMainPage.clickCustomersButton()

    await customersListPage.assertAddedCustomerFirstNameIsPresent(firstName)
    await customersListPage.assertAddedCustomerLastNameIsPresent(lastName)
    await customersListPage.assertAddedCustomerPostCodeIsPresent(postCode)
    await customersListPage.assertAccountNumberIsAbsent(firstName)
});
