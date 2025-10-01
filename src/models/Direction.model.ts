export class Direction {
  zx: number;
  y: number;

  constructor(zx = 0, y = 0) {
    this.zx = zx;
    this.y = y;
  }

  clone({ zx: _zx, y: _y }: { zx?: number; y?: number } = {}) {
    const { zx, y } = this;
    return new Direction(_zx ?? zx, _y ?? y);
  }
}
