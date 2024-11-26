import {Page} from '@playwright/test'

export class formLayoutsPage{
    readonly page: Page
    constructor(page:Page){
     this.page=page
    }

    async submittingTheFormsLayout(email : string, password: string, option: string){
        
    }
}