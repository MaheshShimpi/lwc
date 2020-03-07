import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import { reduceErrors } from 'c/ldsUtils';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';
export default class LdsDeleteRecord1 extends LightningElement {
    accounts;
    error;

    // Wired apex result so it can be refreshed programmatically
    wiredAccountResult;

    @wire(getAccountList)
    wiredAcounts (result) {
        this.wiredAccountResult = result;
        if (result.error) {
            // TODO: Error handling
            this.error = result.error;
            this.accounts = undefined;
        } else if (result.data) {
            // TODO: Data handling
            this.error = undefined;
            this.accounts = result.data;
        }
    }
    deleteAccount(event) {
        const recordId = event.target.dataset.recordid;
        deleteRecord(recordId)
            .then(()=>{
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Account Deleted. AccountId :' + recordId,
                    variant: 'success'
                }));
                return refreshApex(this.wiredAccountResult);
            })
            .catch(error =>{
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error Deleting record.',
                    message: reduceErrors(error).join(', '),
                    variant: 'error'
                }));
            });

    }
}