Array.prototype.reduceSW = function reduceSW(i, f) { return this.reduce(f, i); };

const GET = {};

Array.prototype.last = function last(i, v = GET) {
  if(v === GET) {
    return this[this.length - 1 - i];
  } else {
    return this[this.length - 1 - i] = v;
  }
}

export const times = (n, f) => {
  if(f) {
    return Array.from({ length: n }, (_, i) => f(i));
  } else {
    return Array.from({ length: n }, (_, i) => i);
  }
}
