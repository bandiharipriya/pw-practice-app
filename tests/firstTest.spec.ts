import {test, expect} from '@playwright/test'


test.beforeEach( async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('locator syntax rukes', async({page})=>{
    page.locator('input') //tag name
    page.locator('#inputEmail1') //id
    page.locator('.shape-rectangle') //class
    page.locator('[placeholder="Email"]') //attribute
    page.locator('[class = "input-full-width size-medium status-basic shape-rectangle nb-transition"]') //by full class
    page.locator('input[placeholder="Email"][nbinput]') //combination of attribute, tagname
    page.locator('//*[@id="inputEmail"]') //XPath
    page.locator(':text("Using")') //by partial text match
    page.locator(':text-is("Using the Grid")') //by exact text match
})

test('User facing locators', async ({ page }) => {
    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', { name: "Sign in" }).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByTitle('IoT Dashboard').click()
    //await page.getByText('Using the Grid').click()
    //await page.getByTestId('Sign in').click()
})


test('locating child elements', async({page})=>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()


    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click() //try to avoid this as much as possible because this may lead to confusion.
})

test('Parent locators', async({page})=>{
    await page.locator('nb-card', {hasText: ('Using The Grid')}).getByRole('button' , {name: "Sign in"}).click()

    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText :"Basic form"}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox' , {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('textbox', {name: "Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()

})

test('Reusing the locators', async({page}) => {

    const basicform = page.locator('nb-card').filter({hasText :"Basic form"})
    const emailFeild = basicform.getByRole('textbox', {name: "Email"})
    const password = basicform.getByRole('textbox', {name: "Password"})
    //const button = basicform. getByRole('button', {name: "Sign in"})
    await emailFeild.fill('hari@gmail.com')
    await password.fill('Welcome@1')
    await basicform. getByRole('button', {name: "Submit"}).click()

    await expect(emailFeild).toHaveValue('hari@gmail.com')
})

test('Extracting values', async({page}) => {
    //single text value
    const basicform = page.locator('nb-card').filter({hasText :"Basic form"})
    const buttonText = await basicform.locator('button').textContent()

    expect(buttonText).toEqual('Submit')

    // all text Values
   const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
   expect(allRadioButtonsLabels).toContain("Option 1")
 
    //input value
    const emailFeild = basicform.getByRole('textbox', {name: "Email"})
    await emailFeild.fill('test@test.com')
    const emailValue = await emailFeild.inputValue()

    expect(emailValue).toEqual('test@test.com')

    //attribute value
    const placeholderValue = await emailFeild.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

})


test('assertions', async({page}) => {
 const basicFormButton = page.locator('nb-card').filter({hasText :"Basic form"}).locator('button')

 const text= await basicFormButton.textContent()
 expect(text).toEqual("Submit")
 //locator assertions
 await expect(basicFormButton).toHaveValue('Submit')

 //Soft assertions
 await expect.soft(basicFormButton).toHaveValue('Submit')


})