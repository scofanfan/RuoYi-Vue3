<template>
  <div class="allany-container">
    <div class="control-bar">
      <el-select v-model="pipe.condition" style="width: 200px; margin-right: 16px;" :disabled="disabled">
        <el-option label="满足以下所有条件" value="all"/>
        <el-option label="满足以下任一条件" value="any"/>
        <el-option label="不包含以下条件" value="not"/>
      </el-select>
      <el-button v-if="!disabled" type="primary" @click="addCondition('condition')">添加条件</el-button>
      <el-button v-if="!disabled" type="success" @click="addCondition('all_any')">添加子条件</el-button>
      <el-button v-if="!disabled" type="danger" :icon="Delete" circle @click="delSelf"/>
      <!-- 添加保存按钮 -->
      <el-button v-if="!disabled" type="warning" @click="savePipe">保存</el-button>
    </div>
    <div class="conditions-wrapper">
      <!--   侧边显示条   -->
      <div :class="`conditions-wrapper-${pipe.condition}`"></div>
      <div class="conditions-wrapper--conditions">
        <div v-for="(child, idx) in pipe.children" :key="idx" class="conditions-wrapper--condition">
          <biz-rule-all-any v-if="child.type === 'all_any'" :pipe="child" :idx="idx" :attrOptions="attrOptions"
                            :disabled="disabled" @delRule="handleDelRule(idx,child)"/>
          <biz-rule-condition v-else-if="child.type === 'condition'" :pipe="child" :idx="idx"  :attrOptions="attrOptions"
                              :disabled="disabled" @delRule="handleDelCondition(idx,child)" @conditionChange="handleConditionChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue';
import BizRuleCondition from './BizRuleCondition.vue';
import {Delete} from "@element-plus/icons-vue";

defineOptions({
  name: 'BizRuleAllAny'
})

const emit = defineEmits(['delRule']);

const props = defineProps({
  pipe: {
    type: Object,
    default: () => ({
      type: 'all_any',
      condition: 'all',
      children: [],
    })
  },
  attrOptions: {
    type: Array,
    default: () => {
      return []
    }
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
const pipe = ref(props.pipe);

// 初始化 attrOptions 包含“年龄”和“地区”
const attrOptions = ref([
  { label: '年龄', value: 'age' },
  { label: '地区', value: 'region' }
]);

function addCondition(type) {
  if (type === 'all_any') {
    pipe.value.children.push({
      type: 'all_any',
      condition: 'all',
      children: [],
    });
  } else if (type === 'condition') {
    pipe.value.children.push({
      type: 'condition',
      name: '',
      operator: 'eq',
      value: '',
      val_type: 'string',
    });
  }
}

function delSelf() {
  emit('delRule')
}

// 添加保存函数
function savePipe() {
  console.log("保存pipe:", pipe.value.children);
  console.log(JSON.stringify(pipe.value, null, 2));
}

// 删除条件组
const handleDelRule = (idx, child) => {
  pipe.value.children.splice(idx, 1);
}

// 删除条件组中的子数据
const handleDelCondition = (idx, child) => {
  pipe.value.children.splice(idx, 1);
}

const handleConditionChange = (idx, child) => {
  console.log("handleConditionChange", idx, child);
  pipe.value.children[idx] = child;
}

</script>

<style scoped lang="scss">

.allany-container {

  .control-bar {
    display: flex;
    flex-direction: row;
  }

  .conditions-wrapper {
    display: flex;
    flex-direction: row;
  }


  .conditions-wrapper-all {
    width: 4px;
    margin: 5px 20px 0;
    border-radius: 5px;
    transition: background-color 400ms;
    background-color: #67C23A;

    &:hover {
      background-color: #529b2e;
    }
  }


  .conditions-wrapper-any {
    width: 4px;
    margin: 5px 20px 0;
    border-radius: 5px;
    transition: background-color 400ms;
    background-color: #E6A23C;

    &:hover {
      background-color: #b88230;
    }
  }


  .conditions-wrapper-not {
    width: 4px;
    margin: 5px 20px 0;
    border-radius: 5px;
    transition: background-color 400ms;
    background-color: rgb(245, 245, 245);

    &:hover {
      background-color: rgb(144, 147, 153);
    }
  }


  .conditions-wrapper--conditions {
    display: flex;
    flex-direction: column;
  }

  .conditions-wrapper--condition {
    padding-top: 15px;
  }
}
</style>