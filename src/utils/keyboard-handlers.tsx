import { Dispatch, SetStateAction } from 'react'
import { IOption } from 'components/select/types'
import { STEP_SIZE } from './variables'
import { getSelectedOptionIndex } from './get-index'

type Props = {
  options: Array<IOption>
  activeIndex: number | null
  selectedOption: IOption | null
  onActiveIndex: Dispatch<SetStateAction<number | null>>
  onSelect: (value: IOption) => void
}

export const keyboardHandlers = ({
  options,
  activeIndex,
  selectedOption,
  onActiveIndex,
  onSelect,
}: Props) => {
  const keyDownCallback = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Up':
      case 'ArrowUp':
        e.preventDefault()
        if (activeIndex === null && selectedOption?.value) {
          const selectedOptionIndex = getSelectedOptionIndex(
            options,
            selectedOption.value,
          )

          return onActiveIndex(
            selectedOptionIndex === -1
              ? options.length - 1
              : selectedOptionIndex - STEP_SIZE,
          )
        }
        if (
          (activeIndex && selectedOption?.value) ||
          (activeIndex && !selectedOption?.value)
        ) {
          return onActiveIndex(activeIndex - STEP_SIZE)
        }
        return onActiveIndex(options.length - 1)
      case 'Down':
      case 'ArrowDown':
        e.preventDefault()
        if (
          (selectedOption?.value &&
            activeIndex === null &&
            selectedOption?.value + 1 !== options.length) ||
          (selectedOption?.value === 0 && !activeIndex)
        ) {
          const selectedOptionIndex = getSelectedOptionIndex(
            options,
            selectedOption.value,
          )

          return onActiveIndex(
            selectedOptionIndex === -1 ? 0 : selectedOptionIndex + STEP_SIZE,
          )
        }
        if (
          activeIndex === null ||
          (activeIndex && activeIndex + 1 === options.length) ||
          options.length === 1
        ) {
          return onActiveIndex(0)
        }
        return onActiveIndex(activeIndex + STEP_SIZE)
      case 'Enter':
        e.preventDefault()
        if (activeIndex !== null) {
          onSelect(options[activeIndex])
        }
        return
      case 'PageUp':
      case 'Home':
        e.preventDefault()
        onActiveIndex(0)
        return
      case 'PageDown':
      case 'End':
        e.preventDefault()
        onActiveIndex(options.length - 1)
        return
    }
  }

  document.addEventListener('keydown', keyDownCallback)

  return () => {
    document.removeEventListener('keydown', keyDownCallback)
  }
}
