
<template>
  <el-card class="box-card">
    <!-- 导航 -->
    <div slot="header" class="clearfix">
      <my-bread leve1="权限管理" leve2="权限列表"></my-bread>
    </div>
    <el-table height="400" :data="permissDate" style="width: 100%">
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column label="层级">
        <!-- 要想在这里显示字符串必须用template配合slot-scope -->
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级目录</span>
          <span v-if="scope.row.level==='1'">二级目录</span>
          <span v-if="scope.row.level==='2'">三级目录</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      permissDate: []
    }
  },
  created () {
    // 获取权限列表信息
    this.getPermissDate()
  },
  methods: {
    async getPermissDate () {
      const res = await this.$http.get('rights/list')
      const { meta: { msg, status }, data } = res.data
      if (status === 200) {
        this.$message.success(msg)
        this.permissDate = data
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
</style>
