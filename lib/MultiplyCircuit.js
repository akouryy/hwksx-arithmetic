import { times } from './collections';
import { OneGate, AndGate, NandGate } from './Gates';

export class MultiplyCircuit {
  constructor(bitA, bitB, signed, negate) {
    this.bitA = bitA;
    this.bitB = bitB;
    this.signed = signed;
    this.negate = negate;
    this.input();
    this.multiplyAndNegate();
    // this.add1or2();
    // this.fastAdd();
  }

  input() {
    const ws = times(this.bitA, i => `ma${i}`);
    ws.push(...times(this.bitB, i => `mb${i}`));
    this.wires = [ws];
    this.gates = [];
  }

  multiplyAndNegate() {
    this.const_to_add = 0;
    const gateTypes = {};

    const gs = times(this.bitA, i => times(this.bitB, j => {
      const gate = (() => {
        if(!this.signed) return AndGate;
        const il = i === this.bitA - 1;
        const jl = j === this.bitB - 1;
        if((il === jl) !== this.negate) return AndGate;
        else return NandGate;
      })();
      gateTypes[`mc${i}${j}`] = gate;
      return new gate([`ma${i}`, `mb${j}`], `mc${i}${j}`);
    }));
    this.gates.push(gs);

    let over = 0;
    this.wires.push(times(this.bitA + this.bitB, k => {
      const ws = times(this.bitB).flatMap(j => {
        const i = k - j;
        if(0 <= i && i < this.bitA) {
          const name = `mc${i}${j}`
          over += gateTypes[name] === NandGate;
          return name;
        } else {
          return [];
        }
      });

      if((over & 1) == 1) {
        gs.push(new OneGate(`md${k}`));
        ws.push(`md${k}`);
        over += 1;
        this.const_to_add |= 1 << k;
      }
      over >>= 1;

      return ws;
    }));
  }
}

/*
a=4,b=3
     a a a a
       b b b
    30201000
  31211101
32221202

*/
