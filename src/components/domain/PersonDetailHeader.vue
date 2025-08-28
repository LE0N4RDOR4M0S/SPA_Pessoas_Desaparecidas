<template>
  <div class="flex flex-col md:flex-row gap-6 items-center mb-6">
    <img
      :src="pessoa.urlFoto || '/imagem.png'"
      :alt="`Foto de ${pessoa.nome}`"
      class="w-40 h-40 object-cover rounded-full border-4 border-primary-200 shadow-md bg-neutral-100 cursor-zoom-in transition hover:scale-105"
      @click="showImageModal = true"
    />
    <div class="flex-1">
      <h2 class="text-2xl font-bold text-neutral-800 mb-1">{{ pessoa.nome }}</h2>
      <span
        class="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
        :class="{
          'bg-danger-100 text-danger-800': pessoa.status === 'DESAPARECIDO',
          'bg-success-100 text-success-800': pessoa.status === 'LOCALIZADO',
        }"
      >
        {{ pessoa.status }}
      </span>
      <p class="text-neutral-600 mb-1">
        <strong>Idade:</strong> {{ pessoa.idade > 0 ? pessoa.idade + ' anos' : 'Não informada' }}
      </p>
      <p class="text-neutral-600 mb-1"><strong>Sexo:</strong> {{ pessoa.sexo }}</p>
      <p class="text-neutral-600 mb-1">
        <strong>Vivo:</strong> {{ pessoa.vivo ? 'Sim' : 'Não informado' }}
      </p>
    </div>
    <transition name="fade">
      <div
        v-if="showImageModal"
        class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        @click.self="showImageModal = false"
      >
        <img
          :src="pessoa.urlFoto || '/imagem.png'"
          :alt="`Foto de ${pessoa.nome}`"
          class="max-h-[80vh] max-w-[90vw] rounded shadow-lg border-4 border-white"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PessoaComStatus } from '@/types/pessoa.type'

defineProps<{ pessoa: PessoaComStatus }>()

const showImageModal = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
