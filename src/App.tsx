import React, { useEffect, useRef, useState } from "react"
import CustomDropdown from "./CustomDropdown"

const listOption = [
  { id: "ID_1", label: "Option 1" },
  { id: "ID_2", label: "Option 2" },
  { id: "ID_3", label: "Option 3" },
  { id: "ID_4", label: "Option 4" },
  { id: "ID_5", label: "Option 5" },
  { id: "ID_6", label: "Option 6" },
  { id: "ID_7", label: "Option 7" },
  { id: "ID_8", label: "Option 8" },
  { id: "ID_9", label: "Option 9" },
]

const App = () => {
  return <CustomDropdown listOption={listOption} />
}

export default App
