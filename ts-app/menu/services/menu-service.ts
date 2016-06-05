import {Injectable}     from '@angular/core';

@Injectable()
export class MenuService {
    clearMenu: boolean
    constructor() { 
        this.clearMenu = false;
    }
    
    setClearMenu(){
        this.clearMenu = true;
    }
    
    removeClearMenu(){
        this.clearMenu = false;
    }
    
    isMenuClear(){
        return this.clearMenu;
    }

}
