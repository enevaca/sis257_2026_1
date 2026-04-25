<script setup lang="ts">
import type { Artista } from '@/models/artista'
import http from '@/plugins/axios'
import { Textarea } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'artistas'
const props = defineProps({
  mostrar: Boolean,
  artista: {
    type: Object as () => Artista,
    default: () => ({}) as Artista,
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

const artista = ref<Artista>({ ...props.artista })
watch(
  () => props.artista,
  (newVal) => {
    artista.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: artista.value.nombre,
      nacionalidad: artista.value.nacionalidad,
      fotografia: artista.value.fotografia,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${artista.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    artista.value = {} as Artista
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="artista.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nacionalidad" class="font-semibold w-3">Nacionalidad</label>
        <InputText
          id="nacionalidad"
          v-model="artista.nacionalidad"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fotografia" class="font-semibold w-3">Fotografia</label>
        <Textarea
          id="fotografia"
          v-model="artista.fotografia"
          class="flex-auto"
          autocomplete="off"
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
