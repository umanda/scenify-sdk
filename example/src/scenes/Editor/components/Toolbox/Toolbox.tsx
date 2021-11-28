import { useEditorContext } from '@scenify/sdk'
import { styled } from 'baseui'
import ToolboxItems from './ToolboxItems'

const Container = styled('div', props => ({
  height: '56px',
  backgroundColor: props.$theme.colors.background,
  boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.15)',
  marginLeft: '1px',
  display: 'flex',
}))
function EditorToolbox() {
  const { activeObject } = useEditorContext()
  const Toolbox = activeObject ? ToolboxItems[activeObject.type] : null
  return <Container>{Toolbox ? <Toolbox /> : <ToolboxItems.Default />}</Container>
}

export default EditorToolbox
