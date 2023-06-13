export const PAGINATION = {
  PAGE: 1,
  SIZE: 10,
  MAX: 20
};

export const REGEX_FILTER = /[-\/\\^$*+?.()|[\]{}]/g;

export enum Role  {
  MANAGER= 'manager',
  ADMIN= 'admin',
  MEMBER= 'member'
};

export enum ORDER {
  ASC = 'asc',
  DESC = 'desc',
}
