import {Component, Input} from "@angular/core";
@Component({
    selector : "portlet",
    template : `
<section class="panel {{border_color}}">
<div class="block-web panel panel_bg_{{body_color}} panel_header_bg_{{header_color}}">
                    <div class="header">
                        <h3 class="content-header">{{title}} <span class="pull-right">{{right}}</span></h3>
                    </div>
                    <div class="portlet-content">
                        <ng-content></ng-content>
                    </div>
                    <!--/porlets-content-->
                </div>
                        <!--/block-web-->
</section>
                        `
})
export class PortletComponent{
   @Input() title : string ="";
    @Input() header_color : string ="";
    @Input() body_color : string ="";
    @Input() border_color : string ="";
    @Input() right : string ="";
}