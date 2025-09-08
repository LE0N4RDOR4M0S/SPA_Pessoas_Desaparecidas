<template>
  <div class="mt-8">
    <h3 class="text-lg font-semibold text-gray-800 mb-2">Ocorrências Relacionadas</h3>
    <div v-if="ocorrenciasLoading" class="text-neutral-500">Carregando ocorrências...</div>
    <div v-else-if="ocorrenciasError" class="text-red-600">{{ ocorrenciasError }}</div>
    <div v-else-if="ocorrencias && ocorrencias.length > 0">
      <div class="flex flex-col gap-6">
        <div class="flex flex-wrap items-center gap-4 mb-4">
          <label class="font-medium flex items-center gap-1">
            Ordenar:
            <select v-model="sortOrder" class="border rounded px-2 py-1 ml-2">
              <option value="desc">Mais recentes</option>
              <option value="asc">Mais antigos</option>
            </select>
          </label>
          <button
            type="button"
            @click="showAdvanced = !showAdvanced"
            class="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-700 bg-transparent border-0 shadow-none px-2 py-1 transition"
            style="box-shadow: none"
          >
            <span>
              {{ showAdvanced ? 'Ocultar filtros avançados' : 'Filtros avançados' }}
            </span>
            <svg
              :class="[
                'transition-transform duration-300',
                showAdvanced ? 'rotate-180' : 'rotate-0',
              ]"
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
          <template v-if="showAdvanced">
            <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <label class="font-medium flex items-center gap-1 w-full sm:w-auto">
                Data início:
                <input
                  type="date"
                  v-model="filterStartDate"
                  class="border rounded px-2 py-1 ml-2 w-full sm:w-auto"
                />
              </label>
              <label class="font-medium flex items-center gap-1 w-full sm:w-auto">
                Data fim:
                <input
                  type="date"
                  v-model="filterEndDate"
                  class="border rounded px-2 py-1 ml-2 w-full sm:w-auto"
                />
              </label>
              <label class="font-medium flex items-center gap-1 ml-0 sm:ml-4 w-full sm:w-auto">
                <input type="checkbox" v-model="onlyWithAttachment" class="accent-primary-600" />
                Apenas com anexo
              </label>
            </div>
          </template>
        </div>
        <transition-group name="oco-fade" tag="div" class="flex flex-col gap-6">
          <div
            v-for="oco in sortedOcorrencias.slice(0, ocorrenciasShown)"
            :key="oco.id"
            class="relative group bg-gradient-to-br from-white/80 to-primary-40/50 border-2 border-transparent bg-clip-padding sm:p-7 flex flex-col gap-2 transition-all duration-300 oco-card-glass hover:shadow-2xl"
            tabindex="0"
          >
            <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
              <span
                class="inline-flex items-center px-2 py-1 bg-primary-100/70 text-primary-700 border border-primary-200 text-xs font-semibold shadow-sm uppercase tracking-wide"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {{ oco.data.split('-').reverse().join('-') }}
              </span>
            </div>
            <div class="mb-1 flex items-start gap-2">
              <span class="text-neutral-700">{{ oco.informacao }}</span>
            </div>
            <div v-if="oco.anexos && oco.anexos.length > 0" class="flex flex-wrap gap-2 mt-2">
              <span class="font-bold text-primary-700 w-full flex items-center gap-1">
                <svg
                  class="w-4 h-4 text-primary-500"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a2 2 0 10-2.828-2.828z"
                  />
                </svg>
                Anexos:
              </span>
              <a
                v-for="anexo in oco.anexos"
                :key="anexo"
                :href="anexo"
                target="_blank"
                class="flex flex-col items-center gap-1 px-2 py-2 sm:px-3 bg-primary-100/60 border border-primary-200 shadow text-primary-700 hover:bg-primary-200/80 hover:text-primary-900 transition-all text-xs font-medium w-24 sm:w-28 max-w-full overflow-hidden outline-none"
                tabindex="0"
              >
                <span
                  v-if="isImage(anexo)"
                  class="block w-full h-16 sm:h-20 flex items-center justify-center overflow-hidden mb-1"
                >
                  <img
                    :src="anexo"
                    alt="Prévia do anexo"
                    class="object-contain w-full h-full border border-primary-200 bg-white/80 transition-all duration-200 group-hover:shadow-lg"
                    loading="lazy"
                  />
                </span>
                <span
                  v-else
                  class="block w-full h-16 sm:h-20 flex items-center justify-center mb-1"
                >
                  <svg
                    class="w-8 h-8 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a2 2 0 10-2.828-2.828z"
                    />
                  </svg>
                </span>
                <span class="truncate max-w-[100px] text-center" :title="getFileName(anexo)">{{
                  getFileName(anexo)
                }}</span>
              </a>
            </div>
          </div>
        </transition-group>
      </div>
      <div
        class="flex justify-center mt-6"
        v-if="ocorrencias && ocorrenciasShown < ocorrencias.length"
      >
        <button
          class="px-4 py-2 rounded bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition-colors"
          @click="$emit('carregar-mais')"
        >
          Carregar mais
        </button>
      </div>
    </div>
    <div v-else class="text-neutral-500">Nenhuma ocorrência detalhada encontrada.</div>
  </div>
</template>

<script setup lang="ts">
const onlyWithAttachment = ref(false)
const showAdvanced = ref(false)

import type { OcorrenciaInfo } from '@/types/ocorrencia.type'
import { defineProps, defineEmits, ref, computed } from 'vue'

interface PersonDetailOcorrenciasProps {
  ocorrencias: OcorrenciaInfo[] | null
  ocorrenciasLoading: boolean
  ocorrenciasError: string
  ocorrenciasPageList: OcorrenciaInfo[]
  ocorrenciasShown: number
}

const props = defineProps<PersonDetailOcorrenciasProps>()
const sortOrder = ref<'asc' | 'desc'>('desc')
const filterStartDate = ref<string>('')
const filterEndDate = ref<string>('')

const sortedOcorrencias = computed(() => {
  if (!props.ocorrenciasPageList) return []
  let list = [...props.ocorrenciasPageList]
  if (filterStartDate.value) {
    const start = new Date(filterStartDate.value)
    list = list.filter((oco) => new Date(oco.data) >= start)
  }
  if (filterEndDate.value) {
    const end = new Date(filterEndDate.value)
    list = list.filter((oco) => new Date(oco.data) <= end)
  }
  if (onlyWithAttachment.value) {
    list = list.filter((oco) => oco.anexos && oco.anexos.length > 0)
  }
  list.sort((a, b) => {
    const da = new Date(a.data).getTime()
    const db = new Date(b.data).getTime()
    return sortOrder.value === 'asc' ? da - db : db - da
  })
  return list
})

function isImage(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url.split('?')[0])
}

function getFileName(url: string): string {
  try {
    return decodeURIComponent(url.split('/').pop()?.split('?')[0] || 'Arquivo')
  } catch {
    return 'Arquivo'
  }
}
</script>
