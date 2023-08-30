export interface IUser {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  imageLink?: string;
  aboutMe: string;
  dateOfBirth: string;
  personalQualities: string;
  email: string;
  iconConfig: IIconConfig
}

export interface IIconConfig {
  color: string;
  text: string;
}


