import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { Category } from "../../../../entity/entity";

export interface CategoryDialogData {
  type: 'create' | 'update' | 'unknown';
  entity?: Category;
}

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CategoryDialogData,
              private formBuilder: FormBuilder) {
    dialogRef.disableClose = true;
  }

  formGroup = this.formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.pattern('^[a-zA-Z0-9\\-_/]+$'), Validators.maxLength(50)]],
    description: [
      '',
      [Validators.maxLength(512)]],
  });

  ngOnInit(): void {
    this.formGroup.patchValue({
      name: this.data.entity?.name,
      description: this.data.entity?.description,
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    let result: CategoryDialogData = {
      type: 'unknown',
    }
    if (this.data.type === 'create' && this.formGroup.valid) {
      result = {
        ...result,
        type: 'create',
        entity: {
          name: this.formGroup.value.name!.trim(),
          description: this.formGroup.value.description?.trim(),
        },
      }
      this.dialogRef.close(result);
    } else if (this.data.type === 'update' && this.formGroup.valid) {
      result = {
        ...result,
        type: 'update',
        entity: {
          id: this.data.entity?.id,
          name: this.formGroup.value.name!.trim(),
          description: this.formGroup.value.description?.trim(),
        },
      }
      this.dialogRef.close(result);
    }
  }

}
