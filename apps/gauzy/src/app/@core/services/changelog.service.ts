import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChangelog, IChangelogFindInput, IPagination } from '@gauzy/contracts';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { toParams } from '@gauzy/common-angular';
import { API_PREFIX } from '../constants/app.constants';

@Injectable({
	providedIn: 'root'
})
export class ChangelogService {
	private _changelogs$: BehaviorSubject<IChangelog[]> = new BehaviorSubject([]);
	public changelogs$: Observable<IChangelog[]> = this._changelogs$.asObservable();

	constructor(
		private readonly http: HttpClient
	) {}

	getAll(request: IChangelogFindInput): Observable<IPagination<IChangelog>> {
		const params = toParams(request);
		return this.http
			.get<IPagination<IChangelog>>(`${API_PREFIX}/changelog`, {
				params
			})
			.pipe(
				tap(
					({ items }) => this._changelogs$.next(items)
				)
			);
	}
}
