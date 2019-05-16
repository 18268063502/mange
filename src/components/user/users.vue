
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
          <el-button type="primary" @click="dialogFormVisibleAdd=true;form={}">添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table highlight-current-row size="small" :data="usersList">
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{scope.row.create_time | DateFormat}}</template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeSwich(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
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
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" :disabled="true" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="editData()">修 改</el-button>
      </div>
    </el-dialog>

    <!-- 分配用户角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleCharacter">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">{{form.username}}</el-form-item>
        <el-form-item label="分配角色" label-width="100px">
          <el-select v-model="characterListDateID">
            <el-option disabled label="请选择" :value="-1"></el-option>
            <el-option
              v-for="(item,i) of characterList"
              :label="item.roleName"
              :key="i"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleCharacter = false">取 消</el-button>
        <el-button type="primary" @click="usecharacter()">分 配</el-button>
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
      pagesize: 4,
      usersList: [],
      total: -1,
      dialogFormVisibleAdd: false,
      dialogFormVisibleSet: false,
      dialogFormVisibleCharacter: false,
      formLabelWidth: '100px',
      characterList: [],
      characterListDateID: -1,
      userid: '',
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
    // 分配角色
    async usecharacter () {
      const distribution = await this.$http.put(`users/${this.userid}/role`, {
        rid: this.characterListDateID
      })
      const { meta: { msg, status } } = distribution.data
      if (status === 200) {
        this.$message({
          type: 'success',
          message: msg
        })
        this.dialogFormVisibleCharacter = false
      } else {
        this.$message({
          type: 'info',
          message: msg
        })
      }
    },
    // 分配角色弹窗
    async distributionDialogDialog (scope) {
      const self = this
      self.form = scope
      self.userid = scope.id
      // 请求角色列表
      const resList = await self.$http.get('/roles')
      self.characterList = resList.data.data
      // 根据id查询用户信息
      const resIDmessage = await self.$http.get(`users/${scope.id}`)
      self.characterListDateID = resIDmessage.data.data.rid
      // console.log(self.characterListDateID)

      self.dialogFormVisibleCharacter = true
    },
    async changeSwich (scope) {
      const res = await this.$http.put(`users/${scope.id}/state/${scope.mg_state}`)
      const { meta: { msg, status } } = res.data
      if (status === 200) {
        this.$message.success(msg)
        this.getUserList()
      } else {
        this.$message.warning(msg)
      }
    },
    // 修改用户
    async editData () {
      const self = this
      const res = await self.$http.put(`users/${self.form.id}`, self.form)
      this.dialogFormVisibleSet = false
      this.getUserList()
      console.log(res)
    },
    // 编辑用户
    editUser (form) {
      this.form = form
      // console.log(this.form)
      this.dialogFormVisibleSet = true
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
      // console.log(`每页 ${val} 条控制每页选项卡几条数据`)
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
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
      const { data: { users, total }, meta: { status } } = res.data
      if (status === 200) {
        // console.log(msg)
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
