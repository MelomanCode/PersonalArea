import {IEntityBase} from "./interfaces/personal-area.interface";


export const getLocalStorage = (key: 'entity'): IEntityBase[] => {
  const tmp = localStorage.getItem(key);
  if (tmp) {
    return JSON.parse(tmp) as IEntityBase[];
  } else {
    return [];
  }
};

export const setLocalStorage = (key: 'entity', values: IEntityBase[]) => {
  localStorage.setItem(key, JSON.stringify(values));
};
