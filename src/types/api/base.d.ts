export interface PageQueryParam {
  pageNumber: number;
  pageSize: number;
  orderField: string;
  ordertype: string;
}

export interface PageResult<T> {
  //list: T;
  data: list<T>;
  total: number;
  code: number;
}

export interface list<T> {
  list: T;
  info: T;
}
