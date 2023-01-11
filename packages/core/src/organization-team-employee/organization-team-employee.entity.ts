import { IEmployee, IOrganizationTeam, IOrganizationTeamEmployee, IRole } from '@gauzy/contracts';
import { Entity, Column, ManyToOne, RelationId, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
	Employee,
	OrganizationTeam,
	Role,
	TenantOrganizationBaseEntity
} from '../core/entities/internal';

@Entity('organization_team_employee')
export class OrganizationTeamEmployee extends TenantOrganizationBaseEntity
	implements IOrganizationTeamEmployee {

	/*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */

   	/**
	 * OrganizationTeam
	 */
	@ApiProperty({ type: () => OrganizationTeam })
	@ManyToOne(() => OrganizationTeam, (organizationTeam) => organizationTeam.members, {
		onDelete: 'CASCADE'
	})
	public organizationTeam!: IOrganizationTeam;

	@ApiProperty({ type: () => String })
	@RelationId((it: OrganizationTeamEmployee) => it.organizationTeam)
	@Index()
	@Column()
	public organizationTeamId: IOrganizationTeam['id'];

    /**
	 * Employee
	 */
	@ApiProperty({ type: () => Employee })
	@ManyToOne(() => Employee, (employee) => employee.teams, {
		onDelete: 'CASCADE'
	})
	public employee: IEmployee;

	@ApiProperty({ type: () => String })
	@RelationId((it: OrganizationTeamEmployee) => it.employee)
	@Index()
	@Column()
	public employeeId: IEmployee['id'];

	/**
	 * Role
	 */
	@ApiProperty({ type: () => Role })
	@ManyToOne(() => Role, {
		nullable: true,
		onDelete: 'CASCADE'
	})
	public role?: IRole;

	@ApiProperty({ type: () => String, readOnly: true })
	@RelationId((it: OrganizationTeamEmployee) => it.role)
	@Index()
	@Column({ nullable: true })
	public roleId?: IRole['id'];
}
