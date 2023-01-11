import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '../../../../@shared/translate/translate.module';
import { ProductCategoryService } from '../../../../@core/services/product-category.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../../../@shared/shared.module';
import {
	NbCardModule,
	NbButtonModule,
	NbIconModule,
    NbSpinnerModule,
    NbInputModule,
    NbTooltipModule
} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { HeaderTitleModule } from '../../../../@shared/components/header-title/header-title.module';
import { ThemeModule } from '../../../../@theme/theme.module';
import { ProductCategoriesComponent } from './product-categories.component';
import { ProductCategoriesRoutingModule } from './product-categories-routing.module';
import { ProductMutationModule } from '../../../../@shared/product-mutation/product-mutation.module';
import { CardGridModule } from '../../../../@shared/card-grid/card-grid.module';
import { PaginationModule } from '../../../../@shared/pagination/pagination.module';
import { GauzyButtonActionModule } from './../../../../@shared/gauzy-button-action/gauzy-button-action.module';


const NB_MODULES = [
	NbCardModule,
	NbButtonModule,
	NbIconModule,
    NbSpinnerModule,
    NbInputModule,
    NbTooltipModule
];


@NgModule({
    declarations: [ProductCategoriesComponent],
    imports: [
        ProductCategoriesRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        Ng2SmartTableModule,
        CommonModule,
        TranslateModule,
        ...NB_MODULES,
        SharedModule,
        HeaderTitleModule,
        ThemeModule,
        ProductMutationModule,
        CardGridModule,
        PaginationModule,
        GauzyButtonActionModule
    ],
    providers: [ProductCategoryService]
})
export class ProductCategoriesModule { }