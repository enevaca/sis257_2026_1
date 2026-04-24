<script lang="ts" setup>
const props = defineProps<{
  color: { clave: string; valor: string }
}>()
</script>

<template>
  <li :style="{ color: props.color.clave, fontFamily: 'Times New Roman' }">
    {{ props.color.valor }}
  </li>
</template>

<style scoped></style>
