import { IOption } from 'components/select/types'

export const getSelectedOptionIndex = (
  options: Array<IOption>,
  selectedOption: number,
) => options.findIndex((i) => i.value === selectedOption)
