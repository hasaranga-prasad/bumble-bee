import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Entity } from "../entity/entity";
import { Observable, throwError } from "rxjs";
import { Location } from '@angular/common';
import { environment } from "../../environments/environment";

export class AbstractBumbleBeeService<ENTITY extends Entity> {

  private readonly url = environment.api.url;
  private readonly headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient, private readonly endpoint: string) {

  }

  findAllEntities(): Observable<ENTITY[]> {
    return this.httpClient.get<ENTITY[]>(
      Location.joinWithSlash(this.url, this.endpoint),
      {
        observe: 'body',
        headers: this.headers,
      },
    );
  }

  findEntityById(id: any): Observable<ENTITY> {
    return this.httpClient.get<ENTITY>(
      Location.joinWithSlash(this.url, this.endpoint + "/" + id),
      {
        observe: 'body',
        headers: this.headers,
      },
    );
  }


  createEntity(entity: ENTITY): Observable<ENTITY> {
    return this.httpClient.post<ENTITY>(
      Location.joinWithSlash(this.url, this.endpoint),
      entity,
      {
        observe: 'body',
        headers: this.headers,
      },
    );
  }

  updateEntity(id: any, entity: ENTITY): Observable<ENTITY> {
    return this.httpClient.put<ENTITY>(
      Location.joinWithSlash(this.url, this.endpoint),
      entity,
      {
        observe: 'body',
        headers: this.headers,
      },
    );
  }

  deleteEntity(id: any) {
    return this.httpClient.delete(
      Location.joinWithSlash(this.url, this.endpoint + "/" + id),
      {
        observe: 'body',
        headers: this.headers,
      },
    );
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}
