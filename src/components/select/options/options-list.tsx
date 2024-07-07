import { Dispatch, SetStateAction, memo, useEffect, useRef } from 'react'
import { IOption } from '../types'
import { FixedSizeList, FixedSizeList as List } from 'react-window'
import { OptionItem } from './option-item'
import { OPTIONS_ITEM_SIZE, OPTIONS_WIDTH, OPTIONS_HEIGHT } from 'utils'
import { OptionsNotFound } from './options-not-found'
import { getSelectedOptionIndex } from 'utils/get-index'

type Props = {
  filteredOptions: Array<IOption>
  selectedOption: IOption | null
  activeIndex: number | null
  onSelect: (option: IOption) => void
  onActiveIndex: Dispatch<SetStateAction<number | null>>
}

export const OptionsList = memo(
  ({
    filteredOptions,
    selectedOption,
    activeIndex,
    onSelect,
    onActiveIndex,
  }: Props) => {
    const ref = useRef<FixedSizeList<Array<IOption>>>(null)

    // Call on keyboard scroll
    useEffect(() => {
      if (ref.current && activeIndex !== null) {
        ref.current.scrollToItem(activeIndex)
      }
    }, [activeIndex])

    // Call once on open dropdown action
    useEffect(() => {
      if (ref.current && selectedOption) {
        ref.current.scrollToItem(
          getSelectedOptionIndex(filteredOptions, selectedOption.value),
          'center',
        )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return filteredOptions.length > 0 ? (
      <List
        ref={ref}
        itemData={filteredOptions}
        height={
          filteredOptions.length > 5
            ? OPTIONS_HEIGHT
            : OPTIONS_ITEM_SIZE * filteredOptions.length
        }
        itemCount={filteredOptions.length}
        itemSize={OPTIONS_ITEM_SIZE}
        width={OPTIONS_WIDTH}
      >
        {({ index, style, data }) => {
          const option = data[index]
          const isSelectedOption = selectedOption?.value === option.value

          return (
            <OptionItem
              key={index}
              index={index}
              option={option}
              activeIndex={activeIndex}
              onActiveIndex={onActiveIndex}
              onSelect={onSelect}
              isSelectedOption={isSelectedOption}
              style={style}
            />
          )
        }}
      </List>
    ) : (
      <OptionsNotFound />
    )
  },
)
