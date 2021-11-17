import { useContext } from 'react'
import { EditorContext } from '../context'

export function useContextMenuRequest() {
  const { contextMenuRequest } = useContext(EditorContext)
  return contextMenuRequest
}
