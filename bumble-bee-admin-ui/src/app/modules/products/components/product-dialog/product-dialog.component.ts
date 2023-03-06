import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { Brand, Category, Product } from "../../../../entity/entity";
import { DialogType } from "../../../../util/custom.types";
import { Store } from "@ngxs/store";
import { FetchAllCategories } from "../../../categories/category.actions";
import { FetchAllBrands } from "../../../brands/brand.actions";


export interface ProductDialogData {
  type: DialogType;
  entity?: Product;
}

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent implements OnInit {


  formGroup = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.pattern('^[a-zA-Z0-9\\-_/]+$'), Validators.maxLength(50)]],
    price: [
      '',
      [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
    ],
    brand: [
      '',
      [Validators.required],
    ],
    category: [
      '',
      [Validators.required],
    ],
    description: [
      '',
      [Validators.maxLength(512)]],
  });

  public _brands: Brand[] = [];
  public _categories: Category[] = [];

  public selectedBrand?: number;
  public selectedCategory?: number;

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProductDialogData,
              private formBuilder: FormBuilder,
              private store: Store) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    // fetch all brands and categories
    this.store.dispatch(new FetchAllBrands());
    this.store.dispatch(new FetchAllCategories());

    // subscribe to brands and categories
    this.store.select(state => state.brands.entities).subscribe((brands: Brand[]) => this._brands = brands);
    this.store.select(state => state.categories.entities).subscribe((categories: Category[]) => this._categories = categories);

    // if the type is update, prefill the form
    if (this.data.type === DialogType.UPDATE && this.data.entity) {
      this.formGroup.patchValue({
        name: this.data.entity.name,
        price: this.data.entity.price?.toString(),
        description: this.data.entity.description,
      });
      this.selectedBrand = this.data.entity.brand.id;
      this.selectedCategory = this.data.entity.category.id;
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.formGroup.valid && this.selectedBrand && this.selectedCategory) {
      const product: Product = {
        id: this.data.entity?.id,
        name: this.formGroup.value.name!.trim(),
        price: this.convertToNumber(this.formGroup.value.price),
        description: this.formGroup.value.description?.trim(),
        brand: this.findBrand(this.selectedBrand),
        category: this.findCategory(this.selectedCategory),
      };

      switch (this.data.type) {
        case DialogType.CREATE:
          this.dialogRef.close({
            type: DialogType.CREATE,
            entity: product,
          });
          break;

        case DialogType.UPDATE:
          this.dialogRef.close({
            type: DialogType.UPDATE,
            entity: product,
          });
          break;

        default:
          this.dialogRef.close();
      }
    }
  }

  private findBrand(id: number): Brand {
    return this._brands.find(brand => brand.id === id)!;
  }

  private findCategory(id: number): Category {
    return this._categories.find(category => category.id === id)!;
  }

  private convertToNumber(value?: string | null | undefined): number {
    if (value === undefined || value === null) {
      return 0;
    }
    return Number(value);
  }

}
