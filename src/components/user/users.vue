<template>
  <el-card class="box-card">
    <!-- 导航 -->
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 用户搜索 -->
    <el-row>
      <el-col>
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="query"
            clearable
            @clear="getUserList()"
            class="input-with-select intput-search"
          >
            <el-button slot="append" @click="searchUserList()" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="primary" @click="dialogFormVisibleAdd=true">添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="usersList">
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{scope.row.create_time | DateFormat}}</template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button
              size="mini"
              plain
              type="primary"
              icon="el-icon-edit"
              @click="editUser(scope.row.id)"
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
            <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off" @keyup.enter.native="addUser()"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleSet">
      <el-form :model="form">
        <el-form-item label="用户id" :label-width="formLabelWidth">
          <el-input v-model="form.id" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off" @keyup.enter.native="editUser()"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSet = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">修 改</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      usersList: [],
      total: -1,
      dialogFormVisibleAdd: false,
      dialogFormVisibleSet: false,
      formLabelWidth: '100px',
      form: {
        id: '',
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 编辑用户
    editUser (userid) {
      this.dialogFormVisibleSet = true
      this.form.id = userid
    },
    // 删除用户
    del (userid) {
      this.$confirm('是否删除此用户', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${userid}`)
        const { meta: { msg, status } } = res.data
        if (status === 200) {
          this.$message({
            type: 'success',
            message: msg
          })
          this.getUserList()
        } else {
          this.$message({
            type: 'info',
            message: msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async addUser () {
      const addres = await this.$http.post('users', this.form)
      const { meta: { msg, status } } = addres.data
      if (status === 201) {
        this.$message.success(msg)
        this.dialogFormVisibleAdd = false
        this.form.username = ''
        this.form.password = ''
        this.form.email = ''
        this.form.mobile = ''
        this.getUserList()
      } else {
        this.$message.error(msg)
      }
    },
    searchUserList () {
      this.getUserList()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条控制每页选项卡几条数据`)
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    async getUserList () {
      const res = await this.$http.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      const { data: { users, total }, meta: { status, msg } } = res.data
      if (status === 200) {
        console.log(msg)
        this.total = total
        this.usersList = users
      }
    }
  }
}
</script>

<style>
.intput-search {
  width: 300px;
}
</style>
