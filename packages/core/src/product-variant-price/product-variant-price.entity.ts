import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { IProductVariantPrice, CurrenciesEnum } from '@gauzy/contracts';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum } from 'class-validator';
import {
	ProductVariant,
	TenantOrganizationBaseEntity
} from '../core/entities/internal';

@Entity('product_variant_price')
export class ProductVariantPrice
	extends TenantOrganizationBaseEntity
	implements IProductVariantPrice {
	@ApiProperty({ type: () => Number })
	@IsNumber()
	@Column({ default: 0 })
	unitCost: number;

	@ApiProperty({ type: () => String, enum: CurrenciesEnum })
	@IsEnum(CurrenciesEnum)
	@Column({ default: CurrenciesEnum.USD })
	unitCostCurrency: string;

	@ApiProperty({ type: () => Number })
	@IsNumber()
	@Column({ default: 0 })
	retailPrice: number;

	@ApiProperty({ type: () => String, enum: CurrenciesEnum })
	@IsEnum(CurrenciesEnum)
	@Column({ default: CurrenciesEnum.USD })
	retailPriceCurrency: string;

	/*
    |--------------------------------------------------------------------------
    | @OneToOne 
    |--------------------------------------------------------------------------
    */

	/**
	 * ProductVariant
	 */
	@OneToOne(() => ProductVariant, (productVariant) => productVariant.price, {
		onDelete: 'CASCADE' 
	})
	@JoinColumn()
	productVariant: ProductVariant;
}
