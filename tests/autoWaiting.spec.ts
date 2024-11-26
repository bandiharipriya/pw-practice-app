import {test, expect} from '@playwright/test'


test.beforeEach( async ({page}) => {
   await page.goto('http://uitestingplayground.com/ajax')
   await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')
    
    //   await successButton.click()
    //   await successButton.waitFor({state:'attached'})
    
   // const textValue = await successButton.textContent()
    
   await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternate waits', async({page})=>{
    const successButton = page.locator('.bg-success')

    //wait for element
    await page.waitForSelector('.bg-success')

    //wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // wait for network calls to be completed ('not recomended')
    await page.waitForLoadState('networkidle')
    const textValue = await successButton.allTextContents()
    expect(textValue).toContain('Data loaded with AJAX get request.')
})