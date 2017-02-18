import { NgModule } from '@angular/core';
import {ItemRouting} from "./Item.routes";
import {ItemCenterComponent} from "./ItemCenter.component";
import {ItemComponent} from "./Item.component";
import {SharedModule} from "../Shared/shared.module";
import {ItemService} from "./item.service";
import {CategoryService} from "../Category/category.service";

@NgModule({
    imports: [SharedModule,ItemRouting],
    declarations: [
        ItemCenterComponent,
        ItemComponent
    ],
    providers : [ItemService,CategoryService]
})
export class ItemModule { }
