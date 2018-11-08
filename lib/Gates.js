export class Gate {
  constructor(type, is, os) {
    this.type = type;
    this.is = is;
    this.os = os;
  }

  toString() {
    return `${this.type}[${this.is.join(',')} => ${this.os.join(',')}]`;
  }
}

export class AndGate extends Gate {
  constructor(is, o) {
    super('and', is, [o]);
  }
}

export class NandGate extends Gate {
  constructor(is, o) {
    super('Nand', is, [o]);
  }
}

export class OrGate extends Gate {
  constructor(is, o) {
    super('or', is, [o]);
  }
}

export class NorGate extends Gate {
  constructor(is, o) {
    super('Nor', is, [o]);
  }
}

export class XorGate extends Gate {
  constructor(is, o) {
    super('xor', is, [o]);
  }
}

export class NotGate extends Gate {
  constructor(i, o) {
    super('not', [i], [o]);
  }
}

export class IdGate extends Gate {
  constructor(i, o) {
    super('id', [i], [o]);
  }
}

export class OneGate extends Gate {
  constructor(o) {
    super('one', [], [o]);
  }
}

export class ZeroGate extends Gate {
  constructor(o) {
    super('zero', [], [o]);
  }
}

export class FullAdder extends Gate {
  constructor(is, s, c) {
    super('FA', is, [s, c]);
  }
}
