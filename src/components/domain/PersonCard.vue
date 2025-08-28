<script setup lang="ts">
import type { PessoaComStatus } from '@/types/pessoa.type'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const props = defineProps<{
  person: PessoaComStatus
}>()

const imgLoaded = ref(false)

function handleImgError(e: Event) {
  const target = e.target as HTMLImageElement
  target.src = '/imagem.png'
}
</script>

<template>
  <RouterLink
    :to="`/pessoas/${person.id}`"
    class="block bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group relative"
  >
    <div class="relative">
      <div
        class="w-full h-56 bg-neutral-200 flex items-center justify-center absolute top-0 left-0 z-0 animate-pulse"
        v-if="!imgLoaded"
      >
        <svg
          class="w-10 h-10 text-neutral-400"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z"
          />
        </svg>
      </div>
      <img
        :src="person.urlFoto || '/imagem.png'"
        @error="handleImgError"
        :alt="`Foto de ${person.nome}`"
        class="w-full h-56 object-cover bg-neutral-200 transition-opacity duration-500 z-10"
        loading="lazy"
        :style="imgLoaded ? 'opacity:1' : 'opacity:0'"
        @load="imgLoaded = true"
      />

      <span
        class="absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full z-20"
        :class="{
          'bg-danger-100 text-danger-800': person.status === 'DESAPARECIDO',
          'bg-success-100 text-success-800': person.status === 'LOCALIZADO',
        }"
      >
        {{ person.status }}
      </span>
      <div
        class="absolute bottom-0 left-0 w-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 px-4 py-3 text-xs"
        style="backdrop-filter: blur(2px)"
      >
        <div class="flex flex-col gap-1">
          <div v-if="person.ultimaOcorrencia.dtDesaparecimento">
            <span class="font-semibold">Desaparecimento:</span>
            {{ new Date(person.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString() }}
          </div>
          <div v-if="person.ultimaOcorrencia.localDesaparecimentoConcat">
            <span class="font-semibold">Local:</span>
            {{ person.ultimaOcorrencia.localDesaparecimentoConcat }}
          </div>
          <div v-if="person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido">
            <span class="font-semibold">Vestimentas:</span>
            {{ person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido }}
          </div>
        </div>
      </div>
    </div>

    <div class="p-4">
      <h3
        class="text-lg font-bold text-neutral-900 group-hover:text-primary-700 transition-colors truncate"
      >
        {{ person.nome }}
      </h3>
      <p class="text-sm text-neutral-600">
        {{ person.idade > 0 ? `${person.idade} anos` : 'Idade não informada' }}
      </p>
      <p class="text-sm text-neutral-500 mt-1 truncate">
        {{ person.ultimaOcorrencia.localDesaparecimentoConcat }}
      </p>
    </div>
  </RouterLink>
</template>
<script lang="ts">
export default {
  data() {
    return {
      imgLoaded: false,
    }
  },
}
</script>
