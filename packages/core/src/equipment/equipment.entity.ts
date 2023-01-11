import {
	IEquipment,
	CurrenciesEnum,
	IEquipmentSharing,
	ITag,
	IImageAsset
} from '@gauzy/contracts';
import {
	Entity,
	Column,
	OneToMany,
	ManyToMany,
	JoinTable,
	ManyToOne,
	JoinColumn
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsString,
	IsNotEmpty,
	IsOptional,
	IsNumber,
	IsEnum,
	IsBoolean
} from 'class-validator';
import {
	EquipmentSharing,
	Tag,
	TenantOrganizationBaseEntity,
	ImageAsset
} from '../core/entities/internal';
import { ColumnNumericTransformerPipe } from './../shared/pipes';

@Entity('equipment')
export class Equipment
	extends TenantOrganizationBaseEntity
	implements IEquipment {
	
	@ApiProperty({ type: () => String })
	@IsString()
	@IsNotEmpty()
	@Column()
	name: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column()
	type: string;

	@ApiPropertyOptional({ type: () => String })
	@IsOptional()
	@Column()
	serialNumber?: string;

	@ApiProperty({ type: () => Number })
	@IsNumber()
	@IsOptional()
	@Column({
		nullable: true,
		type: 'numeric',
		transformer: new ColumnNumericTransformerPipe()
	})
	manufacturedYear: number;

	@ApiProperty({ type: () => Number })
	@IsNumber()
	@IsOptional()
	@Column({
		nullable: true,
		type: 'numeric',
		transformer: new ColumnNumericTransformerPipe()
	})
	initialCost: number;

	@ApiProperty({ type: () => String, enum: CurrenciesEnum })
	@IsEnum(CurrenciesEnum)
	@IsOptional()
	@Column()
	currency: string;

	@ApiProperty({ type: () => Number })
	@IsNumber()
	@IsOptional()
	@Column({
		nullable: true,
		type: 'numeric',
		transformer: new ColumnNumericTransformerPipe()
	})
	maxSharePeriod: number;

	@ApiProperty({ type: () => Boolean })
	@IsBoolean()
	@IsOptional()
	@Column()
	autoApproveShare: boolean;

	/*
    |--------------------------------------------------------------------------
    | @ManyToOne 
    |--------------------------------------------------------------------------
    */

	/**
	 * ImageAsset
	 */
	@ApiProperty({ type: () => ImageAsset })
	@ManyToOne(() => ImageAsset, (imageAsset) => imageAsset.equipmentImage, {
		onDelete: 'SET NULL'
	})
	@JoinColumn()
	image: IImageAsset;

	/*
    |--------------------------------------------------------------------------
    | @OneToMany 
    |--------------------------------------------------------------------------
    */

	/**
	 * EquipmentSharing
	 */
	@ApiProperty({ type: () => EquipmentSharing, isArray: true })
	@OneToMany(() => EquipmentSharing, (equipmentSharing) => equipmentSharing.equipment, {
		onDelete: 'CASCADE'
	})
	equipmentSharings: IEquipmentSharing[];

	/*
    |--------------------------------------------------------------------------
    | @ManyToMany 
    |--------------------------------------------------------------------------
    */

	@ApiProperty({ type: () => Tag, isArray: true })
	@ManyToMany(() => Tag, (tag) => tag.equipments, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE'
	})
	@JoinTable({ name: 'tag_equipment' })
	tags: ITag[];
}
