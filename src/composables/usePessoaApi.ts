import { ref, type Ref } from 'vue';
import { peopleService } from '@/services/pessoa.service';
import type { PessoaComStatus } from '@/types/pessoa.type';
import type { PaginatedResponse } from '@/types/api';

export function usePeopleApi() {
  const dados: Ref<PaginatedResponse<PessoaComStatus> | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  const currentPage = ref(0);

  const fetchPeople = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await peopleService.getPeople(currentPage.value);
      dados.value = response;
    } catch (e) {
      error.value = 'Falha ao carregar dados. Tente novamente.';
    } finally {
      isLoading.value = false;
    }
  };

  const changePage = (newPage: number) => {
    if (dados.value && newPage >= 0 && newPage < dados.value.totalPages) {
      currentPage.value = newPage;
      fetchPeople();
    }
  };

  return {
      dados,
      isLoading,
      error,
      currentPage,
      changePage,
      fetchPeople,
  };
}
