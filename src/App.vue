<!--
 * @Author: 陈富贵
 * @Date: 2024-03-06 17:34:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-07 01:32:34
 * @Description: 请填写简介
-->

<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-aside width="200px" class="aside">
          <OrgTree />
        </el-aside>
        <el-main>
          <UserTable />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount} from 'vue';
import OrgTree from './components/OrgTree.vue';
import UserTable from './components/UserTable.vue';
import orgApi from './api/org';
</script>

<style >
html{
  overflow: hidden;
}
.el-main {
  padding: 0 !important;
}

.common-layout {
  width: 100%;
  height: 100vh;
}

.aside {
  border: 2px solid #ccc;
}
</style>
