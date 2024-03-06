<!--
 * @Author: 陈富贵
 * @Date: 2024-03-06 17:38:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-07 01:39:50
 * @Description: 请填写简介
-->

<template>
  <div style="height: 100vh">
    <div class="orgTree-header">
      <span>部门</span>
      <el-icon style="cursor: pointer">
        <Plus />
      </el-icon>
    </div>
    <el-tree
      style="max-width: 600px"
      :props="props"
      :load="loadNode"
      lazy
      @node-click="handleNodeClick"
      :default-expand-all='true'
    />
  </div>
</template>

<script lang="ts" setup>
import type Node from "element-plus/es/components/tree/src/model/node";
import orgApi from "../api/org.ts";
import { Org } from "../api/org.ts";
import { userStore } from "../store/user.ts";
const _userStore = userStore()
import userApi from "../api/user.ts";

const props = {
  label: "label",
  children: "zones",
  isLeaf: "leaf",
};

const loadNode = async (node: Node, resolve: (data: Org[]) => void) => {
  if (node.level === 0) {
    return resolve([{ label: "厦门嗨行旅游" }]);
  }
  if (node.level > 1) {
    return resolve([]);
  } else {
    resolve(
      (await orgApi.getOrgs()).map((org) => {
        return { ...org, leaf: true };
      })
    );
  }
};

const handleNodeClick = async (data: Org) => {
  if (data.id) {
    const res = await userApi.getUsers();
    _userStore.set_selectItemOrgs(res)
    const filterRes = res.filter((item) => item.orgId === data.id);
     _userStore.set_table(filterRes)
  }
};
</script>

<style scoped>
.orgTree-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 18px;
  border-bottom: 2px solid #ccc;
  height: 50px;
}
</style>
