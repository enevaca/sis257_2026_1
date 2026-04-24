<script lang="ts" setup>
import ColorItem from '@/components/ColorItem.vue'
import { ref } from 'vue'

const titulo = ref<string>('Hola SIS257')
const contador = ref<number>(0)
const colores = ref<{ clave: string; valor: string }[]>([
  { clave: 'red', valor: 'Rojo' },
  { clave: 'yellow', valor: 'Amarillo' },
  { clave: 'green', valor: 'Verde' },
  { clave: 'blue', valor: 'Azul' },
])

function incrementar() {
  contador.value++
}
</script>

<template>
  <div>
    <h1>{{ titulo }} - {{ contador }}</h1>
    <button @click="incrementar">Incrementar</button>
    <p v-if="contador % 2 == 0">El contador es par</p>
    <p v-else>El contador es impar</p>
    <ul>
      <ColorItem v-for="(color, index) in colores" :key="index" :color="color" />
    </ul>
  </div>
</template>

<style scoped></style>
