import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  map,
  take,
  tap,
  throwError,
} from 'rxjs';

import { Person } from './http-clients.types';

@Injectable({
  providedIn: 'root',
})
export class HttpClientsService {
  resourseUrl = '/api/v1/elementsoftware/';
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
  });

  private dataSubject = new BehaviorSubject<Person[]>([]);
  public data$ = this.dataSubject.asObservable();
  private dataSubscription = new Subscription();

  constructor(private http: HttpClient) {}

  public getPerson(): Observable<Person[]> {
    return this.http.get<Person[]>(this.resourseUrl).pipe(
      map((response: Person[]) => {
        this.dataSubject.next(response);
        return response || [];
      }),
      catchError(this.handleError)
    );
  }

  public createPerson(personObj: Person): Observable<void> {
    return this.http
      .post<Person>(this.resourseUrl, personObj, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: Person) => {
          const newData = [...this.dataSubject.value, response];
          this.dataSubject.next(newData);
        }),
        catchError(this.handleError)
      );
  }

  public deletePerson(id: string): Observable<void> {
    return this.http.delete<void>(this.resourseUrl + id).pipe(
      tap(() => {
        const newData = this.dataSubject.value.filter(
          (item) => item._id !== id
        );
        this.dataSubject.next(newData);
      }),
      catchError(this.handleError)
    );
  }

  public updatePerson(element: Person): Observable<Person> {
    return this.http
      .put<Person>(
        this.resourseUrl + element._id,
        {
          firstname: element.firstname,
          lastname: element.lastname,
          email: element.email,
          age: +element.age,
          gender: element.gender,
          editing: false,
        },
        {
          headers: this.httpHeaders,
        }
      )
      .pipe(catchError(this.handleError));
  }

  public subscribeToData(callback: (data: Person[]) => void): void {
    this.dataSubscription = this.data$.subscribe(callback);
  }

  public unsubscribeFromData(): void {
    this.dataSubscription.unsubscribe();
  }

  public handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Произошла ошибка:', error);
    return throwError(error);
  }
}
