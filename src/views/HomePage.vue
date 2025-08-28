<script setup lang="ts">
import { onMounted } from 'vue'
import { usePeopleApi } from '@/composables/usePessoaApi'
import PeopleList from '@/components/domain/PeopleList.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import BasePagination from '@/components/base/BasePagination.vue'

const { dados, isLoading, error, fetchPeople, changePage } = usePeopleApi()

onMounted(() => {
  fetchPeople()
})

const handlePageChange = (newPage: number) => {
  changePage(newPage - 1)
}
</script>

<template>
  <main class="container mx-auto p-6">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-800">Registros Atuais</h2>
    </div>

    <div v-if="isLoading" class="flex justify-center py-12">
      <BaseSpinner />
    </div>

    <div v-else-if="error" class="text-center bg-red-100 text-red-700 p-4 rounded-lg">
      <p><strong>Ocorreu um erro:</strong> {{ error }}</p>
    </div>

    <div v-else-if="dados">
      <PeopleList :people="dados.content" />

      <BasePagination
        :current-page="dados.page + 1"
        :total-pages="dados.totalPages"
        @page-changed="handlePageChange"
      />
    </div>
  </main>
</template>
