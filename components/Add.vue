<template>
  <div class="Add">
    <AddSettings :kinds="kinds" @seted="settings = $event"/>

    <div v-if="circuit">
      {{ circuit.wires.join('; ') }}<br>
      {{ circuit.gates.join('; ') }}<br>
      &lt;- MSB ... LSB -&gt;
      <div class="Add_NssContainer">
        <div class="Add_Nss">
          <div v-for="ns in circuit.nss_raw" :key="`add-nss_raw-${ns.join('-')}`" class="Add_Ns">
            {{ ns.reverse() }}
          </div>
        </div>
      </div>
      <div class="Add_NssContainer">
        <div class="Add_Nss">
          <div v-for="ns in circuit.nss" :key="`add-nss-${ns.join('-')}`" class="Add_Ns">
            {{ ns.reverse() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddSettings from '~/components/AddSettings';
import { AddCircuit } from '~/lib/AddCircuit';

export default {
  components: {
    AddSettings,
  },

  data() {
    return {
      kinds: [
        { id: 0, text: 'unsigned', signed: false },
        // { id: 1, text: 'signed', signed: true },
      ],
      settings: null,
    };
  },

  computed: {
    circuit() {
      if(!this.settings) return null;

      try {
        if(this.settings.ns.length > 0) {
          const { signed } = this.kinds[this.settings.kindID];
          return new AddCircuit(this.settings.ns, signed);
        } else {
          return null;
        }
      } catch(e) {
        console.error(e);
      }
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.Add {
  &_Nss {
    align-items: flex-end;
    border-top: 1px solid #6c6;
    display: inline-flex;
    flex-direction: column;
    min-width: 0px;
  }
}
</style>
