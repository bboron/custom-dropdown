import React, { useEffect, useRef, useState, useMemo } from "react"
import { DropdownProps } from "./types"
import "./Dropdown.css"

const DropdownList: React.FC<DropdownProps> = ({
  listOption,
  selectedValue,
}) => {
  const dropDownList = useRef<HTMLSelectElement>(null)
  const customList = useRef<HTMLUListElement>(null)
  const dropdownContainer = useRef<HTMLDivElement>(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isOptionSelected, setIsOptionSelected] = useState(false)

  const handleOutsideClick = (e: MouseEvent) => {
    if (e.target instanceof Node) {
      !dropdownContainer.current?.contains(e.target)
        ? setIsDropdownOpen(false)
        : null
    }
  }

  const selectedOption: React.MouseEventHandler<HTMLLIElement> = (e) => {
    console.log("selectedOption")
    e.stopPropagation()
    if (!e.target) return
    const target = e.target as HTMLElement
    dropDownList.current!.value = target.textContent || ""
    setIsDropdownOpen(false)
    setIsOptionSelected(true)
    selectedValue(target.innerText)
  }

  const generatedList = useMemo(() => {
    return listOption.map((option) => {
      console.log("generateList")
      return (
        <li onClick={selectedOption} key={option.id}>
          {option.label}
        </li>
      )
    })
  }, [listOption])

  const generatedOption = useMemo(() => {
    return listOption.map((option) => {
      console.log("option generate")
      return <option key={option.id}>{option.label}</option>
    })
  }, [listOption])

  const handleClick: React.MouseEventHandler<HTMLSelectElement> = (e) => {
    console.log("handleClick on select")
    e.stopPropagation()
    e.preventDefault()
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleOutsideClick)
    } else {
      document.removeEventListener("click", handleOutsideClick)
    }

    console.log("useEffect initial")
    const customDropdown = document.querySelector(".dropdown-list")
    if (customDropdown) {
      customDropdown.children[0].setAttribute("disabled", "")
    }

    if (customList.current) {
      const heightListElement = (
        customList.current.children[0] as HTMLLIElement
      ).offsetHeight
      if (listOption.length - 1 > 7) {
        customList.current.style.maxHeight = heightListElement * 7 + "px"
      }
    }
    console.log(isOptionSelected)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [isDropdownOpen])

  return (
    <div className="custom-select">
      <label>
        Dropdown Menu
        <div className="dropdown-container" ref={dropdownContainer}>
          <div className="select-input">
            <select
              name="sample"
              className={`dropdown-list ${isOptionSelected ? "selected" : ""}`}
              ref={dropDownList}
              onMouseDown={handleClick}
            >
              <option>Select an option</option>
              {generatedOption}
            </select>
            <span onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className={isDropdownOpen ? "arrowDown" : "arrowUp"}
                viewBox="0 0 16 16"
              >
                <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </span>
          </div>
          <div
            className={`${
              isDropdownOpen ? "slideDropdown" : ""
            } custom-dropdown`}
          >
            <div className="custom-dropdown__outer-container">
              <ul className="custom-dropdown__custom-list" ref={customList}>
                {generatedList}
              </ul>
            </div>
          </div>
        </div>
      </label>
    </div>
  )
}

export default DropdownList
