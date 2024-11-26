import {Page} from "@playwright/test"


export class ToastrPage{


    readonly page:Page
    constructor(page: Page){
       this.page = page
    }

    async mytoastrPage(){
        await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Toastr').click()
    }
}