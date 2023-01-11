import {
	Injectable,
	HttpException,
	HttpStatus
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, SelectQueryBuilder, Brackets, WhereExpressionBuilder, Raw } from 'typeorm';
import { IEmployee, IGetTaskByEmployeeOptions, IGetTaskOptions, RolesEnum } from '@gauzy/contracts';
import { isNotEmpty } from '@gauzy/common';
import { PaginationParams, TenantAwareCrudService } from './../core/crud';
import { RequestContext } from '../core/context';
import { Task } from './task.entity';
import { EmployeeService } from '../employee/employee.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class TaskService extends TenantAwareCrudService<Task> {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>,

		private readonly employeeService: EmployeeService,
		private readonly roleService: RoleService
	) {
		super(taskRepository);
	}

	async getMyTasks(filter: any) {
		const {
			where: { employeeId }
		} = filter;

		//If user is not an employee, then this will return 404
		const employee = await this.employeeService.findOneByOptions({
			where: {
				user: { id: RequestContext.currentUserId() }
			}
		});

		if (!employee || employee.id !== employeeId) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		}

		return this.getEmployeeTasks(filter);
	}

	async getEmployeeTasks(filter: any) {
		const {
			where: {
				organizationId,
				employeeId,
				projectId,
				status,
				title,
				organizationSprintId = null
			}
		} = filter;
		const query = this.taskRepository.createQueryBuilder('task');
		if (filter.page && filter.limit) {
			query.skip(filter.limit * (filter.page - 1));
			query.take(filter.limit);
		}

		query.skip(filter.skip ? filter.take * (filter.skip - 1) : 0);
		query.take(filter.take ? filter.take : 10);

		const [items, total] = await query
			.leftJoinAndSelect(`${query.alias}.project`, 'project')
			.leftJoinAndSelect(`${query.alias}.tags`, 'tags')
			.leftJoinAndSelect(`${query.alias}.organizationSprint`, 'sprint')
			.leftJoinAndSelect(`${query.alias}.teams`, 'teams')
			.leftJoinAndSelect(`${query.alias}.creator`, 'creator')
			.leftJoinAndSelect(`${query.alias}.members`, 'members')
			.leftJoinAndSelect('members.user', 'user')
			.where((qb: SelectQueryBuilder<Task>) => {
				qb.andWhere((cb) => {
					const subQuery = cb
						.subQuery()
						.select('"task_employee"."taskId"')
						.from('task_employee', 'task_employee');
					if (employeeId) {
						subQuery.andWhere(
							'"task_employee"."employeeId" = :employeeId',
							{
								employeeId
							}
						);
					}
					return (
						'"task_members"."taskId" IN ' +
						subQuery.distinct(true).getQuery()
					);
				})
					.andWhere(
						`"${qb.alias}"."organizationId" = :organizationId`,
						{ organizationId }
					)
					.andWhere(`"${qb.alias}"."tenantId" = :tenantId`, {
						tenantId: RequestContext.currentTenantId()
					});

				if (projectId) {
					query.andWhere(`"${qb.alias}"."projectId" = :projectId`, {
						projectId
					});
				}
				if (status) {
					query.andWhere(`"${qb.alias}"."status" = :status`, {
						status
					});
				}
				if (title) {
					query.andWhere(`"${qb.alias}"."title" LIKE :title`, {
						title: `%${title}%`
					});
				}
				if (organizationSprintId) {
					query.andWhere(
						`"${qb.alias}"."organizationSprintId" IS NULL`
					);
				}
			})
			.getManyAndCount();
		return { items, total };
	}

	async getAllTasksByEmployee(
		employeeId: string,
		filter: IGetTaskByEmployeeOptions
	) {
		const query = await this.taskRepository
			.createQueryBuilder('task')
			.leftJoin('task.members', 'members');
		if (filter && filter.where) {
			query.where({
				where: filter.where
			});
		}
		return await query
			.andWhere((qb) => {
				const subQuery = qb
					.subQuery()
					.select('"task_employee_sub"."taskId"')
					.from('task_employee', 'task_employee_sub')
					.where('"task_employee_sub"."employeeId" = :employeeId', {
						employeeId
					})
					.distinct(true)
					.getQuery();
				return '"task_members"."taskId" IN(' + subQuery + ')';
			})
			.getMany();
	}

	async getTeamTasks(filter: any) {
		const { where : { organizationId, employeeId, projectId, status, title, members = [], organizationSprintId = null } } = filter;
		const query = this.taskRepository.createQueryBuilder('task');

		if (filter.page && filter.limit) {
			query.skip(filter.limit * (filter.page - 1));
			query.take(filter.limit);
		}

		query.skip(filter.skip ? (filter.take * (filter.skip - 1)) : 0);
		query.take(filter.take ? (filter.take) : 10);

		const [ items, total ] = await query
			.leftJoinAndSelect(`${query.alias}.project`, 'project')
			.leftJoinAndSelect(`${query.alias}.tags`, 'tags')
			.leftJoinAndSelect(`${query.alias}.organizationSprint`, 'sprint')
			.leftJoinAndSelect(`${query.alias}.members`, 'members')
			.leftJoinAndSelect(`${query.alias}.teams`, 'teams')
			.leftJoinAndSelect(`${query.alias}.creator`, 'users')
			.where((qb: SelectQueryBuilder<Task>) => {
				qb.andWhere((cb) => {
					const subQuery = cb
						.subQuery()
						.select('"task_team_sub"."taskId"')
						.from('task_team', 'task_team_sub')
						.leftJoin(
							'organization_team_employee',
							'organization_team_employee_sub',
							'"organization_team_employee_sub"."organizationTeamId" = "task_team_sub"."organizationTeamId"'
						);
						if (employeeId) {
							subQuery.andWhere('"organization_team_employee_sub"."employeeId" = :employeeId', {
								employeeId
							});
						}
						if (isNotEmpty(members)) {
							subQuery.andWhere('"task_team_sub"."organizationTeamId" IN (:...members)', {
								members
							});
						}
					return '"task_teams"."taskId" IN ' + subQuery.distinct(true).getQuery();
				})
				.andWhere(`"${qb.alias}"."organizationId" = :organizationId`, { organizationId })
				.andWhere(`"${qb.alias}"."tenantId" = :tenantId`, { tenantId: RequestContext.currentTenantId() });
				if (projectId) {
					query.andWhere(`"${qb.alias}"."projectId" = :projectId`, { projectId });
				}
				if (status) {
					query.andWhere(`"${qb.alias}"."status" = :status`, { status });
				}
				if (title) {
					query.andWhere(`"${qb.alias}"."title" LIKE :title`, { title: `%${title}%` });
				}
				if (organizationSprintId) {
					query.andWhere(`"${qb.alias}"."organizationSprintId" IS NULL`);
				}
			})
			.getManyAndCount();
		return { items, total };
	}

	async findTeamTasks(filter: any) {
		const { where: { employeeId } } = filter;

		// If user is not an employee, then this will return 404
		let employee: IEmployee;
		let role;
		try {
			employee = await this.employeeService.findOneByOptions({
				where: {
					user: { id: RequestContext.currentUser().id }
				}
			});
		} catch (e) {}

		try {
			const roleId = RequestContext.currentUser().roleId;
			if (roleId) {
				role = await this.roleService.findOneByIdString(roleId);
			}
		} catch (e) {}

		// selected user not passed
		if (employeeId) {
			if (
				role.name === RolesEnum.ADMIN ||
				role.name === RolesEnum.SUPER_ADMIN ||
				employee.id === employeeId
			) {
				return this.getTeamTasks(filter);
			} else {
				throw new HttpException(
					'Unauthorized',
					HttpStatus.UNAUTHORIZED
				);
			}
		} else {
			return this.getTeamTasks(filter);
		}
	}

	public pagination(filter: PaginationParams<Task>) {
		if ('where' in filter) {
			const { where } = filter;
			if ('title' in where) {
				const { title } = where;
				filter['where']['title'] = Raw((alias) => `${alias} ILIKE '%${title}%'`);
			}
			if ('prefix' in where) {
				const { prefix } = where;
				filter['where']['prefix'] = Raw((alias) => `${alias} ILIKE '%${prefix}%'`);
			}
			if ('organizationSprintId' in where) {
				filter['where']['organizationSprintId'] = IsNull();
			}
		}
		return super.paginate(filter);
	}

	/**
	 * GET maximum task number by project filter
	 *
	 * @param options
	 */
	public async getMaxTaskNumberByProject(options: IGetTaskOptions) {
		const tenantId = RequestContext.currentTenantId();
		const { organizationId, projectId } = options;
		/**
		 * GET maximum task number by project
		 */
		const query = this.taskRepository.createQueryBuilder('task');
		query.select(`COALESCE(MAX("${query.alias}"."number"), 0)`, "maxTaskNumber");
		query.andWhere(
			new Brackets((qb: WhereExpressionBuilder) => {
				qb.andWhere(`"${query.alias}"."organizationId" =:organizationId`, { organizationId });
				qb.andWhere(`"${query.alias}"."tenantId" =:tenantId`, { tenantId });
				if (isNotEmpty(projectId)) {
					qb.andWhere(`"${query.alias}"."projectId" = :projectId`, { projectId });
				} else {
					qb.andWhere(`"${query.alias}"."projectId" IS NULL`);
				}
			})
		);
		const { maxTaskNumber } = await query.getRawOne();
		return maxTaskNumber;
	}
}
