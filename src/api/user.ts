/*
 * @Author: 陈富贵
 * @Date: 2024-03-06 17:35:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-06 20:59:06
 * @Description: 请填写简介
 */
import delay from '../utils/delay';
import orgApi from './org';

interface User {
  orgId: string;
  id: string;
  name: string;
}
const getUserData = (orgId: string): User[] => {
  const count = Math.floor(Math.random() * 20)
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        orgId: orgId,
        id: Math.random() + '',
        name: (Math.random() + 1).toString(36).substring(7)
      }
    })
}

const _userList: User[] = []

const getUsers = async () => {
  if (_userList.length === 0) {
    const orgs = await orgApi.getOrgs()

    for (const org of orgs) {
      const oneOrgUsers = await delay(getUserData(org.id))
      _userList.push(...oneOrgUsers)
    }

  }
  return _userList

}


const query = async (params: Partial<User & { orgId: string }>) => {
  const userList = await getUsers()
  const { id, name, orgId } = params
  return userList.filter(user => {
    if (id) {
      return user.id === id
    }
    if (name) {
      return user.name === name
    }
    if (orgId) {
      return user.orgId === orgId
    }
  })
}

const userApi = {
  query,
  getUsers
}

export default userApi
