import { times } from './collections';
import { OneGate, AndGate, NandGate } from './Gates';
import L from 'lodash';

export class AddCircuit {
  constructor(ns, signed) {
    this.nss = [L.clone(ns)];
    if(signed) alert('未実装');
    this.input();
    this.beforeFast();
    // this.fast();
  }

  input() {
    this.wires = [this.nss[0].flatMap((n, i) => times(n, j => `aa${i}${j}`))];
    this.gates = [];
  }

  beforeFast() {
    while(!this.readyForFast()) {
      const ns = [0];
      this.nss.last(0).forEach((n) => {
        ns.last(0, ns.last(0) + n % 3 + Math.floor(n / 3));
        ns.push(Math.floor(n / 3));
      });
      const c = String.fromCharCode(97 + this.nss.length);
      // this.wires.push(ns.flatMap((n, i) => times(n, j => `a${c}${i}${j}`)));
      if(ns.last(0) == 0) ns.pop();
      this.nss.push(ns);
    }
    this.nss_raw = L.cloneDeep(this.nss);
    this.simplify();
  }

  simplify() {
    while(true) {
      const a = this.nss.last(2), b = this.nss.last(1), c = this.nss.last(0);
      if(!a) break;
      const is = times(b.length).filter(i => b[i] >= 3);
      if(is.some(i => a[i] !== 2 || b[i] !== 3 || b[i+1] > 1 || c[i] > 1)) break;
      is.forEach((i) => { b[i] = 2; b[i+1] = (b[i+1] || 0) + 1; });
      this.nss.pop();
      break;
    }
  }

  readyForFast(ns) {
    return this.nss.last(0).every(n => n <= 2);
  }
}
