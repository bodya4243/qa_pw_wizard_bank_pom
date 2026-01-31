import {test} from '@playwright/test';
import {faker} from '@faker-js/faker';
import {AddCustomerPage} from "../../../src/pages/manager/AddCustomerPage";
import {BankManagerMainPage} from "../../../src/pages/manager/BankManagerMainPage";
import {CustomersListPage} from "../../../src/pages/manager/CustomersListPage";

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({page}) => {
    /*
    Pre-conditons:
    1. Open Add Customer page.
    2. Fill the First Name.
    3. Fill the Last Name.
    4. Fill the Postal Code.
    5. Click [Add Customer].
    */
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postalCode = faker.location.zipCode();

    const addCustomerPage = new AddCustomerPage(page)

    await addCustomerPage.open()
    await addCustomerPage.fillFirstNameField(firstName)
    await addCustomerPage.fillLastNameField(lastName)
    await addCustomerPage.fillPostCodeField(postalCode)
    await addCustomerPage.clickAddCustomerFormButton()
});

test('Assert manager can search customer by Postal Code', async ({page}) => {
    const bankManagerMainPage = new BankManagerMainPage(page)
    const customersListPage = new CustomersListPage(page)

    await bankManagerMainPage.clickCustomersButton()
    await customersListPage.fillSearchField(postalCode)
    await customersListPage.assertFilteredCustomerFirstNameIsPresent(firstName)
    await customersListPage.assertOnlyFilteredCustomerIsPresent()

    /*
    Test:
    1. Open Customers page.
    2. Fill the postalCode to the search field
    3. Assert customer row is present in the table.
    4. Assert no other rows is present in the table.
    */
});
