export default {
  methods: {
    setDatableFilter (tablefilters, tableRefName = 'table') {
      for (let key in tablefilters) {
        this.$set(this.$refs[tableRefName].tablefilter, key, tablefilters[key])
      }
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
