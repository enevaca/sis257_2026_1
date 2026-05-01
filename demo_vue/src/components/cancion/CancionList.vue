<script lang="ts" setup>
import type { Cancion } from '@/models/cancion'
import http from '@/plugins/axios'
import { Column, DataTable, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'canciones'
const canciones = ref<Cancion[]>([])
const emit = defineEmits(['edit'])
const cancionDelete = ref<Cancion | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  canciones.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(cancion: Cancion) {
  emit('edit', cancion)
}

function mostrarEliminarConfirm(cancion: Cancion) {
  cancionDelete.value = cancion
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${cancionDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

const cancionesFiltrados = computed(() => {
  return canciones.value.filter(
    (cancion) =>
      cancion.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cancion.album.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cancion.album.artista.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cancion.genero.descripcion.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="col-7 pl-0 mt-3">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText
          v-model="busqueda"
          type="text"
          placeholder="Buscar por canción, álbum o artista"
        />
      </InputGroup>
    </div>
    <DataTable
      :value="cancionesFiltrados"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 25]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} a {last} de {totalRecords}"
      scrollable
      scroll-height="flex"
      tableStyle="min-width: 50rem"
    >
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text />
      </template>
      <Column field="nombre" header="Nombre" sortable></Column>
      <Column header="Artista" sortable>
        <template #body="{ data }">
          <div class="flex items-center gap-2">
            <img
              :alt="data.album.artista.nombre"
              :src="`${data.album.artista.fotografia}`"
              style="width: 32px"
            />
            <span>{{ data.album.artista.nombre }}</span>
          </div>
        </template>
      </Column>
      <Column field="album.nombre" header="Album" sortable></Column>
      <Column field="genero.descripcion" header="Género" sortable></Column>
      <Column field="duracion" header="Duración" sortable></Column>
      <Column field="tags" header="Tags" sortable></Column>
      <Column header="Acciones" frozen align-frozen="right" style="min-width: 160px">
        <template #body="{ data }">
          <Button
            icon="pi pi-youtube"
            aria-label="Enlace"
            text
            as="a"
            :href="data.url"
            target="_blank"
          />
          <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(data)" />
          <Button
            icon="pi pi-trash"
            aria-label="Eliminar"
            text
            @click="mostrarEliminarConfirm(data)"
          />
        </template>
      </Column>
    </DataTable>
    <table v-if="false">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Artista</th>
          <th>Album</th>
          <th>Género</th>
          <th>Duración</th>
          <th>Tags</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cancion, index) in cancionesFiltrados" :key="cancion.id">
          <td>{{ index + 1 }}</td>
          <td>{{ cancion.nombre }}</td>
          <td>{{ cancion.album.artista.nombre }}</td>
          <td>{{ cancion.album.nombre }}</td>
          <td>{{ cancion.genero.descripcion }}</td>
          <td>{{ cancion.duracion }}</td>
          <td>{{ cancion.tags }}</td>
          <td>
            <Button
              icon="pi pi-youtube"
              aria-label="Enlace"
              text
              as="a"
              :href="cancion.url"
              target="_blank"
            />
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(cancion)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(cancion)"
            />
          </td>
        </tr>
        <tr v-if="cancionesFiltrados.length === 0">
          <td colspan="4">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
