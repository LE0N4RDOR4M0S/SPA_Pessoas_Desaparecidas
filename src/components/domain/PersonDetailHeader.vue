<template>
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
</template>

<script setup lang="ts">
import type { PessoaComStatus } from '@/types/pessoa.type'

defineProps<{ pessoa: PessoaComStatus }>()
</script>
