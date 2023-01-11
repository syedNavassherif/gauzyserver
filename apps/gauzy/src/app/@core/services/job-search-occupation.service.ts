import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IJobSearchOccupation, IPagination } from '@gauzy/contracts';
import { toParams } from '@gauzy/common-angular';
import { API_PREFIX } from '../constants/app.constants';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class JobSearchOccupationService {
	constructor(private http: HttpClient) {}

	getAll(request?: any) {
		return firstValueFrom(
			this.http
			.get<IPagination<IJobSearchOccupation>>(
				`${API_PREFIX}/job-preset/job-search-occupation`,
				{
					params: request ? toParams(request) : {}
				}
			)
		);
	}

	create(request?: IJobSearchOccupation) {
		return firstValueFrom(
			this.http
			.post<IJobSearchOccupation>(
				`${API_PREFIX}/job-preset/job-search-occupation`,
				request
			)
		);
	}
}
