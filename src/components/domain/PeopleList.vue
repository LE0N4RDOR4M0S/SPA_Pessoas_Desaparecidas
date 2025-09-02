<script setup lang="ts">
import type { PessoaComStatus } from '@/types/pessoa.type'
import PersonCard from './PersonCard.vue'

defineProps<{
  people: PessoaComStatus[]
}>()
</script>

<template>
  <div v-if="!people || people.length === 0" class="text-center text-gray-500 py-10">
    <p>Nenhum registro encontrado.</p>
  </div>

  <transition-group
    name="fade-list"
    tag="div"
    class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0"
  >
    <PersonCard
      v-for="person in people"
      :key="person.id"
      :person="person"
      class="animate-fade-in"
    />
  </transition-group>
</template>
<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-list-enter-active,
.fade-list-leave-active {
  transition: opacity 0.5s;
}
.fade-list-enter-from,
.fade-list-leave-to {
  opacity: 0;
}
</style>
