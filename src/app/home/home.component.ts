import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PersonalAreaService } from '../service/personal-area.service';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/personal-area.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public users$ = new BehaviorSubject<IUser[]>([]);

  constructor(
    private personalAreaService: PersonalAreaService,
  ) {}

  getIconConfig(user: IUser): { color: string; text: string } {
   return user.iconConfig || {color: 'white', text: 'User'}
  }

  ngOnInit() {
    this.users$ = this.personalAreaService.getUsersObservable();
  }

  add() {
    this.personalAreaService.addUser();
  }
}
