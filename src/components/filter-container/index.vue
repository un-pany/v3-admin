<template>
  <el-card class="filter-container" shadow="never">
    <div>
      <el-form :inline="true" :model="listQuery" size="small" label-width="100px" :label-position="labelPosition">
        <el-form-item>
          <el-input v-model="listQuery.keyword" ref="filter" @focus="testfocus" @blur="testblur" @keyup.enter="handleSearchList" class="input-width users-header--toolbar-input" :placeholder="placeholder" clearable />
        </el-form-item>
        <el-form-item>
          <div>
            <el-button
              style="float:right"
              type="primary"
              @click="handleSearchList()"
              icon="el-icon-search"
              size="small">
              搜索
            </el-button>
            <el-button
              style="float:right;margin-right: 15px"
              @click="handleResetSearch()"
              size="small">
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

<script>
export default {
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
  data() {
    return {
      labelPosition: 'left',
      listQuery: Object.assign({}, this.defaultListQuery)
    }
  },
  emits: ['filterSearch'],
  methods: {
    handleResetSearch() {
      this.listQuery = { ...this.defaultListQuery }
    },
    // 输入框放大缩小回调函数
    testfocus() {
      this.$refs.filter.$el.style.width = 200 + 'px'
    },
    testblur() {
      this.$refs.filter.$el.style.width = 170 + 'px'
    },
    // 筛选工作组信息, 去重
    // 两种类型，通过方法获取或者通过接口获取，默认通过方法获取
    handleSearchList() {
      let { keyword } = this.listQuery
      if (!keyword) {
        this.$emit('filterSearch', '')
        return
      }
      keyword = Number(keyword) || keyword
      let temple
      switch (this.type) {
        case 'function':
          temple = this.data.reduce((total, cur) => {
            for (const key in cur) {
              // 先判断属性是对象自身的，然后在判断属性值的类型，
              // 根据不同的类型进行不同的判断筛选
              const flag = Object.prototype.hasOwnProperty.call(cur, key)
              const type = typeof cur[key]
              if (flag) {
                if ((cur[key] === keyword) || (type === 'string' && cur[key].includes(keyword))) {
                  total.push(cur)
                  break
                }
              }
            }
            return total
          }, [])
          this.$emit('filterSearch', [...new Set(temple)])
          break
        case 'interface':
          this.$emit('filterSearch', keyword)
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.users-header--toolbar-input {
  width: 170px;
  transition: width .5s;
}
</style>
