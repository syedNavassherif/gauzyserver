import { IBasePerTenantAndOrganizationEntityModel } from './base-entity.model';
import { ICandidate } from './candidate.model';
import { IEmployee } from './employee.model';
import { IOrganizationContact } from './organization-contact.model';

export interface IRelationalContact {
    readonly contact?: IContact;
    readonly contactId?: IContact['id'];
}

export interface IContact extends IBasePerTenantAndOrganizationEntityModel {
	id?: string;
	name?: string;
	firstName?: string;
	lastName?: string;
	country?: string;
	city?: string;
	address?: string;
	address2?: string;
	postcode?: string;
	latitude?: number;
	longitude?: number;
	regionCode?: string;
	fax?: string;
	fiscalInformation?: string;
	website?: string;
	organization_contacts?: IOrganizationContact[];
	employees?: IEmployee[];
	candidates?: ICandidate[];
}

export interface IContactFindInput extends IContactCreateInput {
	id?: string;
}

export interface IContactCreateInput
	extends IBasePerTenantAndOrganizationEntityModel {
	name?: string;
	firstName?: string;
	lastName?: string;
	country?: string;
	city?: string;
	address?: string;
	address2?: string;
	postcode?: string;
	latitude?: number;
	longitude?: number;
	regionCode?: string;
	fax?: string;
	fiscalInformation?: string;
	website?: string;
}
