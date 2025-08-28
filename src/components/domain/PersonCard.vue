<script setup lang="ts">
import type { PessoaComStatus } from '@/types/pessoa.type'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  person: PessoaComStatus
}>()
</script>

<template>
  <RouterLink
    :to="`/pessoas/${person.id}`"
    class="block bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
  >
    <div class="relative">
      <img
        :src="person.urlFoto || '/imagem.png'"
        :alt="`Foto de ${person.nome}`"
        class="w-full h-56 object-cover bg-neutral-200"
      />

      <span
        class="absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full"
        :class="{
          'bg-danger-100 text-danger-800': person.status === 'DESAPARECIDO',
          'bg-success-100 text-success-800': person.status === 'LOCALIZADO',
        }"
      >
        {{ person.status }}
      </span>
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
      <p class="text-sm text-neutral-500 mt-1">
        {{ person.ultimaOcorrencia.localDesaparecimentoConcat }}
      </p>
    </div>
  </RouterLink>
</template>
