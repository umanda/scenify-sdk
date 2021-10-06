import { useContext } from 'react'
import { EditorContext } from '../context'

export function useActiveObject<T>() {
  const { activeObject } = useContext(EditorContext)

  return (activeObject as unknown) as T
}
