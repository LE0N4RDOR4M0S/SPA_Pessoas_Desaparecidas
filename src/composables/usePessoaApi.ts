import { ref, type Ref } from 'vue'
import { peopleService } from '@/services/pessoa.service'
import type { PessoaComStatus } from '@/types/pessoa.type'
import type { PaginatedResponse } from '@/types/api'

export function usePeopleApi() {
  const dados: Ref<PaginatedResponse<PessoaComStatus> | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  const currentPage = ref(0)
  const perPage = ref(12)

  const fetchPeople = async (
    page = currentPage.value,
    size = perPage.value,
    filters: Record<string, unknown> = {}
  ) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await peopleService.getPeople(page, size, {
        ...filters
      })
      dados.value = response
      currentPage.value = page
      perPage.value = size
    } catch {
      error.value = 'Falha ao carregar dados. Tente novamente.'
    } finally {
      isLoading.value = false
    }
  }

  const changePage = async (
    newPage: number,
    filters: Record<string, unknown> = {}
  ) => {
    await fetchPeople(newPage, perPage.value, filters)
  }

  const changePerPage = async (
    newSize: number,
    filters: Record<string, unknown> = {}
  ) => {
    await fetchPeople(0, newSize, filters)
  }

  return {
    dados,
    isLoading,
    error,
    currentPage,
    perPage,
    fetchPeople,
    changePage,
    changePerPage,
  }
}
