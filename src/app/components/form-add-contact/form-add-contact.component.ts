﻿import { Component, Input, Output, EventEmitter, Inject, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
	FormBuilder,
	FormArray,
	FormGroup,
	FormControl,
	Validators,

	AbstractControl
} from '@angular/forms';

import {
	PhoneContactType,
	MaterialAlertMessageType,
} from "../../models/index";
import { Service } from "../../services/index";
@Component({
	selector: 'form-add-contact',
	templateUrl: './form-add-contact.component.html'
})
export class FormAddContactComponent {
	constructor(
		private service: Service,
		private fb: FormBuilder,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
	) {
		this.createForm();
		this.showProgress = false;
	}

	@Input('showProgress') showProgress: boolean;
	@Output() onAddContact: EventEmitter<PhoneContactType> = new EventEmitter<PhoneContactType>();

	ngOnInit() {
		this.model = new PhoneContactType();
	}

	defaultAvatar = this.service.defaultAvatar;

	image: string = this.defaultAvatar;

	model!: PhoneContactType;
	formGroup!: FormGroup

	createForm() {
		this.formGroup = this.fb.group({
			name: new FormControl('', [
				Validators.maxLength(100),
				Validators.required

			]),

			email: new FormControl('',
				[
					Validators.email,
					Validators.required,
					Validators.maxLength(300)
				]
			),
			avatarDataUri: new FormControl('')
		})
	}

	onImageSelected(imageDataUri: string): void {
		//console.log("form-add-contact.component.ts onImageSelected: imageDateUri: ", imageDataUri);
		this.image = imageDataUri;
		this.model.avatarDataUri = imageDataUri;
	}

	removeAvatar(): void {
		this.image = this.defaultAvatar;
	}

	submit() {
		if (this.formGroup.valid) {
			this.model.email = this.service.sanitizeEmail(this.formGroup.get('email')?.value);
			this.model.name = this.formGroup.get('name')?.value;
			this.model.avatarDataUri = this.image != this.defaultAvatar ? this.image : "";
			this.onAddContact.emit(this.model);
		}
		else {
			let alert = new MaterialAlertMessageType();
			alert.title = "Please Check";
			alert.message = "Please make sure the form is filled out and any error messages are fixed."
			this.service.openAlert(alert);
		}
	}
}
