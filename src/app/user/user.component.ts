import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/personal-area.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonalAreaService } from '../service/personal-area.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IconConfigGenerateService } from '../service/icon-config-generate.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public formGroup: FormGroup;
  private userId: number = 0;
  iconConfig: { color: string; text: string } = { color: '', text: '' };
  dateOfBirth: NgbDateStruct = { day: 0, year: 0, month: 0 };

  constructor(
    private fb: FormBuilder,
    private personalAreaService: PersonalAreaService,
    private route: ActivatedRoute,
    private iconConfigGenerateService: IconConfigGenerateService,
    private router: Router,
  ) {
    this.formGroup = this.fb.group({
      name: [''],
      surname: [''],
      patronymic: [''],
      personalQualities: [''],
      aboutMe: [''],
      imageLink: [''],
      email: [''],
    });
  }

  ngOnInit() {
    this.route.params.pipe().subscribe((params) => {
      if (params['id']) {
        this.userId = +params['id'];
        this.getUser();
      }
    });
  }

  public getIsAccessControl(controlName: string): boolean {
    return this.formGroup.get(controlName) !== null;
  }

  public submitData($event: MouseEvent): void {
    const data: IUser = this.formGroup.getRawValue();
    if (data) {
      data.id = this.userId;
      data['iconConfig'] = this.iconConfig;
      data['dateOfBirth'] = this.convertDateFormatToTimestamp(this.dateOfBirth);
      this.personalAreaService.setInArray(data);
      $event.preventDefault();
      this.router.navigate(['/users']).then();
    }
  }

  private getUser() {
    const user = this.personalAreaService.getUser(this.userId);
    if (user) {
      this.formGroup.patchValue(user);
      this.dateOfBirth = this.convertTimestampToDateFormat(user.dateOfBirth);
      this.updateIcon();
    }
  }

  updateIcon() {
    const user = this.formGroup.getRawValue();
    if (user) {
      this.iconConfig = this.iconConfigGenerateService.getIconConfig(user);
    }
  }

  private convertDateFormatToTimestamp(date: NgbDateStruct): number {
    if (!date) {
      return 0;
    }

    const { year, month, day } = date;
    const jsDate = new Date(year, month - 1, day);
    return jsDate.getTime();
  }

  private convertTimestampToDateFormat(timeStamp: number): NgbDateStruct {
    if (!timeStamp) {
      return { day: 0, year: 1789, month: 0 };
    }

    const jsDate = new Date(timeStamp);
    const year = jsDate.getFullYear();
    const month = jsDate.getMonth() + 1;
    const day = jsDate.getDate();

    return { year, month, day };
  }
}
