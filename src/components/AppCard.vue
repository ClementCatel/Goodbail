<template>
  <div :class="{ clickable: clickable }" class="card white">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    clickable: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.card {
  /* max-width: 800px; */
  padding: 20px;
  margin-bottom: 24px;
  border-radius: 0.375rem;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
}
.clickable {
  cursor: pointer;
  transition: all 0.2s linear;
}
.clickable:hover {
  transform: scale(1.01);
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.2),
    0 1px 15px 0 rgba(136, 152, 170, 0.17);
}
</style>
