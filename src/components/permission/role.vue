<template>
  <el-card class="box-card">
    <my-bread leve1="权限管理" leve2="角色列表"></my-bread>
    <el-row>
      <el-button class="mt" type="primary" plain>添加角色</el-button>
    </el-row>
    <!-- 表格 -->
    <el-table highlight-current-row size="small" :data="rolelist">
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="100"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="100"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
      rolelist: []
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async getRoleList () {
      const res = await this.$http.get('roles')
      this.rolelist = res.data.data
      console.log(this.rolelist)
    }
  }
}
</script>

<style>
.mt {
  margin-top: 20px;
}
</style>
