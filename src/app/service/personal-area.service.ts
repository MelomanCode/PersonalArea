import { Injectable } from '@angular/core';
import {Entity, IEntityBase, IEntityByType, UserType} from "../interfaces/personal-area.interface";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PersonalAreaService {

  private entityByTypes: IEntityByType<IEntityBase>[] = [];
  private entityByTypes$ = new BehaviorSubject<IEntityByType<IEntityBase>[]>([]);

  editableEntity: IEntityBase = new Entity();
  personalAreaArray: IEntityBase[] = []

  constructor() {
  }




  private addInArray(): void {
    const tmpResult: IEntityBase = {
      name: this.editableEntity.name,
      surname: this.editableEntity.surname,
      patronymic: this.editableEntity.patronymic,
      personalQualities: this.editableEntity.personalQualities,
      email: this.editableEntity.email,
      imageLink: this.editableEntity.imageLink,
      aboutMe: this.editableEntity.aboutMe,
      dateOfBirth: this.editableEntity.dateOfBirth,
      id: this.editableEntity.id
    }
    this.personalAreaArray.push(tmpResult);
  }

  getCellsByTypesObservable() {
    return this.entityByTypes$;
  }

  private updateList() {
    this.entityByTypes$.next(this.entityByTypes);
  }

  updateUserArea(
    typeOfUser: UserType,
    id: number,
    content: IEntityBase,
  ) {
    const entityByTypes = this.entityByTypes.find(
      (type) => type.typeName === typeOfUser,
    );
    const foundUser = entityByTypes?.users.find(
      (user) => user.id === id,
    );
    if (foundUser) {
      foundUser.name = content.name;
      foundUser.email = content.email;
      foundUser.surname = content.surname;
      foundUser.patronymic = content.patronymic;
      foundUser.aboutMe = content.aboutMe;
      foundUser.dateOfBirth = content.dateOfBirth;
      foundUser.personalQualities = content.personalQualities;
      foundUser.imageLink = content.imageLink;

      this.updateList();
    }
  }



}
