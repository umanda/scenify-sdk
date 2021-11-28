import * as React from 'react'
import { PanelType } from '../constants/app-options'
import { SubMenuType } from '../constants/editor'
import { createContext, useState, FC } from 'react'

type Template = any
interface IAppContext {
  isMobile: boolean | undefined
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>
  templates: Template[]
  setTemplates: (templates: Template[]) => void
  shapes: any[]
  setShapes: (templates: any[]) => void
  activePanel: PanelType
  setActivePanel: (option: PanelType) => void
  activeSubMenu: SubMenuType | null
  setActiveSubMenu: (option: SubMenuType) => void
}

export const AppContext = createContext<IAppContext>({
  isMobile: false,
  setIsMobile: () => {},
  templates: [],
  setTemplates: () => {},
  shapes: [],
  setShapes: () => {},
  activePanel: PanelType.TEMPLATES,
  setActivePanel: () => {},
  activeSubMenu: null,
  setActiveSubMenu: (value: SubMenuType) => {}
})

export const AppProvider: FC = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(undefined)
  const [templates, setTemplates] = useState<Template[]>([])
  const [shapes, setShapes] = useState<Template[]>([])
  const [activePanel, setActivePanel] = useState<PanelType>(PanelType.TEMPLATES)
  const [activeSubMenu, setActiveSubMenu] = useState<SubMenuType | null>(null)
  const context = {
    isMobile,
    setIsMobile,
    templates,
    setTemplates,
    activePanel,
    setActivePanel,
    shapes,
    setShapes,
    activeSubMenu,
    setActiveSubMenu
  }
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
