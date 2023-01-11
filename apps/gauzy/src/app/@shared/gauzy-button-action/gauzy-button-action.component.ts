import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ComponentEnum } from '../../@core/constants/layout.constants';

@Component({
	selector: 'ngx-gauzy-button-action',
	templateUrl: './gauzy-button-action.component.html',
	styleUrls: ['./gauzy-button-action.component.scss']
})
export class GauzyButtonActionComponent implements OnInit {

	@Input() isDisable: boolean = true;
	@Input() hasLayoutSelector: boolean = true;
	@Input() componentName: ComponentEnum;
	
	@Input() buttonTemplate: TemplateRef<HTMLElement>;
 	@Input() buttonTemplateVisible: TemplateRef<HTMLElement>;

	constructor() {}
	/**
	 * not implemented
	 */
	ngOnInit(): void {}
}
