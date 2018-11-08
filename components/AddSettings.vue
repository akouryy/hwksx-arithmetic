<template>
  <div class="AddSettings">
    <div class="AddSettings_Kinds">
      <div
        v-for="kind in kinds"
        :key="`add_settings-kind-${kind.id}`"
        :class="{ _active: kind.id == settings.kindID }"
        class="AddSettings_Kind"
        @click="setKind(kind)"
      >
        {{ kind.text }}
      </div>
    </div>

    <div class="AddSettings_Ns">
      <label class="MultiplySettings_N">
        bitごとの入力数(空白区切り, MSBが左)
        <input v-model="ns" class="AddSettings_NInput">
      </label>
    </div>
  </div>
</template>

<script>
import L from 'lodash';

export default {
  props: {
    kinds: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      ns: '',
      settings: {
        ns: [],
        kindID: 0,
      },
    };
  },
  watch: {
    ns(val) {
      this.settings.ns = val.split(/\D+/).reverse()
        .map(x => parseInt(x, 10)).filter(x => !isNaN(x));
    },

    settings: {
      deep: true,
      handler(val) {
        this.$emit('seted', L.clone(val));
      },
    },
  },
  methods: {
    setKind(kind) { this.settings.kindID = kind.id; },
  },
};
</script>

<style lang="scss" scoped>
.AddSettings {
  &_Kinds {
    align-items: center;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  &_Kind {
    min-width: 160px;
    padding: 12px;

    &:hover {
      background: #142214;
    }

    &._active {
      background: #163316;
    }
  }

  &_Ns {
    align-items: center;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  &_N {
    min-width: 640px;
  }

  &_NInput {
    width: 400px;
  }
}
</style>
