import {Component, Input} from "@angular/core";
@Component({
	selector : 'spinner',
	template : `<i *ngIf="visible" style="color:#262A33" class="fa fa-spinner fa-4x fa-spin"></i>`
})

export class SpinnerComponent{
	@Input() visible = true;
}