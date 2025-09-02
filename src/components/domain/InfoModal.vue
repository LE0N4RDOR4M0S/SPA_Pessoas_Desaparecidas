<script setup lang="ts">
const enviando = ref(false)
import { ref } from 'vue'
import type { PessoaComStatus } from '@/types/pessoa.type'
import { ocorrenciaService } from '@/services/ocorrencia.service'

const props = defineProps<{ pessoa: PessoaComStatus | null }>()
const emit = defineEmits(['close', 'feedback', 'ocorrencia-adicionada'])

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

async function submit() {
  if (!props.pessoa) return
  if (!localAvistamento.value || !detalhes.value || !dataAvistamento.value) {
    emit('feedback', {
      tipo: 'erro',
      mensagem: 'Por favor, preencha todos os campos obrigatórios.',
    })
    return
  }

  const [dia, mes, ano] = dataAvistamento.value.split('/')
  const dataFormatada = `${ano}-${mes}-${dia}`

  const formData = new FormData()
  formData.append('informacao', localAvistamento.value + ': ' + detalhes.value)
  formData.append('descricao', 'Foto do avistamento')
  formData.append('data', dataFormatada)
  formData.append('ocoId', String(props.pessoa.ultimaOcorrencia.ocoId))
  fotos.value.forEach((file) => formData.append('files', file))

  enviando.value = true
  emit('feedback', { tipo: 'info', mensagem: 'Enviando sua informação, aguarde...' })
  try {
    await ocorrenciaService.addInformacaoDesaparecido(formData)
    emit('feedback', {
      tipo: 'sucesso',
      mensagem: 'Informação enviada com sucesso! Obrigado pela colaboração.',
    })
    emit('ocorrencia-adicionada')
    emit('close')
  } catch (error) {
    console.error(error)
    emit('feedback', { tipo: 'erro', mensagem: 'Ocorreu um erro ao enviar.' })
  } finally {
    enviando.value = false
  }
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
          <input
            v-model="nome"
            type="text"
            class="w-full border rounded px-2 py-1"
            placeholder="Nome"
          />
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
          <input
            v-model="localAvistamento"
            type="text"
            class="w-full border rounded px-2 py-1"
            placeholder="Ex: Praça Oito de Abril"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Detalhes:</label>
          <textarea
            v-model="detalhes"
            class="w-full border rounded px-2 py-1"
            rows="3"
            placeholder="O que sabe?"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1"
            >Anexar arquivos (fotos, vídeos, documentos, etc):</label
          >
          <input
            type="file"
            multiple
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt,video/*,audio/*"
            @change="handleFileChange"
          />
          <div v-if="fotos.length" class="mt-2 text-xs text-gray-600">
            <div v-for="(file, idx) in fotos" :key="idx">
              {{ file.name }}
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="mt-2 px-4 py-2 rounded bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span v-if="enviando">
            <svg
              class="inline animate-spin h-5 w-5 mr-1 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Enviando...
          </span>
          <span v-else>Enviar informação</span>
        </button>
      </form>
    </div>
  </div>
</template>
