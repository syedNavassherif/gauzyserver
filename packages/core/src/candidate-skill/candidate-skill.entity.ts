import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ICandidateSkill, ICandidate } from '@gauzy/contracts';
import {
	Candidate,
	TenantOrganizationBaseEntity
} from '../core/entities/internal';

@Entity('candidate_skill')
export class CandidateSkill extends TenantOrganizationBaseEntity implements ICandidateSkill {

	@ApiProperty({ type: () => String })
	@Column()
	name: string;

	/*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
	@ApiProperty({ type: () => Candidate })
	@ManyToOne(() => Candidate, (candidate) => candidate.skills, {
		onDelete: 'CASCADE'
	})
	candidate?: ICandidate;

	@ApiProperty({ type: () => String })
	@RelationId((it: CandidateSkill) => it.candidate)
	@Column({ nullable: true })
	candidateId?: ICandidate['id'];
}
