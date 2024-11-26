import {test, expect} from "@playwright/test"
import {NavigationPage} from '../page-object/navigationPage'
import {ToastrPage} from '../page-object/toastrPage'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')

})

test('navigate to form page', async({page}) => {
  const navigateTo = new NavigationPage(page)
  await navigateTo.formLayoutsPage()
 await navigateTo.checkboxPage()
 await navigateTo.datepickerPage()
 await navigateTo.tooltip()

  
})


