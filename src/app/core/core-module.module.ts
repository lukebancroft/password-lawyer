import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FooterComponent,
        HeaderComponent,
        AuthComponent
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        AuthComponent
    ],
})
export class CoreModule { }
