import {
    IOrganizationDepartment,
    IOrganizationEmploymentType,
    IOrganizationPosition,
    ISkill
} from "@gauzy/contracts";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDateString, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { CreateOrganizationEmploymentTypeDTO } from "./../../organization-employment-type/dto";
import { CreateOrganizationDepartmentDTO } from "./../../organization-department/dto";
import { TenantOrganizationBaseDTO } from "./../../core/dto";

export class EmploymentDTO extends TenantOrganizationBaseDTO {

    @ApiPropertyOptional({ type: () => Date })
    @IsOptional()
    @IsDateString()
    readonly startedWorkOn?: Date;

    @ApiPropertyOptional({ type: () => Date })
    @IsOptional()
    @IsDateString()
    readonly endWork?: Date;

    @ApiPropertyOptional({ type: () => String })
    @IsOptional()
    @IsString()
    readonly short_description?: string;

    @ApiPropertyOptional({ type: () => String })
    @IsOptional()
    @IsString()
    readonly description?: string;

    @ApiPropertyOptional({ type: () => Boolean })
    @IsOptional()
    @IsBoolean()
    readonly anonymousBonus?: boolean;

    @ApiPropertyOptional({ type: () => Array, isArray: true })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrganizationEmploymentTypeDTO)
    readonly organizationEmploymentTypes?: IOrganizationEmploymentType[];

    @ApiPropertyOptional({ type: () => Array, isArray: true })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrganizationDepartmentDTO)
    readonly organizationDepartments?: IOrganizationDepartment[];

    @ApiPropertyOptional({ type: () => String })
    @IsOptional()
    readonly employeeLevel?: string;

    @ApiPropertyOptional({ type: () => Object })
    @IsOptional()
    readonly organizationPosition?: IOrganizationPosition;

    @ApiPropertyOptional({ type: () => Array, isArray: true })
    @IsOptional()
    @IsArray()
    readonly skills?: ISkill[];
}