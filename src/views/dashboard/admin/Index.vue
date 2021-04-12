<!-- admin 权限主页 -->
<template>
  <div class="dashboard-editor-container">
    <GithubCorner class="github-corner" />
    <filter-container />
    <simple-table
      :tableData="list"
      :tableHeader="tableHeader"
      :pageNum="pageNum"
      :pageSize="pageSize" />
    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 16}"
        :xl="{span: 16}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <DependsTable />
      </el-col>
    </el-row>

    <el-row>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 16}"
        :xl="{span: 16}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <UpdateTimeline />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  components: {},
  setup() {
    const tableHeader = [
      { prop: 'id', label: '编号', width: '100', align: 'center' },
      { prop: 'name', label: '应用名称', align: 'center' },
      { prop: 'accessKey', label: '访问键', align: 'center' }
    ]

    const list = reactive([{
      id: 1,
      name: 'sss',
      accessKey: 'ssasas'
    }])
    return {
      tableHeader,
      list
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

}
</style>
