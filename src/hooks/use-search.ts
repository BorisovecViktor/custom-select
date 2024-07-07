import { useMemo, useState } from 'react'
import { useDebounce } from 'react-use'

export type UseSearchOutput = {
  query: string
}

export const useSearch = (searchQuery: string): UseSearchOutput => {
  const [query, setQuery] = useState<string>('')

  useDebounce(
    () => {
      setQuery(searchQuery)
    },
    700,
    [searchQuery],
  )

  return useMemo(() => {
    return {
      query,
    }
  }, [query])
}
