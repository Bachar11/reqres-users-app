import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersPageResponse, ReqResUser } from '../../models/reqres.models';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ReqresService {
  private readonly baseUrl = 'https://survdesignedthis.machtnovitat.com/reqres';

  constructor(private http: HttpClient) {}

getUsersPage(page: number): Observable<UsersPageResponse> {
  const timestamp = new Date().getTime(); // prevents caching
  return this.http.get<UsersPageResponse>(
    `${this.baseUrl}/users.php?page=${page}&t=${timestamp}`
  );
}

getUserById(id: number): Observable<ReqResUser | null> {
  return this.http
    .get<{ data: ReqResUser | null }>(
      `${this.baseUrl}/users-details.php?id=${id}`  
    )
    .pipe(map(res => res.data ?? null));
}

}
