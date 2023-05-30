import React, { useEffect, useRef, useState } from "react"
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io"
import "./App.css"
const listOption = [
  "Select an option",
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
  "Option 8",
]
const CustomSelect = () => {
  //ref
  const dropDownList = useRef(null)
  const customList = useRef(null)

  //useState's
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // functions
  const handleOutsideClick = (e: any) => {
    if (!e.target.closest(".custom-select")) {
      setIsDropdownOpen(false)
    }
  }
  const selectedOption = (e: any) => {
    e.stopPropagation()
    dropDownList.current.value = e.target.textContent
    setIsDropdownOpen(false)
    console.log(e.target.innerText)
  }

  const handleClick = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    setIsDropdownOpen(!isDropdownOpen)
  }

  //useEffect
  useEffect(() => {
    const customDropdown = document.querySelector(".dropdown-list")
    customDropdown.children[0].setAttribute("disabled", "")

    if (customList.current) {
      const heightListElement = customList.current.children[0].offsetHeight
      if (listOption.length - 1 > 7) {
        customList.current.style.maxHeight = heightListElement * 7 + "px"
        //element.style.maxHeight = "200px";
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
          >
            {listOption.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          {isDropdownOpen ? (
            <span>
              <IoIosArrowUp onClick={handleClick} />
            </span>
          ) : (
            <span>
              <IoIosArrowDown onClick={handleClick} />
            </span>
          )}
        </div>
        {isDropdownOpen && (
          <div className="custom-dropdown">
            <div className="custom-dropdown__outer-container">
              <ul className="custom-dropdown__custom-list" ref={customList}>
                {listOption.map((option) => {
                  return option === "Select an option" ? null : (
                    <li onClick={selectedOption} key={option}>
                      {option}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}
      </label>
    </div>
  )
}

export default CustomSelect
