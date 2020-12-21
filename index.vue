<template>
  <div>
    <!-- 列表 -->
    <el-table
      :ref="tablerefname"
      :data="tabledata"
      :size="tablesize"
      border
      v-loading="tableloading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="hascheckbox" type="selection" width="55">
      </el-table-column>
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.minwidth"
        :show-overflow-tooltip="item.overflow || true"
        :fixed="item.fixed || false"
        :align="item.align || `center`"
      >
        <template slot-scope="scope">
          <table-extend
            v-if="`render` in item"
            :index="scope.$index"
            :row="scope.row"
            :render="item.render"
          ></table-extend>
          <template v-else
            ><span>{{ scope.row[item.prop] }}</span></template
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="paginationFooter">
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="pagesizes"
          :page-size="limit"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
const TableExtend = {
  functional: true,
  props: {
    index: Number,
    row: Object,
    render: Function
  },
  render: function (h, context) {
    const params = {
      index: context.props.index,
      row: context.props.row
    }
    return context.props.render(h, params)
  }
}
export default {
  name: 'DATABLE',
  props: {
    tablerefname: {
      type: String,
      default: 'tables'
    },
    tablesize: {
      type: String,
      default: 'small'
    },
    columns: Array,
    listapi: Function,
    showpagenation: {
      type: Boolean,
      default: true
    },
    pagesizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 50]
      }
    },
    hascheckbox: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TableExtend
  },
  data () {
    return {
      tableloading: false,
      tabledata: [],
      tablefilter: {},
      multipleSelection: [],
      total: 0,
      page: 1,
      limit: 10
    }
  },
  mounted () {
    this.loadTableData()
  },
  methods: {
    loadTableData (restart = false) {
      this.tableloading = true
      if (this.showpagenation) {
        if (restart) {
          this.page = 1
          this.limit = 10
        }
      }
      var params = { page: this.page, limit: this.limit, ...this.tablefilter }
      this.listapi(params).then(res => {
        this.total = res.cnt
        this.tabledata = res.list
        this.tableloading = false
        console.log('loadTableData', this.tabledata)
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.limit = val
      this.loadTableData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.loadTableData()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    deleteRow (index) {
      this.tabledata.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.paginationFooter {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
