<!--
 * @Author: 陈富贵
 * @Date: 2024-03-06 17:38:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-07 01:42:11
 * @Description: 请填写简介
-->

<template>
  <div class="search">
    <el-input
      v-model="search"
      style="width: 240px"
      size="large"
      placeholder="搜索"
      prefix-icon="Search"
    />
  </div>
  <div class="search-table">
    <el-table
      ref="multipleTableRef"
      :data="_userStore.table"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="90vh"
      v-loading="loading"
      element-loading-text="数据加载中..."
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="用户名" prop="name" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <div class="avatar">{{ scope.row.name.slice(0, 2) }}</div>
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="id" width="200" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, watch } from "vue";
import { ElTable } from "element-plus";
import userApi from "../api/user";
import orgApi from "../api/org";
import { userStore } from "../store/user.ts";
const _userStore = userStore();
const search = ref("");
interface User {
  id: string;
  name: string;
}
const loading = ref(true)
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};

const searchFn = (val) => {
  let timer = null;
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    let arr = [];
    _userStore.selectItemOrgs.forEach(async (item) => {
      if (item.name.includes(val)) {
        await arr.push(JSON.parse(JSON.stringify(item)));
      }
    });
    _userStore.search_table(arr);
  }, 500);
};

watch(
  search,
  (newValue, oldValue) => {
    if (newValue !== oldValue && newValue != "") {
      searchFn(newValue);
    } else {
      _userStore.resetTable();
    }
  },
  {
    deep: true,
  }
);

onMounted(async () => {
  const res = await userApi.getUsers();
  _userStore.set_table(res);
  _userStore.set_selectItemOrgs(res);
  loading.value = false
});
</script>

<style scoped>
.search {
  padding: 10px 0 0 20px;
}
.search-table {
  overflow-y: auto;
  height: 90vh;
}
.avatar {
  width: 35px;
  height: 35px;
  background-color: #5aa9fb;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 35px;
  margin-right: 10px;
}
</style>
