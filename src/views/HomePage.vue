<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePeopleApi } from '@/composables/usePessoaApi'
import PeopleList from '@/components/domain/PeopleList.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import BasePagination from '@/components/base/BasePagination.vue'

const nome = ref('')
const status = ref('')

const { dados, isLoading, error, perPage, fetchPeople, changePage, changePerPage } = usePeopleApi()

fetchPeople(0, perPage.value, { nome: nome.value, status: status.value })

watch([nome, status], () => {
  fetchPeople(0, perPage.value, { nome: nome.value, status: status.value })
})

const handlePageChange = (newPage: number) => {
  changePage(newPage - 1, { nome: nome.value, status: status.value })
}

const handlePerPageChange = (event: Event) => {
  const value = Number((event.target as HTMLSelectElement).value)
  changePerPage(value, { nome: nome.value, status: status.value })
}
</script>

<template>
  <main class="container mx-auto p-6">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-800">Registros Atuais</h2>
    </div>

    <div v-if="isLoading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>

    <div v-else-if="error" class="text-center bg-red-100 text-red-700 p-4 rounded-lg">
      <p><strong>Ocorreu um erro:</strong> {{ error }}</p>
    </div>

    <div v-else-if="dados"> 
      <div class="mb-4 flex flex-wrap items-center gap-4">
        <div>
          <label for="nome" class="font-medium">Nome:</label>
          <input
            id="nome"
            v-model="nome"
            type="text"
            class="border rounded px-2 py-1 ml-2"
            placeholder="Buscar por nome"
          />
        </div>
        <div>
          <label for="status" class="font-medium">Status:</label>
          <select id="status" v-model="status" class="border rounded px-2 py-1 ml-2">
            <option value="">Todos</option>
            <option value="DESAPARECIDO">Desaparecido</option>
            <option value="LOCALIZADO">Localizado</option>
          </select>
        </div>
        <div>
          <label for="perPage" class="font-medium">Pessoas por página:</label>
          <select
            id="perPage"
            :value="perPage"
            @change="handlePerPageChange"
            class="border rounded px-2 py-1 ml-2"
          >
            <option v-for="n in [12, 24, 48, 96]" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
      </div>
      <PeopleList :people="dados.content" />

      <BasePagination
        :current-page="dados.page + 1"
        :total-pages="dados.totalPages"
        @page-changed="handlePageChange"
      />
    </div>
  </main>
</template>
