import { useSelect, useOutsideClick } from 'hooks'
import { SearchInput } from './search'
import { OptionsList } from './options'
import { getOptions, OPTIONS_AMOUNT } from 'utils'
import chevronIcon from 'assets/icons/chevron.svg'
import crossIcon from 'assets/icons/cross.svg'
import './select.css'

const initialOptions = getOptions(OPTIONS_AMOUNT)

export const Select = () => {
  const {
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
  } = useSelect({
    initialOptions: initialOptions,
  })
  const ref = useOutsideClick(() => {
    if (isOpen) {
      toggleDropdown(false)
    }
  })

  return (
    <main className="container">
      <div className="select-container">
        <div ref={ref} onKeyDown={onKeyboard}>
          <div
            tabIndex={0}
            onClick={() => toggleDropdown(!isOpen)}
            className="select"
            role="combobox"
            aria-controls="listbox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span
              className={`select_label${
                selectedOption ? ' select_label--selected' : ''
              }`}
            >
              {selectedOption ? selectedOption.label : 'Select option'}
            </span>
            <div className="remove_icon">
              {selectedOption && (
                <div className="remove_icon_button">
                  <img src={crossIcon} alt="Remove icon" onClick={onRemove} />
                </div>
              )}
              <img
                src={chevronIcon}
                alt="Chevron icon"
                className={isOpen ? 'select_img--rotated' : undefined}
              />
            </div>
          </div>
          {isOpen && (
            <div id="listbox" className="options">
              <SearchInput
                initialOptions={initialOptions}
                onOptions={setOptions}
                onActiveIndex={setActiveIndex}
              />
              <OptionsList
                filteredOptions={options}
                selectedOption={selectedOption}
                activeIndex={activeIndex}
                onActiveIndex={setActiveIndex}
                onSelect={onSelect}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
