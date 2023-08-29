import {Component, Input, OnInit} from '@angular/core';
import {Entity, IEntityBase} from "../interfaces/personal-area.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {setLocalStorage} from "../general.functions";

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit {
  @Input() editableEntity: IEntityBase = new Entity();
  personalAreaArray: IEntityBase[] = []

  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      patronymic: ['', Validators.required],
      personalQualities: [''],
      aboutMe: [''],
      imageLink: [''],
      dateOfBirth: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit() {

  }

  public getIsAccessControl(controlName: string): boolean {
    return this.formGroup.get(controlName) !== null;
  }

  public submitData(): void {
    const data: IEntityBase = this.formGroup.getRawValue();
    if (data) {
      this.personalAreaArray.push(data)
      setLocalStorage('entity', this.personalAreaArray)
      this.activeModal.close();
    }
  }
}
