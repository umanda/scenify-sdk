import Icons from '../../../icons'
import { Button, KIND, SIZE } from 'baseui/button'
import { StatefulPopover, PLACEMENT } from 'baseui/popover'
import { useEditor } from '@scenify/sdk'

function Position() {
  const editor = useEditor()
  return (
    <StatefulPopover
      focusLock
      placement={PLACEMENT.bottomRight}
      content={({ close }) => (
        <div>
          <div
            style={{
              width: '360px',
              background: '#ffffff',
              fontFamily: 'system-ui',
              fontSize: '0.875rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <PositionItem
                onClick={editor.bringForward}
                icon="Forward"
                label="Forward"
                shortcut="Ctrl + J"
              />
              <PositionItem
                onClick={editor.bringToFront}
                icon="ToFront"
                label="ToFront"
                shortcut="Ctrl + Alt + J"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <PositionItem
                onClick={editor.sendBackwards}
                icon="Backward"
                label="Backward"
                shortcut="Ctrl + ["
              />
              <PositionItem
                onClick={editor.sendToBack}
                icon="ToBack"
                label="ToBack"
                shortcut="Ctrl + Alt + ["
              />
            </div>
          </div>
        </div>
      )}
    >
      <Button size={SIZE.compact} kind={KIND.tertiary}>
        Position
      </Button>
    </StatefulPopover>
  )
}
interface PositionItemProps {
  icon: string
  label: string
  shortcut: string
  onClick: Function
}
const PositionItem = ({ icon, label, shortcut, onClick }: PositionItemProps) => {
  const Icon = Icons[icon]
  return (
    <div onClick={() => onClick()} style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <Icon size={24} />
        <div style={{ paddingLeft: '0.5rem' }}>{label}</div>
      </div>
      <div style={{ color: 'rgba(0,0,0,0.5)' }}>{shortcut}</div>
    </div>
  )
}

export default Position
