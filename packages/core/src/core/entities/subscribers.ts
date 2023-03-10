import {
	ActivitySubscriber,
	CandidateSubscriber,
	EmailTemplateSubscriber,
	EmployeeSubscriber,
	FeatureSubscriber,
	ImportHistorySubscriber,
	InviteSubscriber,
	InvoiceSubscriber,
	OrganizationContactSubscriber,
	OrganizationProjectSubscriber,
	OrganizationSubscriber,
	OrganizationTeamSubscriber,
	PaymentSubscriber,
	ReportSubscriber,
	ScreenshotSubscriber,
	TaskSubscriber,
	TenantSubscriber,
	TimeSlotSubscriber,
	UserSubscriber
} from "./internal";

/**
* A map of the core TypeORM Subscribers.
*/
export const coreSubscribers = [
	ActivitySubscriber,
	CandidateSubscriber,
	EmailTemplateSubscriber,
	EmployeeSubscriber,
	FeatureSubscriber,
	ImportHistorySubscriber,
	InviteSubscriber,
	InvoiceSubscriber,
	OrganizationContactSubscriber,
	OrganizationProjectSubscriber,
	OrganizationSubscriber,
	OrganizationTeamSubscriber,
	PaymentSubscriber,
	ReportSubscriber,
	ScreenshotSubscriber,
	TaskSubscriber,
	TenantSubscriber,
	TimeSlotSubscriber,
	UserSubscriber,
];
