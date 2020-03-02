import { LightningElement } from 'lwc';

export default class HelloConditionalRndering1 extends LightningElement {
    showDetails = false;

    handleChange(event){
        this.showDetails = event.target.checked;
    }
}