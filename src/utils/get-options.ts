import { IOption } from 'components/select/types'

export const getOptions = (length: number) =>
  Array.from({ length }, (_, i) => ({ value: i, label: `Option ${i}` }))

export const getFilteredOptions = (
  searchValue: string,
  options: Array<IOption>,
) =>
  options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  )
