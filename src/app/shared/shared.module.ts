import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSearchPipe } from './pipes/account-search.pipe';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        AccountSearchPipe,
        InputComponent
    ],
    exports: [
        AccountSearchPipe,
        InputComponent
    ]
})
export class SharedModule { }
