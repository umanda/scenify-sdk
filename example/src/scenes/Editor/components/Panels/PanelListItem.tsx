import * as React from 'react'
import { useStyletron } from 'baseui'
import Icons from '../../../../components/icons'
import useAppContext from '../../../../hooks/useAppContext'

function PanelListItem({ label, icon, activePanel }: any) {
  const { setActivePanel } = useAppContext()
  const [css, theme] = useStyletron()
  const Icon = Icons[icon]
  return (
    <div
      onClick={() => setActivePanel(label)}
      className={css({
        width: '84px',
        height: '80px',
        backgroundColor: label === activePanel ? theme.colors.background : theme.colors.primary100,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'Uber Move Text',
        fontWeight: 500,
        fontSize: '0.8rem',
        userSelect: 'none',
        transition: 'all 0.5s',
        gap: '0.1rem',
        ':hover': {
          cursor: 'pointer',
          backgroundColor: theme.colors.background,
          transition: 'all 1s'
        }
      })}
    >
      <Icon size={24} />
      <div>{label}</div>
    </div>
  )
}

export default PanelListItem
