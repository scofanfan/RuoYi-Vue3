<template>
  <div style="width: 100%; height: 800px;">
    <VueFlow

        v-model="flowElement"

        :style="{ background: 'transparent' }"

        :default-zoom="1"

        fit-view-on-init

        @nodeClick="nodeClickHandler"
        @nodeContextMenu="onNodeRightClick"

    />
    <RightMenu
        v-if="showRightMenu"
        :visible="showRightMenu"
        :menu-top="menuPosition.top"
        :menu-left="menuPosition.left"
        @menuItemSelected="handleMenuItemSelection"
        @closeMenu="showRightMenu = false"
    />
  </div>
</template>

<script>
import {VueFlow} from '@vue-flow/core';
import RightMenu from '@/components/Flow/RightMenu.vue';

export default {
  components: {
    VueFlow,
    RightMenu,
  },
  data() {
    return {
      // 使用ref包装基本类型和对象，使其成为响应式的
      flowElement: ref([
        // 节点和边的定义...
        // Nodes
        // An input node, specified by using `type: 'input'`
        {id: '1', type: 'input', label: 'Node 1', position: {x: 250, y: 5}},

        // Default nodes, you can omit `type: 'default'`
        {id: '2', label: 'Node 2', position: {x: 100, y: 100},},
        {id: '3', label: 'Node 3', position: {x: 400, y: 100}},

        // An output node, specified by using `type: 'output'`
        {id: '4', type: 'output', label: 'Node 4', position: {x: 400, y: 200}},

        // Edges
        // Most basic edge, only consists of an id, source-id and target-id
        {id: 'e1-3', source: '1', target: '3'},

        // An animated edge
        {id: 'e1-2', source: '1', target: '2', animated: true},
      ]),
      showRightMenu: false,
      menuPosition: { top: 0, left: 0 }
    };
  },
  methods: {
    nodeClickHandler(props) {
      const node = props.node;
      console.log(node.id);
    },
    onNodeRightClick(props) {
      props.event.preventDefault();
      console.log('右键点击了节点:', props.node.id);

      // 注意：这里不能直接使用const重新声明showRightMenu和menuPosition，而应该通过.value来修改ref的值
      this.showRightMenu = true;
      const node = props.node;
      this.menuPosition = {
        top: props.event.clientY,
        // top: node.computedPosition.y + node.dimensions.height,
        left: props.event.clientX,
        // left: node.computedPosition.x + node.dimensions.width,
      };
      console.log('右键 menuPosition:', this.menuPosition);
      console.log('右键 node.computedPosition:', props.node.computedPosition);

    },
    handleMenuItemSelection(option) {
      console.log('Selected option:', option);
      // 处理菜单项点击逻辑
    },
  },
};

</script>

<style>
/* these are necessary styles for vue flow */
@import "@vue-flow/core/dist/style.css";

/* this contains the default theme, these are optional styles */
@import "@vue-flow/core/dist/theme-default.css";
</style>