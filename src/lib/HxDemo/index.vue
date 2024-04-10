<script setup>
import { Button } from 'vant'

defineOptions({
  name: 'HxDemo',
  components: { VantButton: Button },
})

function handleClick() {
  alert('Primary Button')
}
</script>

<template>
  <VantButton type="primary" @click="handleClick">
    Primary Button
  </VantButton>
</template>

<style lang="less" scoped>
.hx-demo-content {
  margin: 0 0;
}
</style>
