export class PaginationCommand {
  pageIndex: number;
  pageSize: number;

  constructor(pageIndex: number, pageSize: number) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
  }
}
