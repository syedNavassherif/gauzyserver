import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from '../window/window.component';
import { NbButtonModule, NbIconModule, NbPopoverModule } from '@nebular/theme';
import { SharedModule } from '../../shared.module';
import { TranslateModule } from '../../translate/translate.module';

@NgModule({
	declarations: [WindowComponent],
	exports: [WindowComponent],
	imports: [
		CommonModule,
		NbIconModule,
		NbPopoverModule,
		NbButtonModule,
		SharedModule,
		TranslateModule
	]
})
export class WindowModule {}
