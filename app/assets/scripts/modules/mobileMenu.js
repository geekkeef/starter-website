import $ from 'jquery';

class MobileMenu {
    constructor() {
        this.menuIcon = $('.nav__menu-icon');
        this.menuContent = $('.nav__menu-content');
        this.events();
    }

    events(){
        this.menuIcon.click(this.toggleTheMenu.bind(this)); // bind(this) ---> this.menuIcon
    }

    toggleTheMenu(){
        this.menuContent.toggleClass('nav__menu-content--visible');
    }
}

export default MobileMenu;