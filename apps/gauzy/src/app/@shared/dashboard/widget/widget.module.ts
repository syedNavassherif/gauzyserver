import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { NbButtonModule, NbIconModule, NbPopoverModule } from '@nebular/theme';
import { SharedModule } from '../../shared.module';
import { TranslateModule } from '../../translate/translate.module';

@NgModule({
	declarations: [WidgetComponent],
	imports: [
		CommonModule,
		NbIconModule,
		NbPopoverModule,
		NbButtonModule,
		SharedModule,
		TranslateModule
	],
	exports: [WidgetComponent]
})
export class WidgetModule {}
