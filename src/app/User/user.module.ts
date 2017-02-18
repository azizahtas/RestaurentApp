// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { UserComponent } from './user.component';
import { UserCenterComponent } from './userCenter.component';
import { UserService } from './user.service';
import { SharedModule } from '../Shared/shared.module';
import { UserRouting } from './user.routes';

@NgModule({
    imports: [SharedModule,UserRouting],
    declarations: [
        UserCenterComponent,
        UserComponent,
    ],
    providers : [UserService ]
})
export class UserModule {

}
