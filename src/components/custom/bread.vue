<template>
  <!-- 封装面包屑组件 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{leve1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{leve2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'my-bread',
  // props: ['leve1', 'leve2'] // 绑定的-使用组件时绑定的属性
  props: {
    leve1: {
      type: String,
      default: '我是默认值'
    },
    leve2: {
      type: String,
      default: '未设置属性'
    }
  }

}

</script>

<style>
</style>
