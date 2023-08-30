import {IUser} from "./interfaces/personal-area.interface";


export const getLocalStorage = (key: 'users'): IUser[] => {
  const tmp = localStorage.getItem(key);
  if (tmp) {
    return JSON.parse(tmp) as IUser[];
  } else {
    return [];
  }
};

export const setLocalStorage = (key: 'users', values: IUser[]) => {
  localStorage.setItem(key, JSON.stringify(values));
};
