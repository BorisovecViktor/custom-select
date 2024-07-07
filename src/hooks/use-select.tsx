import { useCallback, useEffect, useState } from 'react'
import { keyboardHandlers } from 'utils/keyboard-handlers'
import { IOption } from 'components/select/types'
import { getSelectedOptionIndex } from 'utils/get-index'
import { ALLOWED_KEYS } from 'utils/variables'

type Props = {
  initialOptions: Array<IOption>
}

export const useSelect = ({ initialOptions }: Props) => {
  const [options, setOptions] = useState<Array<IOption>>(initialOptions)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selectedOption, onSelectedOption] = useState<IOption | null>(null)

  // Set selected option
  const onSelect = useCallback(
    (option: IOption) => {
      if (selectedOption?.value !== option.value) {
        onSelectedOption(option)
        setIsOpen(false)
      }
    },
    [selectedOption?.value],
  )

  // Toggle options list by keyboard
  const onKeyboard = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const { key } = e

      if (
        (!isOpen && ALLOWED_KEYS.includes(key)) ||
        (isOpen && key === 'Escape')
      ) {
        setIsOpen(!isOpen)
        setActiveIndex(null)
        setOptions(initialOptions)
      }
    },
    [initialOptions, isOpen],
  )

  // Toggle options list
  const toggleDropdown = useCallback(
    (v: boolean) => {
      if (v) {
        const selected = getSelectedOptionIndex(
          options,
          selectedOption ? selectedOption.value : -1,
        )

        setActiveIndex(selected < 0 ? null : selected)
      }
      setIsOpen(v)
      setOptions(initialOptions)
    },
    [initialOptions, setOptions, options, selectedOption],
  )

  // Remove selected option
  const onRemove = useCallback(
    (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      e.stopPropagation()
      onSelectedOption(null)
    },
    [onSelectedOption],
  )

  useEffect(() => {
    if (isOpen) {
      return keyboardHandlers({
        options,
        activeIndex,
        selectedOption: selectedOption,
        onActiveIndex: setActiveIndex,
        onSelect,
      })
    }
  }, [activeIndex, isOpen, onSelect, options, selectedOption])

  return {
    isOpen,
    toggleDropdown,
    options,
    setOptions,
    activeIndex,
    setActiveIndex,
    selectedOption,
    onSelect,
    onRemove,
    onKeyboard,
  }
}
