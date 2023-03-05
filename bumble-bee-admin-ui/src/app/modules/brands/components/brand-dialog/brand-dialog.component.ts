import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Brand } from "../../../../entity/entity";

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss'],
})
export class BrandDialogComponent implements OnInit {

  public dialogForm: FormGroup = this.formBuilder.group({
    name: ['' +
    '',
      [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(50)],
    ],
    description: [
      '',
      [Validators.maxLength(50)]],
  });

  constructor(public dialogRef: MatDialogRef<BrandDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BrandDialogData,
              private formBuilder: FormBuilder) {
    dialogRef.disableClose = true;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.dialogForm.patchValue({
      name: this.data.entity?.name,
      description: this.data.entity?.description,
    } as Brand);
  }

  save(): void {
    let result: BrandDialogData = {
      type: 'unknown',
    }
    if (this.data.type === 'create') {
      result = {
        ...result,
        type: 'create',
        entity: {
          name: this.dialogForm.value.name?.trim(),
          description: this.dialogForm.value.description?.trim(),
        },
      }
      this.dialogRef.close(result);
    } else if (this.data.type === 'update') {
      result = {
        ...result,
        type: 'update',
        entity: {
          id: this.data.entity?.id,
          name: this.dialogForm.value.name?.trim(),
          description: this.dialogForm.value.description?.trim(),
        },
      }
      this.dialogRef.close(result);
    } else {
      this.dialogRef.close();
    }
  }
}

export interface BrandDialogData {
  type: string;
  entity?: Brand;
}
