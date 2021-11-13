import { useContext } from 'react'
import { EditorContext } from '../context'

export function useEditor() {
  const { editor } = useContext(EditorContext)
  return editor
}
