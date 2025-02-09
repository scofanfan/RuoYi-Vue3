<!-- RightMenu.vue -->
<template>
  <div v-if="visible" class="right-menu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }">
    <ul>
      <li @click="handleMenuItemClick('option1')">选项1</li>
      <li @click="handleMenuItemClick('option2')">选项2</li>
      <!-- 更多菜单项 -->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    menuTop: Number,
    menuLeft: Number,
  },
  methods: {
    handleMenuItemClick(option) {
      this.$emit('menuItemSelected', option);
      this.$emit('closeMenu');
    },
  },
};
</script>

<style scoped>
.right-menu {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style-type: none;
  padding: 5px;
  z-index: 1000;
}
</style>
