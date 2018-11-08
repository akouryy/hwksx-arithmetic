<template>
  <div class="MultiplySettings">
    <div class="MultiplySettings_Kinds">
      <div
        v-for="kind in kinds"
        :key="`multiply_settings-kind-${kind.id}`"
        :class="{ _active: kind.id == settings.kindID }"
        class="MultiplySettings_Kind"
        @click="setKind(kind)"
      >
        {{ kind.text }}
      </div>
    </div>

    <div class="MultiplySettings_Bits">
      <label class="MultiplySettings_Bit">
        Aのbit数
        <input v-model.number="settings.bitA" class="MultiplySettings_BitInput" type="number">
      </label>
      <label class="MultiplySettings_Bit">
        Bのbit数
        <input v-model.number="settings.bitB" class="MultiplySettings_BitInput" type="number">
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    kinds: {
      type: Array,
      required: true,
    },
    settings: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    setKind(kind) { this.settings.kindID = kind.id; },
  },
};
</script>

<style lang="scss" scoped>
.MultiplySettings {
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

  &_Bits {
    align-items: center;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  &_Bit {
    min-width: 240px;
  }

  &_BitInput {
    width: 100px;
  }
}
</style>
