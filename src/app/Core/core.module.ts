import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HeaderBarComponent} from "./headerbar.component";
import {LeftNavComponent} from "./leftnav.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {TooltipModule} from 'primeng/primeng';


@NgModule({
    imports : [BrowserModule,RouterModule,HttpModule,FormsModule,ReactiveFormsModule,TooltipModule],
    declarations : [HeaderBarComponent,LeftNavComponent],
    exports : [BrowserModule,FormsModule,HttpModule,ReactiveFormsModule,TooltipModule,RouterModule,HeaderBarComponent,LeftNavComponent]
})
export class CoreModule{

}
