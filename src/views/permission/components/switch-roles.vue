<!-- 切换角色控件 -->
<template>
  <div>
    <div style="margin-bottom: 15px">
      你的权限： {{ roles }}
    </div>
    <p>切换权限：</p>
    <el-radio-group v-model="currentRole">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { computed, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'SwitchRoles',
  emits: ['change'],
  setup(props, { emit }) {
    const store = useStore()
    const roles = computed(() => store.state.user.roles)
    const currentRole = ref(roles.value[0])
    watch(currentRole, async(value) => {
      await store.dispatch(UserActionTypes.ACTION_CHANGE_ROLES, value)
      emit('change')
    })
    return {
      roles,
      currentRole
    }
  }
})
</script>
