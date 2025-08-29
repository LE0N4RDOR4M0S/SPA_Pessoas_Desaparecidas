<template>
  <main class="container mx-auto p-6">
    <BaseBackButton class="mb-4" />
    <div v-if="isLoading" class="flex justify-center py-12">
      <span
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"
      ></span>
    </div>
    <div v-else-if="error" class="text-center bg-red-100 text-red-700 p-4 rounded-lg">
      <p><strong>Ocorreu um erro:</strong> {{ error }}</p>
    </div>
    <div v-else-if="pessoa" class="bg-white rounded shadow p-6 max-w-2xl mx-auto">
      <PersonDetailHeader :pessoa="pessoa" />
      <PersonDetailLastOccurrence :ultimaOcorrencia="pessoa.ultimaOcorrencia" />
      <PersonDetailCartazes :cartazes="pessoa.ultimaOcorrencia.listaCartaz" />
    </div>
    <PersonDetailOcorrencias
      v-if="pessoa && pessoa.ultimaOcorrencia.ocoId"
      :ocorrencias="ocorrencias"
      :ocorrencias-loading="ocorrenciasLoading"
      :ocorrencias-error="ocorrenciasError"
      :ocorrencias-page-list="ocorrenciasPageList"
      :ocorrencias-shown="ocorrenciasShown"
      :sort-order="sortOrder"
      :filter-start-date="filterStartDate"
      :filter-end-date="filterEndDate"
      :only-with-attachment="onlyWithAttachment"
      @carregar-mais="ocorrenciasShown += 4"
    />
    <InfoModal
      v-if="showInfoModal"
      :pessoa="pessoa"
      @close="showInfoModal = false"
      @ocorrencia-adicionada="recarregarOcorrencias"
      @feedback="handleFeedback"
    />

    <transition name="fade">
      <div
        v-if="feedbackMsg"
        :class="[
          'fixed left-1/2 -translate-x-1/2 bottom-24 z-[100] px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-base font-semibold',
          feedbackTipo === 'sucesso' ? 'bg-green-100 text-green-800 border border-green-300' : '',
          feedbackTipo === 'erro' ? 'bg-red-100 text-red-800 border border-red-300' : '',
          feedbackTipo === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-300' : ''
        ]"
        style="min-width:220px; max-width:90vw;"
      >
        <span v-if="feedbackTipo === 'sucesso'"></span>
        <span v-else-if="feedbackTipo === 'erro'"></span>
        <span v-else-if="feedbackTipo === 'info'"></span>
        <span>{{ feedbackMsg }}</span>
      </div>
    </transition>
    <button
      @click="showInfoModal = true"
      class="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-all text-base font-semibold"
      aria-label="Enviar nova informação"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Nova informação
    </button>
  </main>
</template>

<script setup lang="ts">
const feedbackMsg = ref('')
const feedbackTipo = ref<'sucesso' | 'erro' | 'info' | ''>('')
let feedbackTimeout: ReturnType<typeof setTimeout> | null = null

function handleFeedback({ tipo, mensagem }: { tipo: 'sucesso' | 'erro' | 'info'; mensagem: string }) {
  feedbackMsg.value = mensagem
  feedbackTipo.value = tipo
  if (feedbackTimeout) clearTimeout(feedbackTimeout)
  feedbackTimeout = setTimeout(() => {
    feedbackMsg.value = ''
    feedbackTipo.value = ''
  }, 3500)
}
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { peopleService } from '@/services/pessoa.service'
import { ocorrenciaService } from '@/services/ocorrencia.service'
import type { OcorrenciaInfo } from '@/types/ocorrencia.type'
import type { PessoaComStatus } from '@/types/pessoa.type'
import PersonDetailHeader from '@/components/domain/PersonDetailHeader.vue'
import PersonDetailLastOccurrence from '@/components/domain/PersonDetailLastOccurrence.vue'
import PersonDetailCartazes from '@/components/domain/PersonDetailCartazes.vue'
import PersonDetailOcorrencias from '@/components/domain/PersonDetailOcorrencias.vue'
import BaseBackButton from '@/components/base/BaseBack.vue'
import InfoModal from '@/components/domain/InfoModal.vue'

const route = useRoute()
const pessoa = ref<PessoaComStatus | null>(null)
const isLoading = ref(true)
const error = ref('')
const showInfoModal = ref(false)

const ocorrencias = ref<OcorrenciaInfo[] | null>(null)
const ocorrenciasLoading = ref(false)
const ocorrenciasError = ref('')
const ocorrenciasShown = ref(4)
const sortOrder = ref<'asc' | 'desc'>('desc')
const filterStartDate = ref('')
const filterEndDate = ref('')
const onlyWithAttachment = ref(false)


const ocorrenciasPageList = computed(() => {
  if (!ocorrencias.value) return []
  return ocorrencias.value.slice(0, ocorrenciasShown.value)
})

async function recarregarOcorrencias() {
  if (pessoa.value?.ultimaOcorrencia?.ocoId) {
    ocorrenciasLoading.value = true
    try {
      ocorrencias.value = await ocorrenciaService.getInformacoesDesaparecido(
        pessoa.value.ultimaOcorrencia.ocoId,
      )
      ocorrenciasError.value = ''
    } catch {
      ocorrenciasError.value = 'Erro ao carregar ocorrências detalhadas.'
    } finally {
      ocorrenciasLoading.value = false
    }
  }
}

onMounted(async () => {
  try {
    isLoading.value = true
    pessoa.value = await peopleService.getPersonById(route.params.id as string)
    if (pessoa.value?.ultimaOcorrencia?.ocoId) {
      ocorrenciasLoading.value = true
      try {
        ocorrencias.value = await ocorrenciaService.getInformacoesDesaparecido(
          pessoa.value.ultimaOcorrencia.ocoId,
        )
      } catch {
        ocorrenciasError.value = 'Erro ao carregar ocorrências detalhadas.'
      } finally {
        ocorrenciasLoading.value = false
      }
    }
  } catch {
    error.value = 'Erro ao carregar dados da pessoa.'
  } finally {
    isLoading.value = false
  }
})
</script>
