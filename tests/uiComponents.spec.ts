import {test, expect} from "@playwright/test"

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')

})

/*test.describe('Form Layouts page', async({page}) => {
    // when we want to overwrite the default retires
   // test.describe.configure({retries : 2})
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async({page}, pageInfo) => {
        if(pageInfo.retry){
            //do something 
            // it's like write a code to do clean up in the database after each failed test
        }
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name : 'Email'})

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('hari@test.com' , {delay : 500})
        //await page.screenshot({path : 'screenshots/formslayout.png'})
         //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('hari@test.com')
         
        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('hari@test.com')
    })

    test('radio buttons', async({page}) => {
      const usingTheGrid = page.locator('nb-card', {hasText: "Using the Grid"})

     await usingTheGrid.getByLabel('Option 1').check({force : true})  // getting the radio button by Option 1 with LABEL;
     await usingTheGrid.getByRole('radio', {name : "Option 2"}).check({force : true}) // getting the radio button by Option 2 with ROLE
     const radioStatus = await usingTheGrid.getByRole('radio', {name : "Option 1"}).isChecked() // isChecked is a boolean method
     expect(radioStatus).toBeTruthy()

     await expect(usingTheGrid.getByRole('radio', {name : "Option 2"})).toBeChecked()
      
     //option2 to be selected also validate that option 1 is false when option 2 is selected 
     await usingTheGrid.getByLabel('Option 2').check({force : true}) 
     expect(await usingTheGrid.getByRole('radio', {name : "Option 1"}).isChecked()).toBeFalsy()
     expect(await usingTheGrid.getByRole('radio', {name : "Option 2"}).isChecked()).toBeTruthy()
    })
})
*/
    test('date picker', async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Datepicker').click()

        const calenderInput = page.locator('nb-card-body').getByPlaceholder('Form Picker')
        await calenderInput.click()

        let date = new Date()
        date.setDate(date.getDate() + 14)

        const expectedDate = date.getDate().toString()
        const expectedMonthShot = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()

        const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`
          // if expected date is not in the expected month click next button and choose from there
       let calenderMonthYear = await page.locator('nb-calendar-view-mode').textContent()
       const expectedMonthYear = ` ${expectedMonthLong} ${expectedYear}`

       while(!calenderMonthYear.includes(expectedMonthLong)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calenderMonthYear = await page.locator('nb-calendar-view-mode').textContent()
       }

      
        await page.locator('[class = "day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()

        await expect(calenderInput).toHaveValue(dateToAssert)
    })
    test('checkbox', async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()

        await page.getByRole('checkbox', {name: 'Hide on click'}).click({force : true})
        await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).click({force : true})
        
       const allBoxes = page.getByRole('checkbox')
        for(const box of await allBoxes.all()) {
            await box.uncheck({force : true})
            expect(await box.isChecked()).toBeFalsy()
        }
    })

    test('tooltip', async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()

        const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
        await toolTipCard.getByRole('button', {name: "Top"}).hover()

        page.getByRole('tooltip')
        const tooltip = await page.locator('nb-tooltip').textContent()
        expect(tooltip).toEqual('This is a tooltip')
})

test('lists & drop down', async({page}) => {
   const dropDown =  page.locator('ngx-header nb-select')
   await dropDown.click()

   page.getByRole('list') // when UL is there
   page.getByRole('listitem') // when the list has LI

// const optionList = page.getByRole('list').locator('nb-option')
const optionList = page.locator('nb-option-list nb-option')
await expect(optionList).toHaveText(["Light" , " Dark", "Cosmic", "Corporate"])
await optionList.filter({hasText : 'Cosmic'}).click()

   const header = page.locator('nb-layout-header')
   await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

//    const colours = {
//     "Light" : ""
//     "Dark" : ""
//     "Cosmic" : "rgb(50, 50, 89)"
//     "Corporate" : "" 
//    }
})

test.describe('Tables & Data' , ()=> {
    test.beforeEach(async({page})=> {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()
    })

    test('dialog box' , async({page})=> {

         //listener
         page.on('dialog', dialog => {
            expect(dialog.message()).toEqual("Are you sure you want to delete?")
            dialog.accept()
        })
        //const deleteButton = page.locator('table tr :text-is ("fat@yandex.ru")')
        const deleteButton = page.locator('table tr', {hasText : "fat@yandex.ru"})

        await deleteButton.locator('.nb-trash').click()
        //await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
        await expect(page.locator('table tr').first()).not.toHaveText("fat@yandex.ru")
    })

    test('web tables', async({page})=>{
        // await page.getByText('Tables & Data').click()
        // await page.getByText('Smart Table').click()

       // const targetRow = page.locator('table tr' , {hasText: "twitter@outlook.com"})
       // await targetRow.click()

        const targetRow = page.getByRole('row', {name : "twitter@outlook.com"})
         targetRow.locator('.nb-edit').click()

         await page.locator('input-editor').getByPlaceholder('Age').clear()
         await page.locator('input-editor').getByPlaceholder('Age').fill('35')
         await page.locator('.nb-checkmark').click()

         await page.locator('.ng2-smart-pagiation-nav').getByText('2').click()
         const targetRowById = page.getByRole('row', {name : "11"})
         await targetRowById.click()
         
    })
}) 

test('sliders' , async({page}) => {

    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-drapper circle')
    await tempGauge.evaluate( node => {
        node.setAttribute('cx' , '232.630')
        node.setAttribute('cy' , '232.630')
    })

    await tempGauge.click()
})