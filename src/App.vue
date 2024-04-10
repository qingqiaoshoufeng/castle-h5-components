<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import routers from './config/router.json'

const selectedKeys = ref(0)

const menus = ref(routers)

const router = useRouter()

function handleSelect(index: number) {
  const res = menus.value[index]
  router.push({ path: res.path })
}

onMounted(() => {
  menus.value.forEach((item, index) => {
    if (location.hash.indexOf(item.path) === 1) {
      selectedKeys.value = index + 1
    }
  })
})
</script>

<template>
  <div class="app-content">
    <div class="app-content-left">
      <van-sidebar
        v-model="selectedKeys"
        mode="inline"
        theme="dark"
        @change="handleSelect"
      >
        <van-sidebar-item v-for="item in menus" :key="item.key">
          <template #title>
            <span>{{ item.label }}</span>
          </template>
        </van-sidebar-item>
      </van-sidebar>
    </div>
    <div class="app-content-right">
      <router-view />
    </div>
  </div>
</template>

<style lang="less" scoped>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.app-content {
  width: 100%;
  height: 100%;
  display: flex;
  &-left {
    width: 256px;
    display: flex;
    :deep(.van-sidebar) {
      width: 100%;
    }
  }
  &-right {
    width: 100%;
    padding: 20px 20px;
    overflow: auto;
  }
}
</style>
