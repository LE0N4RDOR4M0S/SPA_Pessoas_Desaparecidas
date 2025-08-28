<script setup lang="ts">
import { Linkedin, Github, Mail } from 'lucide-vue-next'
</script>

<template>
  <main class="container mx-auto max-w-2xl p-6">
    <div class="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 class="text-3xl font-bold mb-4 text-primary-700">Bora trocar ideia!</h1>
      <p class="mb-8 text-neutral-600">
        Caso tenha interesse no meu trabalho. Adoraria discutir oportunidades, projetos ou
        simplesmente bater um papo sobre tecnologia. Você pode me encontrar nos seguintes canais:
      </p>

      <div class="flex justify-center items-center gap-8">
        <a
          href="mailto:leoolivramos@gmail.com"
          class="flex flex-col items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors"
        >
          <Mail class="h-8 w-8" />
          <span class="text-sm font-medium">E-mail</span>
        </a>

        <a
          href="https://www.linkedin.com/in/leonardo-de-oliveira-ramos-690318270/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors"
        >
          <Linkedin class="h-8 w-8" />
          <span class="text-sm font-medium">LinkedIn</span>
        </a>

        <a
          href="https://github.com/LE0N4RDOR4M0S"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col items-center gap-2 text-neutral-700 hover:text-primary-600 transition-colors"
        >
          <Github class="h-8 w-8" />
          <span class="text-sm font-medium">GitHub</span>
        </a>
      </div>
    </div>
  </main>
</template>
