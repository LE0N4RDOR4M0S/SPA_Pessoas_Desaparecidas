<template>
  <div v-if="cartazes && cartazes.length > 0" class="mt-6">
    <h3 class="text-lg font-semibold text-primary-700 mb-2">Cartazes</h3>
    <div class="flex flex-wrap gap-4">
      <a v-for="cartaz in cartazes" :key="cartaz.urlCartaz" :href="cartaz.urlCartaz" target="_blank" class="block">
        <img :src="cartaz.urlCartaz" :alt="cartaz.tipoCartaz" class="w-32 h-40 object-cover rounded shadow hover:scale-105 transition-transform" />
        <span class="block text-xs text-center mt-1">{{ cartaz.tipoCartaz }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Cartaz } from '@/types/pessoa.type'

defineProps<{ cartazes: Cartaz[] }>()
</script>
