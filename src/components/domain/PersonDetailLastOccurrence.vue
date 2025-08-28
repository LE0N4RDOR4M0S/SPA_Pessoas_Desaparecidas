<template>
  <div class="mb-4">
    <h3 class="text-lg font-semibold text-primary-700 mb-2">Última Ocorrência</h3>
    <p class="text-neutral-700"><strong>Local:</strong> {{ ultimaOcorrencia.localDesaparecimentoConcat }}</p>
    <p class="text-neutral-700">
      <strong>Data do Desaparecimento:</strong>
      {{
        ultimaOcorrencia.dtDesaparecimento
          ? new Date(ultimaOcorrencia.dtDesaparecimento).toLocaleDateString('pt-BR')
          : 'Não informado'
      }}
    </p>
    <p v-if="ultimaOcorrencia.dataLocalizacao" class="text-neutral-700"><strong>Data de Localização:</strong> {{ ultimaOcorrencia.dataLocalizacao }}</p>
    <p class="text-neutral-700"><strong>Encontrado Vivo:</strong> {{ ultimaOcorrencia.encontradoVivo === true ? 'Sim' : ultimaOcorrencia.encontradoVivo === false ? 'Não' : 'Não informado' }}</p>
    <p class="text-neutral-700"><strong>Informações:</strong> {{ ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao || 'Não informado' }}</p>
    <p class="text-neutral-700"><strong>Vestimentas:</strong> {{ ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || 'Não informado' }}</p>
  </div>
</template>

<script setup lang="ts">
import type { UltimaOcorrencia } from '@/types/pessoa.type'

defineProps<{ ultimaOcorrencia: UltimaOcorrencia }>()
</script>
