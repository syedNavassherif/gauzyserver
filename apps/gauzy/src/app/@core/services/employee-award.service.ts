import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	IEmployeeAward,
	IEmployeeAwardFindInput,
	IEmployeeAwardCreateInput,
	IPagination
} from '@gauzy/contracts';
import { Observable } from 'rxjs';
import { toParams } from '@gauzy/common-angular';
import { API_PREFIX } from '../constants/app.constants';

@Injectable({
	providedIn: 'root'
})
export class EmployeeAwardService {
	constructor(
		private readonly http: HttpClient
	) {}

	create(createInput: IEmployeeAwardCreateInput): Observable<IEmployeeAward> {
		return this.http.post<IEmployeeAward>(
			`${API_PREFIX}/employee-award`,
			createInput
		);
	}

	getAll(
		where?: IEmployeeAwardFindInput,
		relations: string[] = []
	): Observable<IPagination<IEmployeeAward>> {
		return this.http.get<IPagination<IEmployeeAward>>(`${API_PREFIX}/employee-award`, {
			params: toParams({ relations, where })
		});
	}

	update(id: string, updateInput: any): Observable<any> {
		return this.http.put(`${API_PREFIX}/employee-award/${id}`, updateInput);
	}

	delete(id: string): Observable<any> {
		return this.http.delete(`${API_PREFIX}/employee-award/${id}`);
	}
}
