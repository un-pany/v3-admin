<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-bind="options"
      v-loading="loading"
      :element-loading-text="loadingOptions.text"
      :element-loading-spinner="loadingOptions.spinner"
      :element-loading-background="loadingOptions.background"
      :row-key="getRowKeys"
      @current-change="handleCurrentChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandChange"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      @cell-click="handleCellClick"
      @cell-dblclick="handleCellDblclick"
      @row-click="handleRowClick"
      @row-contextmenu="handleRowContextmenu"
      @row-dblclick="handleRowDblclick"
      @header-click="handleHeaderClick"
      @header-contextmenu="handleHeaderContextmenu"
    >
      <template v-for="item in tableHeader">
        <slot name="front-slot" />
        <el-table-column
          v-if="item.type === 'index'"
          :key="item.prop"
          align="center"
          type="index"
          width="50"
        />
        <el-table-column
          v-else-if="item.type === 'select'"
          :key="item.prop"
          align="center"
          type="selection"
          width="55"
        />
        <el-table-column
          v-else-if="item.type === 'expand'"
          :key="item.prop"
          align="center"
          type="expand"
        >
          <template #default="scope">
            <div>
              <slot :name="item.slotName" :scope="scope" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.checked === undefined || item.checked"
          :key="item.prop"
          v-bind="item"
        >
          <template #default="scope">
            <div v-if="!item.hidden">
              <el-row v-if="item.type === 'operate'">
                <el-button
                  size="mini"
                  type="text"
                  v-for="operate in item.operates"
                  :key="operate.name"
                  @click="handleClick(operate, scope.$index, scope.row)"
                >
                  {{ operate.name }}
                </el-button>
              </el-row>
              <span v-else-if="item.type === 'time'">
                {{ formatDateTime(scope.row[item.prop]) }}
              </span>
              <div v-else-if="item.type === 'switch'">
                <el-switch v-model="scope.row[item.prop]" />
              </div>
              <span v-else>
                {{ scope.row[item.prop] }}
              </span>
            </div>
            <div v-if="item.slotName">
              <!-- 具名slot -->
              <slot :name="item.slotName" :scope="scope" />
            </div>
          </template>
        </el-table-column>
      </template>
      <slot />
    </el-table>
    <div v-if="pagination !== null">
      <el-pagination
        v-bind="pagination"
        @size-change="pagination.handleSizeChange"
        @current-change="pagination.handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface AnyObject {
  [key: string]: any
}
export default defineComponent({
  name: 'SimpleTable',
  props: {
    /**
     * @description 表格数据
     */
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * @description 分页数据
     */
    pageNum: {
      type: Number,
      required: true,
      default: 1
    },
    /**
     * @description 分页数据
     */
    pageSize: {
      type: Number,
      required: true,
      default: 10
    },
    /**
     * @description 索引列
     */
    index: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * @description 多选列
     */
    select: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * @description 表头数据
     */
    tableHeader: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * @description 加载
     */
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * @description 加载样式
     */
    loadingOptions: {
      type: Object,
      default: () => {
        return {
          text: '',
          spinner: '',
          background: ''
        }
      },
      required: false
    },
    /**
     * @description 属性
     */
    options: {
      type: Object,
      default: () => {
        return {
          border: true
        }
      },
      required: false
    },
    /**
     * @description 分页
     */
    pagination: {
      type: Object,
      default: null,
      required: false
    }
  },
  emits: [
    'operation',
    'current-change',
    'select',
    'select-all',
    'selection-change',
    'expand-change',
    'cell-mouse-enter',
    'cell-mouse-leave',
    'cell-click',
    'cell-dblclick',
    'row-click',
    'row-contextmenu',
    'row-dblclick',
    'header-click',
    'header-contextmenu'
  ],
  setup(props: any, context: any) {
    const getRowKeys = (row: AnyObject) => {
      return row.id
    }

    function handleClick(info: string, index: number, row: AnyObject) {
      context.emit('operation', info, index, row)
    }
    /**
     * @description 行选中状态
     */
    function handleCurrentChange(
      currentRow: AnyObject,
      oldCurrentRow: AnyObject
    ) {
      context.emit('current-change', currentRow, oldCurrentRow)
    }
    /**
     * @description 勾选数据时触发的事件
     */
    function handleSelect(selection: AnyObject, row: AnyObject) {
      context.emit('select', selection, row)
    }
    /**
     * @description 勾选全选时触发的事件
     */
    function handleSelectAll(selection: AnyObject) {
      context.emit('select-all', selection)
    }
    /**
     * @description 复选框选择项发生变化时触发的事件
     */
    function handleSelectionChange(selection: AnyObject) {
      context.emit('selection-change', selection)
    }
    /**
     * @description 复选框选择项发生变化时触发的事件
     */
    function handleExpandChange(row: AnyObject) {
      context.emit('expand-change', row)
    }
    /**
     * @description 单元格 hover 进入时触发的事件
     */
    function handleCellMouseEnter(
      row: AnyObject,
      column: AnyObject,
      cell: AnyObject,
      event: () => void
    ) {
      context.emit('cell-mouse-enter', row, column, cell, event)
    }
    /**
     * @description 单元格 hover 退出时触发的事件
     */
    function handleCellMouseLeave(
      row: AnyObject,
      column: AnyObject,
      cell: AnyObject,
      event: () => void
    ) {
      context.emit('cell-mouse-leave', row, column, cell, event)
    }
    /**
     * @description 单元格点击时触发的事件
     */
    function handleCellClick(
      row: AnyObject,
      column: AnyObject,
      cell: AnyObject,
      event: () => void
    ) {
      context.emit('cell-click', row, column, cell, event)
    }
    /**
     * @description 单元格双击时触发的事件
     */
    function handleCellDblclick(
      row: AnyObject,
      column: AnyObject,
      cell: AnyObject,
      event: () => void
    ) {
      context.emit('cell-dblclick', row, column, cell, event)
    }
    /**
     * @description 行点击时触发的事件
     */
    function handleRowClick(
      row: AnyObject,
      event: AnyObject,
      column: AnyObject
    ) {
      context.emit('row-click', row, event, column)
    }
    /**
     * @description 行右键点击时触发的事件
     */
    function handleRowContextmenu(row: AnyObject, event: AnyObject) {
      context.emit('row-contextmenu', row, event)
    }
    /**
     * @description 行双击时触发的事件
     */
    function handleRowDblclick(row: AnyObject, event: AnyObject) {
      context.emit('row-dblclick', row, event)
    }
    /**
     * @description 表头点击时触发的事件
     */
    function handleHeaderClick(column: AnyObject, event: AnyObject) {
      context.emit('header-click', column, event)
    }
    /**
     * @description 表头右键点击时触发的事件
     */
    function handleHeaderContextmenu(column: AnyObject, event: () => void) {
      context.emit('header-contextmenu', column, event)
    }
    return {
      getRowKeys,
      handleClick,
      handleCurrentChange,
      handleSelect,
      handleSelectAll,
      handleSelectionChange,
      handleExpandChange,
      handleCellMouseEnter,
      handleCellMouseLeave,
      handleCellClick,
      handleCellDblclick,
      handleRowClick,
      handleRowContextmenu,
      handleRowDblclick,
      handleHeaderClick,
      handleHeaderContextmenu
    }
  }
})
</script>

<style lang="scss">
.el-table .warning-row {
  background: #3e3e3e !important;
}

.el-table .cell.el-tooltip {
  div {
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
