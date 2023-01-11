import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IRequestApproval,
	IRequestApprovalCreateInput,
	IRequestApprovalFindInput
} from '@gauzy/contracts';
import { firstValueFrom } from 'rxjs';
import { API_PREFIX } from '../constants/app.constants';

@Injectable()
export class RequestApprovalService {
	REQUETS_APPROVAL_URL = `${API_PREFIX}/request-approval`;

	constructor(private http: HttpClient) { }

	getAll(
		relations?: string[],
		findInput?: IRequestApprovalFindInput
	): Promise<{ items: IRequestApproval[] }> {
		const data = JSON.stringify({ relations, findInput });

		return firstValueFrom(
			this.http
				.get<{ items: IRequestApproval[] }>(
					`${this.REQUETS_APPROVAL_URL}`,
					{
						params: { data }
					}
				)
		);
	}

	getByEmployeeId(
		id: string,
		relations?: string[],
		findInput?: IRequestApprovalFindInput
	): Promise<{ items: IRequestApproval[] }> {
		const data = JSON.stringify({ relations, findInput });

		return firstValueFrom(
			this.http
				.get<{ items: IRequestApproval[] }>(
					`${this.REQUETS_APPROVAL_URL}/employee/${id}`,
					{
						params: { data }
					}
				)
		);
	}

	delete(id: string): Promise<any> {
		return firstValueFrom(
			this.http
				.delete(`${this.REQUETS_APPROVAL_URL}/${id}`)
		);
	}

	save(
		requestApproval: IRequestApprovalCreateInput
	): Promise<IRequestApproval> {
		if (!requestApproval.id) {
			return firstValueFrom(
				this.http
					.post<IRequestApproval>(
						this.REQUETS_APPROVAL_URL,
						requestApproval
					)
			);
		} else {
			return firstValueFrom(
				this.http
					.put<IRequestApproval>(
						`${this.REQUETS_APPROVAL_URL}/${requestApproval.id}`,
						requestApproval
					)
			);
		}
	}

	approvalRequestByAdmin(id: string): Promise<IRequestApproval> {
		return firstValueFrom(
			this.http
				.put<IRequestApproval>(
					`${this.REQUETS_APPROVAL_URL}/approval/${id}`,
					null
				)
		);
	}

	refuseRequestByAdmin(id: string): Promise<IRequestApproval> {
		return firstValueFrom(
			this.http
				.put<IRequestApproval>(
					`${this.REQUETS_APPROVAL_URL}/refuse/${id}`,
					null
				)
		);
	}
}
