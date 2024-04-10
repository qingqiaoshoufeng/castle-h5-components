<script lang="ts" setup>
const demosRaw: any = import.meta.glob('./demo*.vue', { eager: true })
const demos = Object.keys(demosRaw).map(
  d => demosRaw[d].default,
)
</script>

<template>
  <div class="component-example">
    <section
      v-for="(demo, index) in demos"
      :key="index"
      class="component-example-section"
    >
      <div class="component-example-content">
        <component :is="demo" />
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
.component-example {
  .component-example-section {
    margin-top: 10px;
  }
  .component-example-section:first-child {
    margin-top: 0px;
  }
}
</style>
