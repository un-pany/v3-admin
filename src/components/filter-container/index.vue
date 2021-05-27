<template>
  <el-card class="filter-container" shadow="never">
    <div>
      <el-form
        :inline="true"
        :model="listQuery"
        size="small"
        label-width="100px"
        :label-position="labelPosition"
      >
        <el-form-item>
          <el-input
            v-model="listQuery.keyword"
            ref="filter"
            @focus="testfocus"
            @blur="testblur"
            @keyup.enter="handleSearchList"
            class="input-width users-header--toolbar-input"
            :placeholder="placeholder"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <div>
            <el-button
              style="float: right"
              type="primary"
              @click="handleSearchList()"
              icon="el-icon-search"
              size="small"
            >
              搜索
            </el-button>
            <el-button
              style="float: right; margin-right: 15px"
              @click="handleResetSearch()"
              size="small"
            >
              重置
            </el-button>
          </div>
        </el-form-item>
        <!-- <el-form-item style="float: right;" >
          <el-button type="primary" size="small" icon="el-icon-edit" class="btn-add" @click="handleAdd()">添加</el-button>
        </el-form-item> -->
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts">
import { ref, reactive, getCurrentInstance, defineComponent } from 'vue'

interface AnyObject {
  [key: string]: any
}
export default defineComponent({
  name: 'FilterContainer',
  props: {
    defaultListQuery: {
      type: Object,
      default: () => {
        // 去除warning
      }
    },
    data: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'function'
    },
    placeholder: {
      type: String,
      default: '请输入搜索关键字'
    }
  },
  emits: ['filterSearch'],
  setup(props: any, context: any) {
    const { ctx } = getCurrentInstance() as any
    const labelPosition = ref('left')
    let listQuery = reactive(Object.assign({}, props.defaultListQuery))
    const handleResetSearch = () => {
      listQuery = { ...props.defaultListQuery }
    }
    function testfocus() {
      (ctx.$refs as any).filter.$el.style.width = 200 + 'px'
    }
    function testblur() {
      (ctx.$refs as any).filter.$el.style.width = 170 + 'px'
    }
    function handleSearchList() {
      let { keyword } = listQuery
      if (!keyword) {
        context.emit('filterSearch', '')
        return
      }
      keyword = Number(keyword) || keyword
      let temple
      switch (props.type) {
        case 'function':
          temple = props.data.reduce((total: AnyObject[], _cur: AnyObject) => {
            const cur = _cur as AnyObject
            for (const key in cur) {
              // 先判断属性是对象自身的，然后在判断属性值的类型，
              // 根据不同的类型进行不同的判断筛选
              const flag = Object.prototype.hasOwnProperty.call(cur, key)
              const type = typeof cur[key]
              if (flag) {
                if (
                  cur[key] === keyword ||
                  (type === 'string' && cur[key].includes(keyword))
                ) {
                  total.push(cur)
                  break
                }
              }
            }
            return total
          }, [])
          context.emit('filterSearch', [...new Set(temple)])
          break
        case 'interface':
          context.emit('filterSearch', keyword)
          break
        default:
          break
      }
    }
    return {
      labelPosition,
      listQuery,
      testfocus,
      testblur,
      handleResetSearch,
      handleSearchList
    }
  }
})
</script>

<style lang="scss" scoped>
.users-header--toolbar-input {
  width: 170px;
  transition: width 0.5s;
}
</style>
