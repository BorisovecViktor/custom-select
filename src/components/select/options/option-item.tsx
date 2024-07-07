import { CSSProperties, Dispatch, memo, SetStateAction } from 'react'
import reactIcon from 'assets/icons/react.svg'
import { IOption } from '../types'

type Props = {
  option: IOption
  index: number
  activeIndex: number | null
  onActiveIndex: Dispatch<SetStateAction<number | null>>
  onSelect: (option: IOption) => void
  isSelectedOption: boolean
  style: CSSProperties
}

export const OptionItem = memo(
  ({
    option,
    index,
    activeIndex,
    onActiveIndex,
    onSelect,
    isSelectedOption,
    style,
  }: Props) => (
    <li
      id={String(index)}
      role="option"
      aria-selected={isSelectedOption}
      style={style}
      className={`option ${activeIndex === index ? 'option--hovered' : ''}`}
      onClick={() => {
        onSelect({ value: option.value, label: option.label })
      }}
      onMouseOver={() => onActiveIndex(null)}
    >
      <img
        id={String(index)}
        src={reactIcon}
        className="option-img"
        alt="Select option icon"
      />
      <span id={String(index)}>{option.label}</span>
    </li>
  ),
)
