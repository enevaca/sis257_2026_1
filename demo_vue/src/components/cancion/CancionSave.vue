<script setup lang="ts">
import type { Album } from '@/models/album'
import type { Artista } from '@/models/artista'
import type { Cancion } from '@/models/cancion'
import type { Genero } from '@/models/genero'
import http from '@/plugins/axios'
import { InputMask, Select, Textarea } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'canciones'
const props = defineProps({
  mostrar: Boolean,
  cancion: {
    type: Object as () => Cancion,
    default: () => ({}) as Cancion,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const generos = ref<Genero[]>([])
const artistas = ref<Artista[]>([])
const albumes = ref<Album[]>([])

const cancion = ref<Cancion>({ ...props.cancion })
const idArtista = ref<number>(0)

watch(
  () => props.cancion,
  (newVal) => {
    cancion.value = { ...newVal }
  },
)

async function obtenerGeneros() {
  generos.value = await http.get('generos').then((res) => res.data)
}

async function obtenerArtistas() {
  artistas.value = await http.get('artistas').then((res) => res.data)
}

async function obtenerAlbumes() {
  albumes.value = await http.get(`albumes/artista/${idArtista.value}`).then((res) => res.data)
}

async function handleSave() {
  try {
    const body = {
      idAlbum: cancion.value.album.id,
      idGenero: cancion.value.genero.id,
      nombre: cancion.value.nombre,
      duracion: cancion.value.duracion,
      tags: cancion.value.tags,
      url: cancion.value.url,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${cancion.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    cancion.value = {} as Cancion
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerGeneros()
      obtenerArtistas()

      if (props.cancion?.id) {
        cancion.value = { ...props.cancion }
        idArtista.value = cancion.value.album.artista.id
        obtenerAlbumes()
      } else {
        idArtista.value = 0
        cancion.value = { genero: { id: 0 }, album: { id: 0 } } as Cancion
      }
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Canción'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="genero" class="font-semibold w-3">Genéros</label>
        <Select
          id="genero"
          v-model="cancion.genero.id"
          :options="generos"
          optionLabel="descripcion"
          optionValue="id"
          class="flex-auto"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="artista" class="font-semibold w-3">Artistas</label>
        <Select
          id="artista"
          v-model="idArtista"
          :options="artistas"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
          @change="obtenerAlbumes"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="album" class="font-semibold w-3">Albumes</label>
        <Select
          id="album"
          v-model="cancion.album.id"
          :options="albumes"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="cancion.nombre"
          class="flex-auto"
          autocomplete="off"
          maxlength="40"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="duracion" class="font-semibold w-3">Duración</label>
        <InputMask
          id="duracion"
          v-model="cancion.duracion"
          class="flex-auto"
          autocomplete="off"
          mask="99:99"
          placeholder="03:42"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="tags" class="font-semibold w-3">Tags</label>
        <InputText
          id="tags"
          v-model="cancion.tags"
          class="flex-auto"
          autocomplete="off"
          maxlength="50"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="url" class="font-semibold w-3">URL</label>
        <Textarea
          id="url"
          v-model="cancion.url"
          class="flex-auto"
          autocomplete="off"
          rows="3"
          maxlength="250"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
