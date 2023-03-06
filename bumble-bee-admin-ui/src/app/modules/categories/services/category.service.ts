import { Injectable } from '@angular/core';
import { AbstractBumbleBeeService } from "../../../services/abstract-bumble-bee.service";
import { Category } from "../../../entity/entity";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends AbstractBumbleBeeService<Category> {

  constructor(private http: HttpClient) {
    super(http, environment.api.endpoints.categories);
  }
}
