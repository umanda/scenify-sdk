import * as React from 'react'
import { Box } from '@chakra-ui/react'
import { Logo, Undo, Redo } from '../Icons'
import { useEditor } from '../../../../src'

function Navbar() {
  const editor = useEditor()
  const [historyStatus, setHistoryStatus] = React.useState({ hasUndo: false, hasRedo: false })

  React.useEffect(() => {
    const handleHistoryChange = data => {
      setHistoryStatus({ ...historyStatus, hasUndo: data.hasUndo, hasRedo: data.hasRedo })
    }
    if (editor) {
      editor.on('history:changed', handleHistoryChange)
    }
    return () => {
      if (editor) {
        editor.off('history:changed', handleHistoryChange)
      }
    }
  }, [editor])
  return (
    <Box style={{ height: '70px', flex: 'none', backgroundColor: '#25004f', display: 'flex', gap: '1rem' }}>
      <Box
        sx={{
          color: '#ffffff',
          height: '70px',
          width: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Logo size={44} />
      </Box>
      <Box sx={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Box sx={{ color: historyStatus.hasUndo ? '#ffffff' : 'rgba(255,255,255,0.5)' }}>
          <Undo size={24} />
        </Box>
        <Box sx={{ color: historyStatus.hasRedo ? '#ffffff' : 'rgba(255,255,255,0.5)' }}>
          <Redo size={24} />
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
