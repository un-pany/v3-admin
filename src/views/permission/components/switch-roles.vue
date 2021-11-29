<!-- 切换角色 -->

<template>
  <div>
    <div style="margin-bottom: 15px">
      你的权限：{{ roles }}
    </div>
    <p>切换权限：</p>
    <el-radio-group v-model="currentRole">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { store } from '@/store'
import { computed, ref, watch, defineEmits } from 'vue'

const emit = defineEmits(['change'])
const roles = computed(() => store.state.user.roles)
const currentRole = ref(roles.value[0])
watch(currentRole, async(value) => {
  await store.dispatch('user/changeRoles', value)
  emit('change')
})
</script>
