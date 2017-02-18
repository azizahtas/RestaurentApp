import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HeaderBarComponent} from "./headerbar.component";
import {LeftNavComponent} from "./leftnav.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
@NgModule({
    imports : [BrowserModule,RouterModule,HttpModule,FormsModule,ReactiveFormsModule],
    declarations : [HeaderBarComponent,LeftNavComponent],
    exports : [BrowserModule,FormsModule,HttpModule,ReactiveFormsModule,RouterModule,HeaderBarComponent,LeftNavComponent]
})
export class CoreModule{

}