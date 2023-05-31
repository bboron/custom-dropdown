import React, { useEffect, useRef, useState } from "react"
import { listOption } from "./types"
import "./App.css"

interface CustomDropdownProps {
  listOption: listOption[]
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ listOption }) => {
  const dropDownList = useRef<HTMLSelectElement>(null)
  const customList = useRef<HTMLUListElement>(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleOutsideClick = (e: MouseEvent) => {
    if (!e.target) return
    const target = e.target as HTMLElement
    if (!target.closest(".custom-select")) {
      setIsDropdownOpen(false)
    }
  }

  const selectedOption = (e: MouseEvent) => {
    e.stopPropagation()
    if (!e.target) return
    const target = e.target as HTMLElement
    dropDownList.current!.value = target.textContent || ""
    setIsDropdownOpen(false)
    console.log(target.innerText)
    const customDropdown = target.closest(".custom-dropdown")
    if (customDropdown) {
      customDropdown.previousSibling?.firstChild?.setAttribute(
        "style",
        "color: #000"
      )
    }
  }

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsDropdownOpen(!isDropdownOpen)
  }

  // useEffect
  useEffect(() => {
    const customDropdown = document.querySelector(".dropdown-list")
    if (customDropdown) {
      customDropdown.children[0].setAttribute("disabled", "")
    }

    if (customList.current) {
      const heightListElement = customList.current.children[0].offsetHeight
      if (listOption.length - 1 > 7) {
        customList.current.style.maxHeight = heightListElement * 7 + "px"
      }
    }

    document.addEventListener("click", handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [isDropdownOpen])

  return (
    <div className="custom-select">
      <label>
        Dropdown Menu
        <div className="select-input">
          <select
            name="sample"
            className="dropdown-list"
            ref={dropDownList}
            onMouseDown={handleClick}
            style={{ color: "#888" }}
          >
            <option>Select an option</option>
            {listOption.map((option) => (
              <option key={option.id}>{option.label}</option>
            ))}
          </select>
          <span onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className={isDropdownOpen ? "arrowDown" : ""}
              viewBox="0 0 16 16"
            >
              <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </span>
        </div>
        <div
          className={`${isDropdownOpen ? "slideDropdown" : ""} custom-dropdown`}
        >
          <div className="custom-dropdown__outer-container">
            <ul className="custom-dropdown__custom-list" ref={customList}>
              {listOption.map((option) => {
                return (
                  <li onClick={selectedOption} key={option.id}>
                    {option.label}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </label>
    </div>
  )
}

export default CustomDropdown
