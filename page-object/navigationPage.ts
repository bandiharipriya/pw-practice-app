import {Locator, Page} from '@playwright/test'


export class NavigationPage{
  readonly page : Page
  readonly formsLayoutMenuItem : Locator
  readonly DatePickerMenuItem : Locator
  readonly checkboxPageMenuItem : Locator
  readonly tooltipMenuItem : Locator


  constructor(page: Page){
    this.page = page
    this.formsLayoutMenuItem = this.page.getByText('Form Layouts')
    this.DatePickerMenuItem = this.page.getByText('Datepicker')
    this.checkboxPageMenuItem = this.page.getByText('Toastr')
    this.tooltipMenuItem =this.page.getByText('Tooltip')
  }

  async formLayoutsPage(){
    await this.page.getByText('Forms').click()
    await this.formsLayoutMenuItem.click()
  }

  async datepickerPage(){
    await this.page.getByText('Forms').click()
    await this.page.waitForTimeout(1000)
    await this.DatePickerMenuItem.click()
  }

  async checkboxPage(){
    await this.page.getByText('Modal & Overlays').click()
    await this.checkboxPageMenuItem.click()
  }

  async tooltip(){
    await this.page.getByText('Modal & Overlays').click()
    await this.tooltipMenuItem.click()
  }

  private async selectGroupMenuItem(groupItemTitle : string){
    const groupItemTitle= this.page.getByText(groupItemTitle)
    const expandedState = await this.page.getAttribute('aria expanded')

    if(expandedState == 'false'){
      await groupItemTitle.click()
    }
  }
}
