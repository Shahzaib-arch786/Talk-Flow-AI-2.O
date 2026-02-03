import { useState } from "react"

export default function usePasswordToggle() {
  const [visible, setVisible] = useState(false)
  return {
    type: visible ? "text" : "password",
    toggle: () => setVisible(v => !v),
    visible,
  }
}
