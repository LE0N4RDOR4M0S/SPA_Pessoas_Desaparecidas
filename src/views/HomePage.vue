<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePeopleApi } from '@/composables/usePessoaApi'
import PeopleList from '@/components/domain/PeopleList.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import BasePagination from '@/components/base/BasePagination.vue'

const nome = ref('')
const nomeBusca = ref('')
const status = ref('')
const faixaIdade = ref(0)
const sexo = ref('')
const showAdvanced = ref(false)

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
  const faixa = faixasIdade[faixaIdade.value]
  return {
    nome: nomeBusca.value,
    status: status.value,
    faixaIdadeInicial: faixa.inicial,
    faixaIdadeFinal: faixa.final,
    sexo: sexo.value,
  }
}

fetchPeople(0, perPage.value, getFilters())

watch([status, faixaIdade, sexo], () => {
  if (showAdvanced.value) {
    fetchPeople(0, perPage.value, getFilters())
  }
})

const handleNomeSearch = () => {
  nomeBusca.value = nome.value
  fetchPeople(0, perPage.value, getFilters())
}

const handleNomeKey = (e: KeyboardEvent) => {
  if (e.key === 'Enter') handleNomeSearch()
}

const handleFaixaIdadeChange = (event: Event) => {
  faixaIdade.value = Number((event.target as HTMLSelectElement).value)
}

const handlePageChange = (newPage: number) => {
  changePage(newPage - 1, getFilters())
}

const handlePerPageChange = (event: Event) => {
  const value = Number((event.target as HTMLSelectElement).value)
  changePerPage(value, getFilters())
}
</script>

<template>
  <main class="container mx-auto px-2 py-2 sm:px-6 sm:py-6 w-full font-sans">
    <div class="mb-6 sm:mb-8">
      <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">Registros Atuais</h2>
    </div>
    <form
      @submit.prevent="handleNomeSearch"
      class="mb-4 grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 w-full"
    >
      <div class="flex flex-col">
        <label for="nome" class="font-medium mb-1">Nome:</label>
        <div class="flex">
          <input
            id="nome"
            v-model="nome"
            type="text"
            class="border rounded-l px-3 py-2 w-full text-base sm:text-sm"
            placeholder="Buscar por nome"
            @keyup="handleNomeKey"
          />
          <button
            type="submit"
            class="px-4 py-2 bg-gray-600 text-white rounded-r text-base sm:text-sm"
          >
            OK
          </button>
        </div>
      </div>

      <div class="flex flex-col">
        <label for="perPage" class="font-medium mb-1">Pessoas por página:</label>
        <select
          id="perPage"
          :value="perPage"
          @change="handlePerPageChange"
          class="border rounded px-3 py-2 w-full text-base sm:text-sm"
        >
          <option v-for="n in [12, 24, 48, 96]" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <!-- Botão busca avançada -->
      <div class="flex flex-col justify-end">
        <button
          type="button"
          @click="showAdvanced = !showAdvanced"
          class="flex items-center gap-1 text-base sm:text-sm text-gray-600 hover:text-primary-700 bg-transparent border-0 shadow-none px-3 py-2 transition w-full"
          style="box-shadow: none"
        >
          <span>
            {{ showAdvanced ? 'Ocultar busca avançada' : 'Busca avançada' }}
          </span>
          <svg
            :class="['transition-transform duration-300', showAdvanced ? 'rotate-180' : 'rotate-0']"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <!-- Espaço para alinhar em grid -->
      <div class="hidden sm:block"></div>

      <!-- Filtros avançados -->
      <template v-if="showAdvanced">
        <div class="flex flex-col">
          <label for="status" class="font-medium mb-1">Status:</label>
          <select id="status" v-model="status" class="border rounded px-3 py-2 w-full text-base sm:text-sm">
            <option value="">Todos</option>
            <option value="DESAPARECIDO">Desaparecido(a)</option>
            <option value="LOCALIZADO">Localizado(a)</option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="faixaIdade" class="font-medium mb-1">Faixa Etária:</label>
          <select
            id="faixaIdade"
            @change="handleFaixaIdadeChange"
            class="border rounded px-3 py-2 w-full text-base sm:text-sm"
          >
            <option v-for="(faixa, idx) in faixasIdade" :key="faixa.label" :value="idx">
              {{ faixa.label }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="sexo" class="font-medium mb-1">Sexo:</label>
          <select id="sexo" v-model="sexo" class="border rounded px-3 py-2 w-full text-base sm:text-sm">
            <option value="">Todos</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
          </select>
        </div>
        <div class="hidden sm:block"></div>
      </template>
    </form>


    <div v-if="isLoading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>

    <div v-else-if="error" class="text-center bg-red-100 text-red-700 p-4 rounded-lg">
      <p><strong>Ocorreu um erro:</strong> {{ error }}</p>
    </div>

    <PeopleList v-if="dados" :people="dados.content" />

    <BasePagination
      v-if="dados"
      :current-page="dados.page + 1"
      :total-pages="dados.totalPages"
      @page-changed="handlePageChange"
    />

  </main>
</template>
