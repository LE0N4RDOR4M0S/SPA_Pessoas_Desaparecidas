<script setup lang="ts">
import type { PessoaComStatus } from '@/types/pessoa.type';
import PersonCard from './PersonCard.vue';

defineProps<{
  people: PessoaComStatus[];
}>();
</script>

<template>
  <div v-if="!people || people.length === 0" class="text-center text-gray-500 py-10">
    <p>Nenhum registro encontrado.</p>
  </div>

  <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <PersonCard
      v-for="person in people"
      :key="person.id"
      :person="person"
    />
  </div>
</template>
