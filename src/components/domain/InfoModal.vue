<script setup lang="ts">
import { ref } from 'vue'
import type { PessoaComStatus } from '@/types/pessoa.type'
import { ocorrenciaService } from '@/services/ocorrencia.service'
import type { OcorrenciaInfo } from '@/types/ocorrencia.type'

const props = defineProps<{ pessoa: PessoaComStatus | null }>()
const emit = defineEmits(['close'])

const nome = ref('')
const telefone = ref('')
const dataAvistamento = ref('')
const localAvistamento = ref('')
const detalhes = ref('')
const fotos = ref<File[]>([])

function handleFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files) fotos.value = Array.from(files)
}

function submit() {
  if (!props.pessoa) return
  if (!localAvistamento.value || !detalhes.value || !dataAvistamento.value ) {
    alert('Preencha todos os campos obrigatórios.')
    return
  }

  const [dia, mes, ano] = dataAvistamento.value.split('/')
  const dataFormatada = `${ano}-${mes}-${dia}`

  const formData = new FormData()
  formData.append('informacao', localAvistamento.value + ': ' + detalhes.value)
  formData.append('descricao', 'Foto do avistamento')
  formData.append('data', dataFormatada)
  formData.append('ocoId', String(props.pessoa.ultimaOcorrencia.ocoId))
  fotos.value.forEach(file => formData.append('files', file))

  ocorrenciaService.addInformacaoDesaparecido(formData)
    .then(() => {
      alert('Informação enviada com sucesso!')
      emit('close')
    })
    .catch(error => {
      console.error(error)
      alert('Erro ao enviar informação. Tente novamente mais tarde.')
    })
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <button
        @click="emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
      >
        &times;
      </button>
      <h3 class="text-lg font-bold mb-4">Nova informação sobre {{ pessoa?.nome }}</h3>
      <form @submit.prevent="submit" class="flex flex-col gap-3">
        <div>
          <label class="block text-sm font-medium mb-1">Seu nome (opcional):</label>
          <input v-model="nome" type="text" class="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Telefone para contato:</label>
          <input
            v-model="telefone"
            type="tel"
            class="w-full border rounded px-2 py-1"
            placeholder="(99) 99999-9999"
            maxlength="15"
            @input="
              telefone = telefone
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
                .slice(0, 15)
            "
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Data do avistamento:</label>
          <input
            v-model="dataAvistamento"
            type="text"
            class="w-full border rounded px-2 py-1"
            placeholder="dd/mm/aaaa"
            maxlength="10"
            @input="
              dataAvistamento = dataAvistamento
                .replace(/[^0-9]/g, '')
                .replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3')
                .slice(0, 10)
            "
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Local do avistamento:</label>
          <input v-model="localAvistamento" type="text" class="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Detalhes:</label>
          <textarea v-model="detalhes" class="w-full border rounded px-2 py-1" rows="3"></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Anexar fotos:</label>
          <input type="file" multiple accept="image/*" @change="handleFileChange" />
        </div>
        <button
          type="submit"
          class="mt-2 px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 transition"
        >
          Enviar informação
        </button>
      </form>
    </div>
  </div>
</template>
