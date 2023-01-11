import { Entity, Column, ManyToOne, RelationId, JoinColumn } from 'typeorm';
import { IKeyResult, IKeyResultUpdate, KeyResultUpdateStatusEnum } from '@gauzy/contracts';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import {
	KeyResult,
	TenantOrganizationBaseEntity
} from '../core/entities/internal';

@Entity('key_result_update')
export class KeyResultUpdate
	extends TenantOrganizationBaseEntity
	implements IKeyResultUpdate {
	@ApiProperty({ type: () => Number })
	@Column()
	update: number;

	@ApiProperty({ type: () => Number })
	@Column()
	progress: number;

	@ApiProperty({ type: () => String })
	@Column()
	owner: string;

	@ApiProperty({ type: () => String, enum: KeyResultUpdateStatusEnum })
	@IsEnum(KeyResultUpdateStatusEnum)
	@Column()
	status: string;

	@ApiProperty({ type: () => KeyResult })
	@ManyToOne(() => KeyResult, (keyResult) => keyResult.update, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'keyResultId' })
	keyResult?: IKeyResult;

	@ApiProperty({ type: () => String, readOnly: true })
	@RelationId((it: KeyResultUpdate) => it.keyResult)
	@Column({ nullable: true })
	keyResultId?: string;
}
