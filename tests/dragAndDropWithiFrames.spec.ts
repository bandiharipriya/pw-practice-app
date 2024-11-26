import {test, expect} from '@playwright/test'

test('Drag and drop' , async({page})=> {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

// const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')

// await frame.locator('li' , {hasText : "High Tatras 2"}).dragTo(page.locator('#trash'))
//     //const myTrashPic = page.locator('.gallery ui-helper-reset ui-helper-clearfix ui-droppable').getByRole()

//     //more pricise with mouse
//     await frame.locator('li' , {hasText : "High Tatras 4"}).hover()
//     await page.mouse.down()
//     await frame.locator('#trash').hover()
//     await page.mouse.up()
const frame = page.locator('rel-title="Photo Manager" iframe')

await frame.locator('li', {hasText: "High Tatras 3"}).dragTo(frame.locator('#trash'))

//more presice control
await frame.locator('li', {hasText: "High Tatras 4"}).hover()
await page.mouse.down()
await frame.locator('#trash').hover()
await page.mouse.up()

await expect(frame.locator('#trash li h5')).toHaveText(["Have Tatras 2", "High Tatras 4"])



})