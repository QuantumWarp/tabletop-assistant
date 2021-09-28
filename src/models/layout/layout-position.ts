export default class LayoutPosition {
  columnStart: number;

  columnEnd: number;

  rowStart: number;

  rowEnd: number;

  constructor(
    columnStart: number,
    columnEnd: number,
    rowStart: number,
    rowEnd: number,
  ) {
    this.columnStart = columnStart;
    this.columnEnd = columnEnd;
    this.rowStart = rowStart;
    this.rowEnd = rowEnd;
  }
}
