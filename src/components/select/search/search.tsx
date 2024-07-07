import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useState,
} from 'react'
import { getFilteredOptions } from 'utils'
import { useSearch } from 'hooks'
import { IOption } from '../types'

type Props = {
  initialOptions: Array<IOption>
  onOptions: Dispatch<SetStateAction<Array<IOption>>>
  onActiveIndex: Dispatch<SetStateAction<number | null>>
}

export const SearchInput = memo(
  ({ initialOptions, onOptions, onActiveIndex }: Props) => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const { query: debouncedSearchQuery } = useSearch(searchQuery)

    // Filter array by debounced search query
    useEffect(() => {
      onOptions(getFilteredOptions(debouncedSearchQuery, initialOptions))
      onActiveIndex(null)
    }, [debouncedSearchQuery, initialOptions, onActiveIndex, onOptions])

    // Set search query
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value)
    }

    return (
      <label className="search">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
          className="search_input"
        />
      </label>
    )
  },
)
