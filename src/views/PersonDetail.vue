<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { peopleService } from '@/services/pessoa.service'
import { ocorrenciaService, type OcorrenciaInfo } from '@/services/ocorrencia.service'
import type { PessoaComStatus } from '@/types/pessoa.type'

const route = useRoute()
const pessoa = ref<PessoaComStatus | null>(null)
const isLoading = ref(true)
const error = ref('')


const ocorrencias = ref<OcorrenciaInfo[] | null>(null)
const ocorrenciasLoading = ref(false)
const ocorrenciasError = ref('')
const ocorrenciasShown = ref(4)
const ocorrenciasPageList = computed(() => {
  if (!ocorrencias.value) return []
  return ocorrencias.value.slice(0, ocorrenciasShown.value)
})

onMounted(async () => {
  try {
    isLoading.value = true
    pessoa.value = await peopleService.getPersonById(route.params.id as string)
    if (pessoa.value?.ultimaOcorrencia?.ocoId) {
      ocorrenciasLoading.value = true
      try {
        ocorrencias.value = await ocorrenciaService.getInformacoesDesaparecido(pessoa.value.ultimaOcorrencia.ocoId)
      } catch (e) {
        ocorrenciasError.value = 'Erro ao carregar ocorrências detalhadas.'
      } finally {
        ocorrenciasLoading.value = false
      }
    }
    const ocorrenciasPage = ref(1)
    const ocorrenciasPerPage = ref(4)

    const ocorrenciasTotalPages = computed(() => {
      if (!ocorrencias.value) return 1
      return Math.ceil(ocorrencias.value.length / ocorrenciasPerPage.value) || 1
    })

    const ocorrenciasPageList = computed(() => {
      if (!ocorrencias.value) return []
      const start = (ocorrenciasPage.value - 1) * ocorrenciasPerPage.value
      return ocorrencias.value.slice(start, start + ocorrenciasPerPage.value)
    })
  } catch (e) {
    error.value = 'Erro ao carregar dados da pessoa.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="container mx-auto p-6">
    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></span>
    </div>
    <div v-else-if="error" class="text-center bg-red-100 text-red-700 p-4 rounded-lg">
      <p><strong>Ocorreu um erro:</strong> {{ error }}</p>
    </div>
    <div v-else-if="pessoa" class="bg-white rounded shadow p-6 max-w-2xl mx-auto">
      <div class="flex flex-col md:flex-row gap-6 items-center mb-6">
        <img
          :src="pessoa.urlFoto || '/imagem.png'"
          :alt="`Foto de ${pessoa.nome}`"
          class="w-40 h-40 object-cover rounded-full border-4 border-primary-200 shadow-md bg-neutral-100"
        />
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-neutral-800 mb-1">{{ pessoa.nome }}</h2>
          <span class="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
            :class="{
              'bg-danger-100 text-danger-800': pessoa.status === 'DESAPARECIDO',
              'bg-success-100 text-success-800': pessoa.status === 'LOCALIZADO',
            }"
          >
            {{ pessoa.status }}
          </span>
          <p class="text-neutral-600 mb-1"><strong>Idade:</strong> {{ pessoa.idade > 0 ? pessoa.idade + ' anos' : 'Não informada' }}</p>
          <p class="text-neutral-600 mb-1"><strong>Sexo:</strong> {{ pessoa.sexo }}</p>
          <p class="text-neutral-600 mb-1"><strong>Vivo:</strong> {{ pessoa.vivo ? 'Sim' : 'Não informado' }}</p>
        </div>
      </div>
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-primary-700 mb-2">Última Ocorrência</h3>
        <p class="text-neutral-700"><strong>Local:</strong> {{ pessoa.ultimaOcorrencia.localDesaparecimentoConcat }}</p>
        <p class="text-neutral-700">
          <strong>Data do Desaparecimento:</strong>
          {{
            pessoa.ultimaOcorrencia.dtDesaparecimento
              ? new Date(pessoa.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString('pt-BR')
              : 'Não informado'
          }}
        </p>
        <p v-if="pessoa.ultimaOcorrencia.dataLocalizacao" class="text-neutral-700"><strong>Data de Localização:</strong> {{ pessoa.ultimaOcorrencia.dataLocalizacao }}</p>
        <p class="text-neutral-700"><strong>Encontrado Vivo:</strong> {{ pessoa.ultimaOcorrencia.encontradoVivo === true ? 'Sim' : pessoa.ultimaOcorrencia.encontradoVivo === false ? 'Não' : 'Não informado' }}</p>
        <p class="text-neutral-700"><strong>Informações:</strong> {{ pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao || 'Não informado' }}</p>
        <p class="text-neutral-700"><strong>Vestimentas:</strong> {{ pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || 'Não informado' }}</p>
      </div>
      <div v-if="pessoa.ultimaOcorrencia.listaCartaz && pessoa.ultimaOcorrencia.listaCartaz.length > 0" class="mt-6">
        <h3 class="text-lg font-semibold text-primary-700 mb-2">Cartazes</h3>
        <div class="flex flex-wrap gap-4">
          <a v-for="cartaz in pessoa.ultimaOcorrencia.listaCartaz" :key="cartaz.urlCartaz" :href="cartaz.urlCartaz" target="_blank" class="block">
            <img :src="cartaz.urlCartaz" :alt="cartaz.tipoCartaz" class="w-32 h-40 object-cover rounded shadow hover:scale-105 transition-transform" />
            <span class="block text-xs text-center mt-1">{{ cartaz.tipoCartaz }}</span>
          </a>
        </div>
      </div>
    </div>
    <div v-if="pessoa && pessoa.ultimaOcorrencia.ocoId" class="mt-8">
      <h3 class="text-lg font-semibold text-primary-700 mb-2">Ocorrências Relacionadas</h3>
      <div v-if="ocorrenciasLoading" class="text-neutral-500">Carregando ocorrências...</div>
      <div v-else-if="ocorrenciasError" class="text-red-600">{{ ocorrenciasError }}</div>
      <div v-else-if="ocorrencias && ocorrencias.length > 0">
        <div class="flex flex-col gap-6">
          <div v-for="oco in ocorrenciasPageList" :key="oco.id" class="bg-white rounded-lg shadow-md p-5 flex flex-col gap-3 border border-neutral-200 hover:shadow-lg transition-shadow">
          <div class="flex items-center gap-3 mb-1">
            <span class="inline-flex items-center px-2 py-1 bg-neutral-100 text-primary-700 rounded-full text-xs font-semibold">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              {{ new Date(oco.data).toLocaleDateString('pt-BR') }}
            </span>
            <span class="ml-auto text-xs text-neutral-500">#{{ oco.ocoId }}</span>
          </div>
          <div class="mb-1">
            <span class="font-bold text-neutral-700">Informação:</span>
            <span class="ml-1">{{ oco.informacao }}</span>
          </div>
          <div v-if="oco.anexos && oco.anexos.length > 0" class="flex flex-wrap gap-2 mt-2">
            <span class="font-bold text-neutral-700 w-full">Anexos:</span>
            <a v-for="anexo in oco.anexos" :key="anexo" :href="anexo" target="_blank"
              class="flex items-center gap-2 px-3 py-2 bg-primary-50 border border-primary-200 rounded shadow text-primary-700 hover:bg-primary-100 hover:text-primary-900 transition-colors text-xs font-medium">
              <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a2 2 0 10-2.828-2.828z"/></svg>
              <span class="truncate max-w-[120px]">Arquivo</span>
            </a>
          </div>
          </div>
        </div>
        <div class="flex justify-center mt-6" v-if="ocorrencias && ocorrenciasShown < ocorrencias.length">
          <button
            class="px-4 py-2 rounded bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition-colors"
            @click="ocorrenciasShown += 4"
          >Carregar mais</button>
        </div>
      </div>
      <div v-else class="text-neutral-500">Nenhuma ocorrência detalhada encontrada.</div>
    </div>
  </main>
</template>


