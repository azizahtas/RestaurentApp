import {NgModule} from "@angular/core";
import {ModalComponent} from "../Shared/modal.component";
import {PortletComponent} from "../Shared/portlet.component";
import {SpinnerComponent} from "../Shared/spinner.component";
import {PagationComponent} from "../Shared/pagation.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItemService} from "../Item/item.service";
@NgModule({
    imports : [CommonModule,FormsModule,ReactiveFormsModule],
    declarations : [ModalComponent,PortletComponent,SpinnerComponent,PagationComponent],
    providers : [ItemService],
    exports : [CommonModule,FormsModule,ReactiveFormsModule,
        ModalComponent,PortletComponent,SpinnerComponent,PagationComponent]
})
export class SharedModule{

}