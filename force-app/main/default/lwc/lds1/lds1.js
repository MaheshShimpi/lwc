import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getSingleContact from '@salesforce/apex/ContactController.getSingleContact';

export default class Lds1 extends NavigationMixin(LightningElement) {
    @wire(getSingleContact) contact;

    navigateToContact(){
        // eslint-disable-next-line no-console
        console.log("working");
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.contact.data.Id,
                objectApiName: "Contact",
                actionName: "view"
            }
        });
    }
}