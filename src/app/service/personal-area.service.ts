import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/personal-area.interface';
import { BehaviorSubject } from 'rxjs';
import { getLocalStorage, setLocalStorage } from '../general.functions';

@Injectable({
  providedIn: 'root',
})
export class PersonalAreaService {
  private users: IUser[] = [];
  private users$ = new BehaviorSubject<IUser[]>([]);

  constructor() {
    this.getInLocalStorage();
  }
  setInArray(data: IUser) {
    const foundUser = this.users.find((user) => user.id === data.id);
    if (foundUser) {
      foundUser.id = data.id;
      foundUser.name = data.name;
      foundUser.surname = data.surname;
      foundUser.patronymic = data.patronymic;
      foundUser.personalQualities = data.personalQualities;
      foundUser.email = data.email;
      foundUser.imageLink = data.imageLink;
      foundUser.aboutMe = data.aboutMe;
      foundUser.dateOfBirth = data.dateOfBirth;
      foundUser.iconConfig = data.iconConfig;
      this.setInLocalStorage();
      this.updateList();
    }
  }

  getUsersObservable() {
    return this.users$;
  }

  private generateId(): number {
    let lastId = this.users.sort((a, b) => (a.id > b.id ? 1 : -1))[
      this.users.length - 1
    ]?.id;
    return lastId !== undefined ? ++lastId : 0;
  }

  addUser() {
    this.generateId();
    this.users.push({
      id: this.generateId(),
      name: '',
      aboutMe: '',
      dateOfBirth: 0,
      email: '',
      imageLink: '',
      patronymic: '',
      personalQualities: '',
      surname: '',
      iconConfig: { color: '#89ea00', text: 'user' },
    });
    this.setInLocalStorage();
    this.updateList();
  }

  private updateList() {
    this.users$.next(this.users);
  }

  private setInLocalStorage(): void {
    setLocalStorage('users', this.users);
  }

  private getInLocalStorage() {
    this.users = getLocalStorage('users');
    this.updateList();
  }

  public clearLocalStorage(): void {
    localStorage.setItem('users', '');
    this.users = [];
    location.reload();
  }

  deleteUser(data: IUser) {
    this.users = this.users.filter((user) => user.id !== data.id);
    this.updateList()
  }

  getUser(id: number): IUser | null {
    return this.users.find((user) => user.id === id) || null;
  }
}
