import { Column, Entity, OneToOne } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import {
	ICandidate,
	IContact,
	IEmployee,
	IOrganizationContact
} from '@gauzy/contracts';
import {
	Candidate,
	Employee,
	OrganizationContact,
	TenantOrganizationBaseEntity
} from '../core/entities/internal';
import { ColumnNumericTransformerPipe } from './../shared/pipes';

@Entity('contact')
export class Contact extends TenantOrganizationBaseEntity implements IContact {
	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	name?: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	firstName?: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	lastName?: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	country?: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	city?: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	address?: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	address2?: string;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	postcode?: string;

	@ApiPropertyOptional({ type: () => Number })
	@IsNumber()
	@IsOptional()
	@Column({
		nullable: true,
		type: 'numeric',
		transformer: new ColumnNumericTransformerPipe()
	})
	latitude?: number;

	@ApiPropertyOptional({ type: () => Number })
	@IsNumber()
	@IsOptional()
	@Column({
		nullable: true,
		type: 'numeric',
		transformer: new ColumnNumericTransformerPipe()
	})
	longitude?: number;

	@ApiProperty({ type: () => String })
	@Column()
	@IsOptional()
	@Column({ nullable: true })
	regionCode?: string;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	fax?: string;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	fiscalInformation?: string;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	website?: string;

	/*
    |--------------------------------------------------------------------------
    | @OneToOne
    |--------------------------------------------------------------------------
    */

	/**
	 * Employee
	 */
	@ApiProperty({ type: () => Employee })
	@OneToOne(() => Employee, (employee) => employee.contact, {
		onDelete: 'SET NULL'
	})
	employee?: IEmployee;

	/**
	 * Employee
	 */
	@ApiProperty({ type: () => Candidate })
	@OneToOne(() => Candidate, (candidate) => candidate.contact, {
		onDelete: 'SET NULL'
	})
	candidate?: ICandidate;

	/**
	 * Organization Contact
	 */
	@ApiProperty({ type: () => OrganizationContact })
	@OneToOne(() => OrganizationContact, (organizationContact) => organizationContact.contact, {
		onDelete: 'SET NULL'
	})
	organizationContact?: IOrganizationContact;
}
