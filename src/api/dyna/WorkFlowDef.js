import request from '@/utils/request'

// 查询工作流定义列表
export function listWorkFlowDef(query) {
  return request({
    url: '/dyna/WorkFlowDef/list',
    method: 'get',
    params: query
  })
}

// 查询工作流定义详细
export function getWorkFlowDef(id) {
  return request({
    url: '/dyna/WorkFlowDef/' + id,
    method: 'get'
  })
}

// 新增工作流定义
export function addWorkFlowDef(data) {
  return request({
    url: '/dyna/WorkFlowDef',
    method: 'post',
    data: data
  })
}

// 修改工作流定义
export function updateWorkFlowDef(data) {
  return request({
    url: '/dyna/WorkFlowDef',
    method: 'put',
    data: data
  })
}

// 删除工作流定义
export function delWorkFlowDef(id) {
  return request({
    url: '/dyna/WorkFlowDef/' + id,
    method: 'delete'
  })
}
