import request from '@/utils/request'

// 查询流程控件列表
export function listFlowWidget(query) {
  return request({
    url: '/dyna/FlowWidget/list',
    method: 'get',
    params: query
  })
}

// 查询流程控件详细
export function getFlowWidget(id) {
  return request({
    url: '/dyna/FlowWidget/' + id,
    method: 'get'
  })
}

// 新增流程控件
export function addFlowWidget(data) {
  return request({
    url: '/dyna/FlowWidget',
    method: 'post',
    data: data
  })
}

// 修改流程控件
export function updateFlowWidget(data) {
  return request({
    url: '/dyna/FlowWidget',
    method: 'put',
    data: data
  })
}

// 删除流程控件
export function delFlowWidget(id) {
  return request({
    url: '/dyna/FlowWidget/' + id,
    method: 'delete'
  })
}
