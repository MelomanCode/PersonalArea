export type UserType = 'user'
export interface IEntityBase {
id: number;
name: string;
surname: string;
patronymic: string;
imageLink?: string;
aboutMe: string;
dateOfBirth: string;
personalQualities: string;
email: string;
}

export interface IEntityByType<T> {
  typeName: UserType;
users: T[];
}

export class Entity implements IEntityBase  {
id = 0;
name = '';
surname = '';
patronymic = '';
personalQualities = '';
aboutMe = '';
imageLink = '';
dateOfBirth = '';
email = '';

constructor(params?: IEntityBase) {
  if (params) {
this.id = params.id || 0;
this.name = params.name || '';
this.surname = params.surname || '';
this.patronymic = params.patronymic || '';
this.personalQualities = params.personalQualities || '';
this.aboutMe = params.aboutMe || '';
this.imageLink = params.imageLink || '';
this.dateOfBirth = params.dateOfBirth || '';
this.email = params.email || '';
  }
}
}

