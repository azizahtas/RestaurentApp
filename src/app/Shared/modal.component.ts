import {Component, Input} from "@angular/core";
@Component({
    selector:'modal',
    templateUrl : './modal.component.html'
})
export class ModalComponent{
 @Input('modal-id') Id : string = 'myModal';
 @Input('aria-labelledby') Labeled : string = 'myModalLabel';
}