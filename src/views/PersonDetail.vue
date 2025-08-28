

<template>
  <main class="container mx-auto p-6">
    <div v-if="isLoading" class="flex justify-center py-12">
      <span class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></span>
    </div>
    <div v-else-if="error" class="text-center bg-red-100 text-red-700 p-4 rounded-lg">
      <p><strong>Ocorreu um erro:</strong> {{ error }}</p>
    </div>
    <div v-else-if="pessoa" class="bg-white rounded shadow p-6 max-w-2xl mx-auto">
      <PersonDetailHeader :pessoa="pessoa" />
      <PersonDetailLastOccurrence :ultimaOcorrencia="pessoa.ultimaOcorrencia" />
      <PersonDetailCartazes :cartazes="pessoa.ultimaOcorrencia.listaCartaz" />
    </div>
    <PersonDetailOcorrencias
      v-if="pessoa && pessoa.ultimaOcorrencia.ocoId"
      :ocorrencias="ocorrencias"
      :ocorrencias-loading="ocorrenciasLoading"
      :ocorrencias-error="ocorrenciasError"
      :ocorrencias-page-list="ocorrenciasPageList"
      :ocorrencias-shown="ocorrenciasShown"
      @carregar-mais="ocorrenciasShown += 4"
    />
  </main>
</template>

<script setup lang="ts">
    import { onMounted, ref, computed } from 'vue'
    import { useRoute } from 'vue-router'
    import { peopleService } from '@/services/pessoa.service'
    import { ocorrenciaService, type OcorrenciaInfo } from '@/services/ocorrencia.service'
    import type { PessoaComStatus } from '@/types/pessoa.type'
    import PersonDetailHeader from '@/components/domain/PersonDetailHeader.vue'
    import PersonDetailLastOccurrence from '@/components/domain/PersonDetailLastOccurrence.vue'
    import PersonDetailCartazes from '@/components/domain/PersonDetailCartazes.vue'
    import PersonDetailOcorrencias from '@/components/domain/PersonDetailOcorrencias.vue'

    const route = useRoute()
    const pessoa = ref<PessoaComStatus | null>(null)
    const isLoading = ref(true)
    const error = ref('')

    const ocorrencias = ref<OcorrenciaInfo[] | null>(null)
    const ocorrenciasLoading = ref(false)
    const ocorrenciasError = ref('')
    const ocorrenciasShown = ref(4)
    const ocorrenciasPageList = computed(() => {
      if (!ocorrencias.value) return []
      return ocorrencias.value.slice(0, ocorrenciasShown.value)
    })

    onMounted(async () => {
      try {
        isLoading.value = true
        pessoa.value = await peopleService.getPersonById(route.params.id as string)
        if (pessoa.value?.ultimaOcorrencia?.ocoId) {
          ocorrenciasLoading.value = true
          try {
            ocorrencias.value = await ocorrenciaService.getInformacoesDesaparecido(pessoa.value.ultimaOcorrencia.ocoId)
          } catch (e) {
            ocorrenciasError.value = 'Erro ao carregar ocorrências detalhadas.'
          } finally {
            ocorrenciasLoading.value = false
          }
        }
      } catch (e) {
        error.value = 'Erro ao carregar dados da pessoa.'
      } finally {
        isLoading.value = false
      }
    })

</script>
