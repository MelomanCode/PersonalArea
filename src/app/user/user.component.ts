import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/personal-area.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonalAreaService } from '../service/personal-area.service';
import {ActivatedRoute, Router} from '@angular/router';
import { IconConfigGenerateService } from '../service/icon-config-generate.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public formGroup: FormGroup;
  private userId: number = 0;
  iconConfig: { color: string; text: string } = { color: '', text: '' };

  constructor(
    private fb: FormBuilder,
    private personalAreaService: PersonalAreaService,
    private route: ActivatedRoute,
    private iconConfigGenerateService: IconConfigGenerateService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      name: [''],
      surname: [''],
      patronymic: [''],
      personalQualities: [''],
      aboutMe: [''],
      imageLink: [''],
      dateOfBirth: [''],
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
      data['iconConfig'] = this.iconConfig
      this.personalAreaService.setInArray(data);
      $event.preventDefault()
      this.router.navigate(['/users']).then()
    }
  }

  private getUser() {
    const user = this.personalAreaService.getUser(this.userId);
    if (user) {
      this.formGroup.patchValue(user);
      this.updateIcon();
    }
  }

  updateIcon() {
    const user = this.formGroup.getRawValue();
    if (user) {
     this.iconConfig = this.iconConfigGenerateService.getIconConfig(user);
    }
  }
}
