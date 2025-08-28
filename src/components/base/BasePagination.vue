<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()
const emit = defineEmits(['page-changed'])
const goToPage = (newPage: number) => {
  if (newPage < 1 || newPage > props.totalPages || newPage === props.currentPage) {
    return
  }
  emit('page-changed', newPage)
}
</script>

<template>
  <nav
    v-if="totalPages > 1"
    aria-label="Paginação"
    class="flex items-center justify-center gap-4 mt-8"
  >
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-white border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Anterior
    </button>

    <span class="text-sm text-neutral-600"> Página {{ currentPage }} de {{ totalPages }} </span>

    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-white border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Próximo
    </button>
  </nav>
</template>
