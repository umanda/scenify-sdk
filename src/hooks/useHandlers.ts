import { useContext } from 'react'
import { EditorContext } from '../context'

export function useHandlers() {
  const { handlers } = useContext(EditorContext)

  return handlers
}
