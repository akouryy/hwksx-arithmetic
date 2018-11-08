<template>
  <div class="Multiply">
    <MultiplySettings :settings="settings" :kinds="kinds"/>

    {{ circuit.wires.join(';') }}<br>
    {{ circuit.gates.join(';') }}<br>
    {{ circuit.const_to_add.toString(2) }}
  </div>
</template>

<script>
import MultiplySettings from '~/components/MultiplySettings';
import { MultiplyCircuit } from '~/lib/MultiplyCircuit';

export default {
  components: {
    MultiplySettings,
  },
  data() {
    return {
      kinds: [
        { id: 0, text: 'A × B [unsigned]', signed: false, negate: false },
        { id: 1, text: 'A × B [signed]', signed: true, negate: false },
        { id: 2, text: '-(A × B) [signed]', signed: true, negate: true },
      ],
      settings: {
        kindID: 0,
        bitA: 4,
        bitB: 4,
      },
    };
  },
  computed: {
    circuit() {
      const { signed, negate } = this.kinds[this.settings.kindID];
      return new MultiplyCircuit(this.settings.bitA, this.settings.bitB, signed, negate);
    },
  },
  methods: {},
};
</script>

<style>

</style>
