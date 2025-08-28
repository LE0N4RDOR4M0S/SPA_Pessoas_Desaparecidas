<template>
  <div class="mt-8">
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
            <a
              v-for="anexo in oco.anexos"
              :key="anexo"
              :href="anexo"
              target="_blank"
              class="flex flex-col items-center gap-1 px-3 py-2 bg-primary-50 border border-primary-200 rounded shadow text-primary-700 hover:bg-primary-100 hover:text-primary-900 transition-colors text-xs font-medium w-28 max-w-full overflow-hidden"
            >
              <span v-if="isImage(anexo)" class="block w-full h-20 flex items-center justify-center overflow-hidden mb-1">
                <img :src="anexo" alt="Prévia do anexo" class="object-contain w-full h-full rounded border border-neutral-200 bg-white" loading="lazy" />
              </span>
              <span v-else class="block w-full h-20 flex items-center justify-center mb-1">
                <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a2 2 0 10-2.828-2.828z"/></svg>
              </span>
              <span class="truncate max-w-[100px] text-center" :title="getFileName(anexo)">{{ getFileName(anexo) }}</span>
            </a>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-6" v-if="ocorrencias && ocorrenciasShown < ocorrencias.length">
        <button
          class="px-4 py-2 rounded bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition-colors"
          @click="$emit('carregar-mais')"
        >Carregar mais</button>
      </div>
    </div>
    <div v-else class="text-neutral-500">Nenhuma ocorrência detalhada encontrada.</div>
  </div>
</template>

<script setup lang="ts">

import type { OcorrenciaInfo } from '@/services/ocorrencia.service'
import { defineProps, defineEmits } from 'vue'

interface PersonDetailOcorrenciasProps {
  ocorrencias: OcorrenciaInfo[] | null
  ocorrenciasLoading: boolean
  ocorrenciasError: string
  ocorrenciasPageList: OcorrenciaInfo[]
  ocorrenciasShown: number
}

defineProps<PersonDetailOcorrenciasProps>()

defineEmits(['carregar-mais'])

function isImage(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url.split('?')[0]);
}

function getFileName(url: string): string {
  try {
    return decodeURIComponent(url.split('/').pop()?.split('?')[0] || 'Arquivo');
  } catch {
    return 'Arquivo';
  }
}
</script>
