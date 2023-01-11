import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import {
	NbCardModule,
	NbButtonModule,
	NbIconModule,
	NbSpinnerModule,
	NbDialogModule,
	NbCheckboxModule,
	NbSelectModule,
	NbTabsetModule,
	NbInputModule,
	NbBadgeModule,
	NbTooltipModule,
	NbStepperModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { ProductFormComponent } from './components/edit-inventory-item/product-form.component';
import { TagsColorInputModule } from '../../@shared/tags/tags-color-input/tags-color-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TableInventoryComponent } from './components/table-inventory-items/table-inventory.component';
import { InventoryComponent } from './components/inventory.component';
import { SharedModule } from '../../@shared/shared.module';
import { VariantTableComponent } from './components/edit-inventory-item/variant-table/variant-table.component';
import { OptionsFormComponent } from './components/edit-inventory-item/options-form/options-form.component';
import { VariantFormComponent } from './components/edit-inventory-item/variant-form/variant-form.component';
import {
	ImageAssetService,
	InventoryStore,
	OrganizationsService,
	ProductService,
	ProductVariantPriceService,
	ProductVariantService,
	ProductVariantSettingService,
	TranslatableService
} from '../../@core/services';
import { InventoryVariantFormComponent } from './components/edit-inventory-item-variant/variant-form.component';
import { CardGridModule } from './../../@shared/card-grid/card-grid.module';
import { CurrencyModule } from '../../@shared/currency/currency.module';
import { TranslateModule } from '../../@shared/translate/translate.module';
import { ProductGalleryComponent } from './components/edit-inventory-item/product-gallery/product-gallery.component';
import { InventoryItemViewComponent } from './components/view-inventory-item/view-inventory-item.component';
import { HeaderTitleModule } from '../../@shared/components/header-title/header-title.module';
import { LanguageSelectorModule } from '../../@shared/language/language-selector';
import { MerchantModule } from './components/manage-merchants/merchant.module';
import { ProductTypesModule } from './components/manage-product-types/product-types.module';
import { ProductCategoriesModule } from './components/manage-product-categories/product-categories.module';
import { WarehousesModule } from './components/manage-warehouses/warehouses.module';
import { InventoryTableComponentsModule } from './components/inventory-table-components/inventory-table-components.module';
import { SelectAssetModule } from '../../@shared/select-asset-modal/select-asset.module';
import { ImageAssetModule } from '../../@shared/image-asset/image-asset.module';
import { PaginationModule } from '../../@shared/pagination/pagination.module';
import { GauzyButtonActionModule } from '../../@shared/gauzy-button-action/gauzy-button-action.module';
import { ProductTypeSelectorModule } from '../../@shared/product-type-selector/product-type-selector.module';
import { ProductCategorySelectorModule } from '../../@shared/product-category-selector/product-category-selector.module';

const NB_MODULES = [
	NbCardModule,
	NbButtonModule,
	NbIconModule,
	NbSpinnerModule,
	NbDialogModule,
	NbCheckboxModule,
	NbSelectModule,
	NbTabsetModule,
	NbInputModule,
	NbStepperModule,
	NbTooltipModule,
	NbBadgeModule,
	NbDialogModule.forChild()
];

@NgModule({
	declarations: [
		InventoryComponent,
		InventoryItemViewComponent,
		InventoryVariantFormComponent,
		OptionsFormComponent,
		ProductGalleryComponent,
		ProductFormComponent,
		TableInventoryComponent,
		VariantFormComponent,
		VariantTableComponent
	],
	imports: [
		CardGridModule,
		CommonModule,
		CurrencyModule,
		FormsModule,
		HeaderTitleModule,
		ImageAssetModule,
		InventoryRoutingModule,
		MerchantModule,
		...NB_MODULES,
		NgSelectModule,
		Ng2SmartTableModule,
		PaginationModule,
		ProductTypesModule,
		ProductCategoriesModule,
		ReactiveFormsModule,
		SharedModule,
		SelectAssetModule,
		InventoryTableComponentsModule,
		TagsColorInputModule,
		ThemeModule,
		TranslateModule,
		WarehousesModule,
		LanguageSelectorModule,
		GauzyButtonActionModule,
		ProductTypeSelectorModule,
		ProductCategorySelectorModule,
		NgxPermissionsModule.forChild()
	],
	providers: [
		ProductService,
		ProductVariantService,
		ProductVariantSettingService,
		ProductVariantPriceService,
		OrganizationsService,
		ImageAssetService,
		InventoryStore,
		TranslatableService
	]
})
export class InventoryModule {}
