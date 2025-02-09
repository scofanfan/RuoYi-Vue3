<template>
  <div class="bizrulecondition-container">
    <el-select v-model="pipe.name" placeholder="字段名称" style="width: 150px; margin-right: 16px;" clearable
               :disabled="disabled">
      <el-option v-for="item in attrOptions" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <el-select v-model="pipe.operator" style="width: 90px; margin-right: 16px;" :disabled="disabled">
      <el-option label="==" value="eq"/>
      <el-option label="!=" value="neq"/>
      <el-option label="<" value="lt"/>
      <el-option label=">" value="gt"/>
      <el-option label="<=" value="lte"/>
      <el-option label=">=" value="gte"/>
      <el-option label="in" value="in"/>
      <el-option label="not in" value="not_in"/>
    </el-select>
    <el-badge
        :value="pipe.val_type === 'string' ? '字符串' : '数字'"
        :type="pipe.val_type === 'string' ? 'info' : 'success'"
        @click.native="switchVarType($event, pipe)"
        style="margin-right: 50px;"
        :disabled="disabled"
    >
      <el-input
          v-model="pipe.value"
          placeholder="字段值"
          style="width: 150px;"
          clearable
          :disabled="disabled"
      />
    </el-badge>
    <el-button type="danger" :icon="Delete" circle @click="delSelf" :disabled="disabled"/>

  </div>
</template>

<script setup>
import {defineProps, ref, watch} from 'vue';
import {Delete} from "@element-plus/icons-vue";
import {deepClone} from "@/utils/utils.js";

const emit = defineEmits(['delRule', 'conditionChange']);


const props = defineProps({
  pipe: Object,
  idx: Number,
  attrOptions: Array,
  disabled: Boolean
});
const pipe = ref({});

watch(() => props.pipe, (newData) => {
  if (!newData) return
  pipe.value = deepClone(newData)
}, {
  deep: true,
  immediate: true
})
//pipe是个响应式变量，它本身是不会变的，只有它的属性会变，所以这里要用watch监听pipe.value的变化
watch(() => pipe.value, (newData) => {
  console.log('pipe.value', pipe.value)
  ruleChange()
}, {
  deep: true,
  immediate: true
})


function switchVarType(e, kv) {
  if (String(e.target.tagName).toUpperCase() === 'SUP') {
    kv.val_type = kv.val_type === 'number' ? 'string' : 'number';
  }
}

function delSelf() {
  emit('delRule')
}

function ruleChange() {
  console.log('ruleChange pipe.value', pipe.value)
  emit('conditionChange',props.idx, pipe.value)
}
</script>

<style lang="scss" scoped>
.bizrulecondition-container {
  display: flex;
  flex-direction: row;

  .el-badge__content {
    transition: 400ms;
    user-select: none;
  }

  .el-badge__content:hover {
    cursor: pointer;
  }
}
</style>