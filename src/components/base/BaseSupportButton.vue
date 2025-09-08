<script setup lang="ts">
import { ref } from 'vue'

const showSupportModal = ref(false)

const faqTopics = [
  {
    question: 'Qual a finalidade da página?',
    answer: 'Esta página é utilizada em um projeto de avaliação para simular o processo de busca e auxílio na procura de pessoas desaparecidas do estado de Mato Grosso. Os dados e funcionalidades são fictícios e servem apenas para fins de teste e demonstração.'
  },
  {
    question: 'Como adicionar alguém na página ?',
    answer: 'No contexto deste projeto de avaliação, a inclusão de pessoas é realizada apenas por meio de registros simulados, não sendo necessário boletim de ocorrência real. As informações inseridas são fictícias e utilizadas apenas para fins de avaliação.'
  },
  {
    question: 'Como proceder em caso de reaparecimento?',
    answer: 'Neste projeto de avaliação, o reaparecimento é registrado de forma simulada, sem qualquer efeito legal ou comunicação com órgãos oficiais. O procedimento serve apenas para demonstrar o fluxo de atualização dos registros.'
  },
]
const supportContacts = [
  { label: 'E-mail', value: 'suporte@avaliacao.com.br' },
  { label: 'Telefone', value: '(00) 00000-0000' },
  { label: 'WhatsApp', value: '(00) 00000-0000' }
]
</script>

<template>
    <button
      @click="showSupportModal = true"
      class="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-primary-600 text-white shadow hover:bg-primary-700 transition"
      aria-label="Abrir suporte"
      style="box-shadow: 0 8px 32px 0 rgba(60, 120, 220, 0.18);"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" fill="url(#grad)" />
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stop-color="#60a5fa" />
            <stop offset="100%" stop-color="#2563eb" />
          </radialGradient>
        </defs>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z" />
      </svg>
    </button>

		<transition name="fade">
			<div
				v-if="showSupportModal"
				class="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] backdrop-blur-sm"
				@click.self="showSupportModal = false"
			>
				<div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative border-2 border-primary-100/60 animate-fade-in">
					<button
						@click="showSupportModal = false"
						class="absolute top-3 right-3 text-primary-600 hover:text-primary-800 text-2xl font-bold transition"
						aria-label="Fechar suporte"
					>
						&times;
					</button>
					<div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 sm:h-8 sm:w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z" />
						</svg>
						<h3 class="text-xl sm:text-2xl font-extrabold text-primary-700 tracking-tight">Suporte</h3>
					</div>
					<div class="mb-6 sm:mb-8">
						<h4 class="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-neutral-800">Tópicos frequentes</h4>
						<ul class="space-y-3 sm:space-y-4">
							<li v-for="faq in faqTopics" :key="faq.question" class="bg-primary-50/60 rounded-lg p-3 sm:p-4 border border-primary-100 shadow-sm">
								<span class="font-bold text-primary-700 block mb-1 text-sm sm:text-base">{{ faq.question }}</span>
								<span class="text-neutral-700 text-xs sm:text-sm">{{ faq.answer }}</span>
							</li>
						</ul>
					</div>
					<div>
						<h4 class="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-neutral-800">Contatos de suporte</h4>
						<ul class="space-y-1 sm:space-y-2">
							<li v-for="contato in supportContacts" :key="contato.label" class="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
								<span class="font-bold text-primary-600 text-sm sm:text-base">{{ contato.label }}:</span>
								<span class="text-neutral-700 font-medium text-xs sm:text-base">{{ contato.value }}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</transition>
</template>
