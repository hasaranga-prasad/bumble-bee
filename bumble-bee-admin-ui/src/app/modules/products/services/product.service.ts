import { Injectable } from '@angular/core';
import { AbstractBumbleBeeService } from "../../../services/abstract-bumble-bee.service";
import { Brand, Product } from "../../../entity/entity";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends AbstractBumbleBeeService<Product> {

  constructor(private http: HttpClient) {
    super(http, environment.api.endpoints.products);
  }
}
