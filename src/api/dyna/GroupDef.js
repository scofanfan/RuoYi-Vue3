import request from '@/utils/request'

// 查询组定义列表
export function listGroupDef(query) {
  return request({
    url: '/dyna/GroupDef/list',
    method: 'get',
    params: query
  })
}

// 查询组定义详细
export function getGroupDef(id) {
  return request({
    url: '/dyna/GroupDef/' + id,
    method: 'get'
  })
}

// 新增组定义
export function addGroupDef(data) {
  return request({
    url: '/dyna/GroupDef',
    method: 'post',
    data: data
  })
}

// 修改组定义
export function updateGroupDef(data) {
  return request({
    url: '/dyna/GroupDef',
    method: 'put',
    data: data
  })
}

// 删除组定义
export function delGroupDef(id) {
  return request({
    url: '/dyna/GroupDef/' + id,
    method: 'delete'
  })
}
