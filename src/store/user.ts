/*
 * @Author: 陈富贵
 * @Date: 2024-03-06 22:16:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-07 00:46:59
 * @Description: 请填写简介
 */

import { defineStore } from "pinia"

export const userStore = defineStore('userStore', {
  state: () => {
    return {
      table: [],
      selectItemOrgs: []
    }
  },
  actions: {
    set_selectItemOrgs(arr: []) {
      this.selectItemOrgs = arr;
    },
    set_table(arr: []) {
      this.table = arr;
    },
    search_table(arr: []) {
      this.table = [];
      this.table = arr;
    },
    resetTable(){
      this.table  = this.selectItemOrgs
    }
  }
})


