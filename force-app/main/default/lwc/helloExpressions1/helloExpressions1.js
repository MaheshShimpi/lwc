import { LightningElement } from 'lwc';

export default class HelloExpressions1 extends LightningElement {
    firstName = "";
    lastName = "";
    get uppercaseFullName (){
        return `${this.firstName} ${this.lastName}`.trim().toUpperCase();
    }
    handleChange(event){
        const field = event.target.name;
        if (field === "firstName") {
            this.firstName = event.target.value;
        }
        if (field === "lastName") {
            this.lastName = event.target.value;
        }
    }
}