import { IUserUpdateInput } from "@gauzy/contracts";
import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";

/**
 * Update User DTO validation
 */
export class UpdateUserDTO extends PartialType(CreateUserDTO) implements IUserUpdateInput {

    @ApiPropertyOptional({ type: () => Boolean })
    @IsOptional()
    @IsBoolean()
    readonly isActive?: boolean;
}