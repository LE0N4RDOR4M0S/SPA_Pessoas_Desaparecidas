<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePeopleApi } from '@/composables/usePessoaApi'
import PeopleList from '@/components/domain/PeopleList.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import BasePagination from '@/components/base/BasePagination.vue'


const nome = ref('')
const nomeBusca = ref('')
const status = ref('')
const faixaIdadeInicial = ref(0)
const faixaIdadeFinal = ref(0)
const sexo = ref('')

const faixasIdade = [
  { label: 'Todas', inicial: 0, final: 0 },
  { label: '0-12', inicial: 0, final: 12 },
  { label: '13-17', inicial: 13, final: 17 },
  { label: '18-29', inicial: 18, final: 29 },
  { label: '30-44', inicial: 30, final: 44 },
  { label: '45-59', inicial: 45, final: 59 },
  { label: '60+', inicial: 60, final: 120 },
]

const { dados, isLoading, error, perPage, fetchPeople, changePage, changePerPage } = usePeopleApi()

function getFilters() {
  return {
    nome: nomeBusca.value,
    status: status.value,
  }
}

fetchPeople(0, perPage.value, getFilters(), faixaIdadeInicial.value, faixaIdadeFinal.value, sexo.value)

watch([status, faixaIdadeInicial, faixaIdadeFinal, sexo], () => {
  fetchPeople(0, perPage.value, getFilters(), faixaIdadeInicial.value, faixaIdadeFinal.value, sexo.value)
})

const handleNomeSearch = () => {
  nomeBusca.value = nome.value
  fetchPeople(0, perPage.value, getFilters(), faixaIdadeInicial.value, faixaIdadeFinal.value, sexo.value)
}

const handleNomeKey = (e: KeyboardEvent) => {
  if (e.key === 'Enter') handleNomeSearch()
}

const handleFaixaIdadeChange = (event: Event) => {
  const idx = Number((event.target as HTMLSelectElement).value)
  faixaIdadeInicial.value = faixasIdade[idx].inicial
  faixaIdadeFinal.value = faixasIdade[idx].final
}

const handlePageChange = (newPage: number) => {
  changePage(newPage - 1, getFilters(), faixaIdadeInicial.value, faixaIdadeFinal.value, sexo.value)
}

const handlePerPageChange = (event: Event) => {
  const value = Number((event.target as HTMLSelectElement).value)
  changePerPage(value, getFilters(), faixaIdadeInicial.value, faixaIdadeFinal.value, sexo.value)
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
            @keyup="handleNomeKey"
          />
          <button @click="handleNomeSearch" class="ml-2 px-3 py-1 bg-gray-600 text-white rounded">OK</button>
        </div>
        <div>
          <label for="status" class="font-medium">Status:</label>
          <select id="status" v-model="status" class="border rounded px-2 py-1 ml-2">
            <option value="">Todos</option>
            <option value="DESAPARECIDO">Desaparecido(a)</option>
            <option value="LOCALIZADO">Localizado(a)</option>
          </select>
        </div>
        <div>
          <label for="faixaIdade" class="font-medium">Faixa Etária:</label>
          <select id="faixaIdade" @change="handleFaixaIdadeChange" class="border rounded px-2 py-1 ml-2">
            <option v-for="(faixa, idx) in faixasIdade" :key="faixa.label" :value="idx">{{ faixa.label }}</option>
          </select>
        </div>
        <div>
          <label for="sexo" class="font-medium">Sexo:</label>
          <select id="sexo" v-model="sexo" class="border rounded px-2 py-1 ml-2">
            <option value="">Todos</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
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
