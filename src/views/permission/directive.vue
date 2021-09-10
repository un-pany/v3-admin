<!-- 权限指令使用 -->

<template>
  <div class="app-container">
    <SwitchRoles @change="handleRolesChange" />
    <div :key="key" style="margin-top: 30px">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          Only
          <el-tag size="small">admin</el-tag> can see
          this
        </span>
        <el-tag
          v-permission="['admin']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['admin']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['editor']" class="permission-alert">
          Only
          <el-tag size="small">editor</el-tag> can see
          this
        </span>
        <el-tag
          v-permission="['editor']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['editor']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['admin', 'editor']" class="permission-alert">
          Both
          <el-tag size="small">admin</el-tag> and
          <el-tag size="small">editor</el-tag> can see
          this
        </span>
        <el-tag
          v-permission="['admin', 'editor']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['admin','editor']"
        </el-tag>
      </div>
    </div>

    <div :key="'checkPermission' + key" style="margin-top: 60px">
      <el-tag type="info">
        在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。
      </el-tag>

      <el-tabs type="border-card" style="width: 550px; margin-top: 60px">
        <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">
          Admin can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['editor'])" label="Editor">
          Editor can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['editor'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane
          v-if="checkPermission(['admin', 'editor'])"
          label="Admin-OR-Editor"
        >
          Both admin or editor can see this
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin','editor'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { checkPermission } from '@/utils/permission' // 权限判断函数
import SwitchRoles from './components/switch-roles.vue'

export default defineComponent({
  name: 'DirectivePermission',
  components: {
    SwitchRoles
  },
  setup() {
    const state = reactive({
      key: 1,
      checkPermission: checkPermission,
      handleRolesChange: () => {
        state.key++
      }
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.permission-alert {
  width: 320px;
  margin-top: 15px;
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-block;
}

.permission-sourceCode {
  margin-left: 15px;
}
</style>
