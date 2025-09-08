<template>
  <main class="container mx-auto max-w-4xl p-6">
    <h1 class="text-3xl font-extrabold mb-8 text-secondary-700 text-center">
      Sobre o Projeto: Frontend para Pessoas Desaparecidas na API da PJC-MT
    </h1>

    <section class="mb-10 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-neutral-800 border-b pb-2 border-neutral-200">
        Propósito
      </h2>
      <p class="mb-4 text-neutral-700 leading-relaxed">
        Essa aplicação foi concebida e desenvolvida como parte de um processo seletivo, com o
        objetivo técnico de criar uma plataforma intuitiva e eficiente para auxiliar na divulgação
        de pessoas desaparecidas no estado de Mato Grosso. A integração com a API da Polícia
        Judiciária Civil-MT (PJC-MT) é central, visando centralizar e disponibilizar informações
        cruciais para a sociedade.
      </p>
    </section>

    <section class="mb-10 p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-neutral-800 border-b pb-2 border-neutral-200">
        Funcionalidades Implementadas
      </h2>
      <ul class="list-disc list-inside space-y-2 text-neutral-700">
        <li>
          <span class="font-semibold">Listagem Dinâmica:</span> Exibição de pessoas desaparecidas
          com informações essenciais.
        </li>
        <li>
          <span class="font-semibold">Paginação:</span> Navegação eficiente entre grandes volumes de
          dados através de um sistema de paginação, com controle de estado.
        </li>
        <li>
          <span class="font-semibold">Detalhes Completos:</span> Preparação para uma página dedicada
          a exibir informações detalhadas de cada pessoa, incluindo dados da última ocorrência e
          fotos adicionais.
        </li>
        <li>
          <span class="font-semibold">Sistema de Busca:</span> Implementação futura de filtros por
          nome, faixa etária e sexo para refinar os resultados.
        </li>
        <li>
          <span class="font-semibold">Status Visual:</span> Indicação clara se a pessoa está
          "DESAPARECIDA" ou "LOCALIZADA", com destaque visual utilizando a paleta de cores do Design
          System.
        </li>
      </ul>
    </section>
    <section class="p-6 bg-white rounded-lg shadow-md text-center">
      <h2 class="text-2xl font-bold mb-4 text-neutral-800 border-b pb-2 border-neutral-200">
        Como executar e testar localmente
      </h2>
      <div class="mb-4 text-left text-neutral-700">
        <strong>Modo desenvolvimento (Node.js):</strong>
        <pre class="bg-neutral-100 rounded p-3 text-sm mt-2 mb-2">npm install
npm run dev
# Acesse http://localhost:5173</pre>
        <strong>Modo produção (Docker):</strong>
        <pre class="bg-neutral-100 rounded p-3 text-sm mt-2 mb-2">docker build -t spa-pessoas-desaparecidas .
docker run -p 8080:80 spa-pessoas-desaparecidas
# Acesse http://localhost:8080</pre>
        O container utiliza Nginx para servir os arquivos otimizados do build, com cache, segurança e compressão. O arquivo <code>nginx.conf</code> já está configurado para funcionar com rotas do Vue Router (history mode).
      </div>
      <h2 class="text-2xl font-bold mb-4 text-neutral-800 border-b pb-2 border-neutral-200">
        Agradecimentos
      </h2>
      <p class="text-neutral-700 leading-relaxed">
        Agradeço a oportunidade de participar deste processo seletivo e contribuir com uma solução
        que pode fazer a diferença na vida das pessoas. Estou à disposição para quaisquer dúvidas ou
        discussões sobre o projeto.
      </p>
      <p class="text-neutral-500 text-sm mt-4">
        Desenvolvido por
        <span class="font-semibold text-primary-600">Leonardo de Oliveira Ramos</span>
        para fins de demonstração técnica e avaliação.
      </p>
    </section>
  </main>
</template>
