/*
 * @Author: 陈富贵
 * @Date: 2024-03-06 17:35:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-07 00:09:58
 * @Description: 请填写简介
 */
import delay from '../utils/delay'
export interface Org {
  id: string
  label: string
}
/** 随机生成部门 */
const getOrgData = (): Org[] => {
  const count = Math.floor(Math.random() * 20)
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        id: Math.random() + '',
        label: "部门 -- " + (Math.random() + 1).toString(36).substring(7),
      }
    })
}

/** 根据id查询部门 */
const query = async (orgId: string) => {
  const orgs = await getOrgs();
  return orgs.find(org => org.id === orgId);
}

/** 部门列表，内存不释放，数据不更新*/
const _orgs: Org[] = [];
/** 获取组织部门列表*/
const getOrgs = async () => {
  if (_orgs.length == 0) {
    const orgs = await delay(getOrgData())
    _orgs.push(...orgs)
  }
  return ([] as Org[]).concat(_orgs)
}


const orgApi = {
  query,
  getOrgs
}

export default orgApi
