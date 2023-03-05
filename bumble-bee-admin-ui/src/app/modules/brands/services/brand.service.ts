import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { AbstractBumbleBeeService } from "../../../services/abstract-bumble-bee.service";
import { Brand } from "../../../entity/entity";

@Injectable({
  providedIn: 'root',
})
export class BrandService extends AbstractBumbleBeeService<Brand> {

  constructor(private http: HttpClient) {
    super(http, environment.api.endpoints.brands);
  }
}
