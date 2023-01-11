import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from './../../../../@shared/translate/translate.module';
import { ProductTypeService } from 'apps/gauzy/src/app/@core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../../../@shared/shared.module';
import {
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    NbTooltipModule,

} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { HeaderTitleModule } from './../../../../@shared/components/header-title/header-title.module';
import { ThemeModule } from './../../../../@theme/theme.module';
import { ProductTypesComponent } from './product-types.component';
import { ProductTypesRoutingModule } from './product-types-routing.module';
import { CardGridModule } from './../../../../@shared/card-grid/card-grid.module';
import { ProductMutationModule } from './../../../../@shared/product-mutation/product-mutation.module';
import { PaginationModule } from './../../../../@shared/pagination/pagination.module';
import { GauzyButtonActionModule } from './../../../../@shared/gauzy-button-action/gauzy-button-action.module';
import { TableComponentsModule } from './../../../../@shared/table-components/table-components.module';


const NB_MODULES = [
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    NbTooltipModule
];


@NgModule({
    declarations: [ProductTypesComponent,],
    imports: [
        ProductTypesRoutingModule,
        ReactiveFormsModule,
        Ng2SmartTableModule,
        CommonModule,
        TranslateModule,
        ...NB_MODULES,
        SharedModule,
        HeaderTitleModule,
        ThemeModule,
        CardGridModule,
        ProductMutationModule,
        PaginationModule,
        GauzyButtonActionModule,
        TableComponentsModule
    ],
    providers: [ProductTypeService]
})
export class ProductTypesModule { }