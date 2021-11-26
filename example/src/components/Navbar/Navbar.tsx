import * as React from 'react'
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image
} from '@chakra-ui/react'
import { Logo, Undo, Redo } from '../Icons'
import { useEditor } from '../../../../src'
import template from '../../template'
function Navbar() {
  const [previewImage, setPreviewImage] = React.useState<any>(null)
  const editor = useEditor()
  const [historyStatus, setHistoryStatus] = React.useState({ hasUndo: false, hasRedo: false })
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const handlePreview = async () => {
    // @ts-ignore
    const image = await editor.toPNG({})
    setPreviewImage(image)
    onOpen()
  }

  return (
    <Box
      style={{
        height: '70px',
        flex: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem'
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: '1rem'
          }}
        >
          <Logo size={44} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Box onClick={() => editor?.undo()} sx={{ color: historyStatus.hasUndo ? '#333333' : '#c9c9c9' }}>
            <Undo size={24} />
          </Box>
          <Box onClick={() => editor?.redo()} sx={{ color: historyStatus.hasRedo ? '#333333' : '#c9c9c9' }}>
            <Redo size={24} />
          </Box>
        </Box>
      </Box>
      <Box>
        <Button colorScheme="gray" onClick={handlePreview}>
          Preview
        </Button>
      </Box>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Image src={previewImage} />
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Navbar
