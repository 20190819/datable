export default {
  methods: {
    setDatableFilter (key, val, tableRefName = 'table') {
      this.$set(this.$refs[tableRefName].tablefilter, key, val)
      this.$refs[tableRefName].loadTableData(true)
    },
    refreshDatable (tableRefName = 'table') {
      this.$refs[tableRefName].loadTableData()
    },
    getDatableMultipleSelection (tableRefName = 'table') {
      return this.$refs[tableRefName].multipleSelection
    },
    removeDatableRow (index, tableRefName = 'table') {
      return this.$refs[tableRefName].deleteRow(index)
    }
  }
}
