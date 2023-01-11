import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";
import { FileStorageProviderEnum } from "@gauzy/contracts";
import { IntersectionType } from "@nestjs/mapped-types";
import { AwsS3ProviderConfigDTO } from "./aws-s3-provider-config.dto";
import { WasabiS3ProviderConfigDTO } from "./wasabi-s3-provider-config.dto";

/**
 * Tenant Setting Save Request DTO validation
 */
export class CreateTenantSettingDTO extends IntersectionType(
	AwsS3ProviderConfigDTO,
	WasabiS3ProviderConfigDTO
) {

	/**
	 * FileStorage Provider Configuration
	 */
	@ApiProperty({ type: () => String })
	@IsNotEmpty()
	@IsEnum(FileStorageProviderEnum)
	@Transform((params: TransformFnParams) => params.value.trim().toUpperCase())
	readonly fileStorageProvider: FileStorageProviderEnum;
}