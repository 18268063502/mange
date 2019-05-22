<template>
  <el-card class="box-card">
    <my-bread leve1="权限管理" leve2="角色列表"></my-bread>
    <el-row>
      <el-button class="mt" type="primary" plain>添加角色</el-button>
    </el-row>
    <el-table height="400" :data="permissDate" style="width: 100%">
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="authName" label="角色名称"></el-table-column>
      <el-table-column prop="authName" label="角色描述"></el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button
              size="mini"
              plain
              type="primary"
              icon="el-icon-edit"
              @click="editUser(scope.row)"
              circle
            ></el-button>
            <el-button
              size="mini"
              plain
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.row.id)"
              circle
            ></el-button>
            <el-button
              size="mini"
              plain
              type="success"
              icon="el-icon-check"
              @click="distributionDialogDialog(scope.row)"
              circle
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>
.mt {
  margin-top: 20px;
}
</style>
