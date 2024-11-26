import {test, expect} from "@playwright/test"

test('dialog box', async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Dialog').click()

//await page.locator('nb-card', {hasText : 'Open Dialog'}).getByRole('button', {hasText : 'Open Dialog with component'}).click()
await page.locator('nb-card', { hasText: 'Open Dialog' })
        .getByText('Open Dialog with component')
        .click()

        await page.locator('nb-card')
        .getByRole('button', {name : 'Dismiss Dialog'})
        .click()
})