import request from '@/utils/request'

// 查询流程内容列表
export function listWorkFlowContent(query) {
  return request({
    url: '/dyna/WorkFlowContent/list',
    method: 'get',
    params: query
  })
}

// 查询流程内容详细
export function getWorkFlowContent(id) {
  return request({
    url: '/dyna/WorkFlowContent/' + id,
    method: 'get'
  })
}

// 新增流程内容
export function addWorkFlowContent(data) {
  return request({
    url: '/dyna/WorkFlowContent',
    method: 'post',
    data: data
  })
}

// 修改流程内容
export function updateWorkFlowContent(data) {
  return request({
    url: '/dyna/WorkFlowContent',
    method: 'put',
    data: data
  })
}

// 删除流程内容
export function delWorkFlowContent(id) {
  return request({
    url: '/dyna/WorkFlowContent/' + id,
    method: 'delete'
  })
}
