<script setup lang="ts">
import ArtistaList from '@/components/artista/ArtistaList.vue'
import ArtistaSave from '@/components/artista/ArtistaSave.vue'
import Button from 'primevue/button'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const artistaListRef = ref<typeof ArtistaList | null>(null)
const artistaEdit = ref<any>(null)

function handleCreate() {
  artistaEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(artista: any) {
  artistaEdit.value = artista
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  artistaListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <h2>Artistas</h2>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <ArtistaList ref="artistaListRef" @edit="handleEdit" />
    <ArtistaSave
      :mostrar="mostrarDialog"
      :artista="artistaEdit"
      :modoEdicion="!!artistaEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped></style>
