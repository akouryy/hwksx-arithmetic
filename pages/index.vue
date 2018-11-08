<template>
  <section class="Index">
    <h1 class="Index_Title">ハードウェア構成法 演算回路</h1>
    <div class="Index_Tabs">
      <div
        v-for="tab in tabs"
        :key="tab"
        :class="{ _active: tab == currentTab }"
        class="Index_Tab"
        @click="setTab(tab)"
      >
        {{ tab }}
      </div>
    </div>
    <Multiply v-if="currentTab == '乗算'"/>
    <Add v-else-if="currentTab == '加算'"/>
  </section>
</template>

<script>
import Add from '~/components/Add';
import Multiply from '~/components/Multiply';

export default {
  components: {
    Add,
    Multiply,
  },
  data() {
    return {
      currentTab: '乗算',
      tabs: ['乗算', '加算'],
    };
  },
  methods: {
    setTab(tab) {
      console.log('setTab');
      this.currentTab = tab;
    },
  },
};
</script>

<style lang="scss" scoped>
.Index {
  &_Title {
    @media screen and (min-width: 1200px) {
      position: absolute;
    }
  }

  &_Tabs {
    align-items: center;
    border-bottom: 1px solid #6c6;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  &_Tab {
    min-width: 200px;
    padding: 16px;

    &:hover {
      background: #142214;
    }

    &._active {
      background: #163316;
    }
  }
}
</style>
