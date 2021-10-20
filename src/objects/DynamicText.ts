import { fabric } from 'fabric'
import { groupBy, uniqueId, pick } from 'lodash'
const REGEX_VAR = new RegExp(/\{\{[a-zA-Z0-9-_]+?\}\}/g)

export class DynamicTextObject extends fabric.Textbox {
  static type = 'DynamicText'
  public metadata: any
  initiated = false
  triggered = false
  keyValues = []
  keys = []
  keysBounds = []
  prevKey = ''
  originalText = ''

  updateKeyValues() {
    let updatedKeyValues = []
    const initialParams = this.getParamsFromKeys(this.text)
    initialParams.forEach(ip => {
      const existingParam = this.keyValues.find(kv => kv.key === ip.key)
      if (existingParam) {
        updatedKeyValues = updatedKeyValues.concat(existingParam)
      } else {
        updatedKeyValues = updatedKeyValues.concat({
          key: ip.key,
          value: ip.key.substring(2, ip.key.length - 2)
        })
      }
    })
    this.keyValues = updatedKeyValues
  }

  setValuesForKeys() {
    let keyParams = []
    this.keyValues.forEach(keyValue => {
      const value = keyValue.value
      const key = keyValue.key
      const regex = new RegExp(key, 'g')
      const matches = this.text.matchAll(regex)

      let params = []

      for (const match of matches) {
        const matchWord = match['0']
        const startIndex = match['index']
        params = params.concat({
          key: matchWord,
          startIndex: startIndex,
          endIndex: startIndex + matchWord.length,
          id: uniqueId(matchWord)
        })
      }

      params.forEach(param => {
        const id = uniqueId(param.key)
        const keyParam = this.replaceKeyWithValue(key, value, id)
        keyParams = keyParams.concat(keyParam)
      })
    })
    return keyParams
  }

  getParamsFromKeys(text) {
    let params = []
    const matches = text.matchAll(REGEX_VAR)
    for (const match of matches) {
      const matchWord = match['0']
      const startIndex = match['index']
      params = params.concat({
        key: matchWord,
        startIndex: startIndex,
        endIndex: startIndex + matchWord.length,
        id: uniqueId(matchWord)
      })
    }
    return params
  }

  updateParams() {
    this.updateKeyValues()
    this.setValuesForKeys()
    this.setKeyBounds()
    this.updateKeys()
  }

  updateKeys() {
    setTimeout(() => {
      let keys = []
      let textLines = this.getUpdatedTextLines()
      textLines.forEach(textLine => {
        const params = this.getKeysFromTextStyles(textLine.lineStyles)
        params.forEach(param => {
          keys = keys.concat(param.key.substring(2, param.key.length - 2))
        })
      })
      this.keys = keys
    }, 150)
  }

  replaceKeyWithValue(key, value, id) {
    const matchIndex = this.text.search(key)
    const styles = Array(value.length).fill({
      textBackgroundColor: '#d4d1cb',
      fill: '#29251f',
      key: key,
      id: id,
      value: value
    })

    if (matchIndex > -1) {
      this.insertChars(value, styles, matchIndex, matchIndex + key.length)
      return {
        id,
        key,
        value,
        startIndex: matchIndex,
        endIndex: matchIndex + value.length
      }
    }
    return false
  }

  replaceValueWithKeyForText(textLine) {
    const params = this.getKeysFromTextStyles(textLine.lineStyles)
    const lineEnding = textLine.breakLine ? '\n' : ''
    const lineVariation = textLine.initialText === textLine.text ? '' : ' '
    if (params.length === 0) {
      return lineVariation + textLine.initialText + lineEnding
    } else {
      let pieces = []
      let textArr = textLine.initialText.split('')
      params.forEach((param, index) => {
        const currentParam = param
        const prevParam = params[index - 1]
        const nextParam = params[index + 1]
        const diff = textLine.startIndex

        // calculate initial section
        if (index === 0) {
          const initialSection = textArr.slice(0, param.startIndex - diff)
          if (initialSection.length > 0) {
            pieces = pieces.concat(initialSection.join(''))
          }
        } else {
          const initialSection = textArr.slice(prevParam.endIndex - diff, currentParam.startIndex - diff)
          if (initialSection.length > 0) {
            pieces = pieces.concat(initialSection.join(''))
          }
        }

        pieces = pieces.concat(param.key.split(''))

        if (!nextParam) {
          const lastSection = textArr.slice(param.startIndex + param.value.length - diff)
          if (lastSection.length > 0) {
            pieces = pieces.concat(lastSection.join(''))
          }
        }
      })
      return lineVariation + pieces.join('') + lineEnding
    }
  }

  getKeysFromTextStyles(textSyles) {
    let charStyles = []
    let params = []
    Object.keys(textSyles).forEach(style => {
      if (textSyles[style].key && textSyles[style].value) {
        charStyles = charStyles.concat({
          index: parseInt(style),
          key: textSyles[style].key,
          value: textSyles[style].value,
          id: textSyles[style].id
        })
      }
    })
    const groupedCharStyles = groupBy(charStyles, 'id')
    Object.keys(groupedCharStyles).forEach(group => {
      const value = groupedCharStyles[group][0].value
      const key = groupedCharStyles[group][0].key
      const indexes = groupedCharStyles[group].map(g => g.index).sort((a, b) => a - b)
      const [startIndex] = [indexes[0]]
      const param = {
        key,
        value,
        startIndex,
        endIndex: startIndex + value.length,
        id: group
      }
      params = params.concat(param)
    })
    return params
  }

  /**
   * Update text lines normalizing text and adding styles by text line
   */
  getUpdatedTextLines() {
    let allText = this.text
    const textLines = this.textLines
    let updatedTextLines = []
    let textStyleGroupIndex = 0
    let startIndex = 0
    let lineIndex = 0

    textLines.forEach((textLine, index) => {
      let currentTextLine = textLine
      let isBreakLine = false
      lineIndex = index
      const prevUpdatedLine = updatedTextLines[index - 1]
      if (allText[0] === '\n') {
        allText = allText.substring(1)
        textStyleGroupIndex += 1
        if (index) {
          prevUpdatedLine.breakLine = true
        }
      } else {
        const textLineChange = index ? ' ' : ''
        currentTextLine = textLineChange + currentTextLine
      }

      const initialPart = allText.substring(0, currentTextLine.length)
      const remainingPart = allText.substring(currentTextLine.length)

      if (index) {
        if (prevUpdatedLine.breakLine) {
          startIndex = 0
        } else {
          startIndex = prevUpdatedLine.startIndex + prevUpdatedLine.text.length + 1
        }
      }

      allText = remainingPart
      updatedTextLines = updatedTextLines.concat({
        text: initialPart,
        breakLine: isBreakLine,
        textStyleGroupIndex,
        startIndex,
        lineIndex: lineIndex,
        initialText: textLine
      })
    })

    const textStyleGroups = this.styles
    const updatedTextLinesWithStyles = updatedTextLines.map(updatedTextLine => {
      const textStyleGroup = textStyleGroups[updatedTextLine.textStyleGroupIndex]
      const indexes = Array(updatedTextLine.text.length)
        .fill(0)
        .map((_, i) => (updatedTextLine.startIndex + i).toString())
      const lineStyles = pick(textStyleGroup, indexes)
      return { ...updatedTextLine, lineStyles }
    })

    return updatedTextLinesWithStyles
  }

  setKeyBounds() {
    setTimeout(() => {
      let keysBounds = []
      let textLines = this.getUpdatedTextLines()
      textLines.forEach(textLine => {
        const lineHeight = this.__lineHeights[parseInt(textLine.textStyleGroupIndex)]
        const params = this.getKeysFromTextStyles(textLine.lineStyles)
        const linekeyBounds = params.map(param => {
          const charBounds = this.__charBounds[textLine.lineIndex].map(cbs => ({
            ...cbs,
            top: lineHeight * textLine.lineIndex
          }))
          const charBoundMin = charBounds[param.startIndex - textLine.startIndex]
          const charBoundMax = charBounds[param.endIndex - textLine.startIndex]
          if (!charBoundMin || !charBoundMax) {
            return {}
          }
          const lineWidth = this.__lineWidths[textLine.lineIndex]
          const width = this.width
          let shift = 0
          if (this.textAlign === 'center') {
            shift = (width - lineWidth) / 2
          } else if (this.textAlign == 'right') {
            shift = width - lineWidth
          }
          const charBound = {
            ...charBoundMin,
            ...param,
            shift,
            left: shift + charBoundMin.left,
            top: charBoundMin.top,
            width: charBoundMax.width + charBoundMax.left - charBoundMin.left,
            height: charBoundMin.height
          }
          return charBound
        })
        keysBounds = keysBounds.concat(linekeyBounds)
      })
      this.keysBounds = keysBounds
    }, 250)
  }

  /**
   * Replace all values with keys
   */
  replaceValueWithKey() {
    let textLines = this.getUpdatedTextLines()
    let updatedText = ''
    textLines.forEach(textLine => {
      const originalText = this.replaceValueWithKeyForText(textLine)
      updatedText += originalText
    })
    this.insertChars(updatedText, null, 0, this.text.length)
  }

  // [IMPORTANT] ONLY one value at a time will be updated
  updateExistingValues() {
    let textLines = this.getUpdatedTextLines()
    textLines.forEach(textLine => {
      const params = this.getKeysFromTextStyles(textLine.lineStyles)
      params.forEach(param => {
        const newParam = this.keyValues.find(kv => kv.key === param.key)

        if (newParam.value !== param.value) {
          const { key, value } = newParam
          const styles = Array(value.length).fill({
            textBackgroundColor: '#d4d1cb',
            fill: '#29251f',
            key: key,
            id: param.id,
            value: value
          })
          const textLinesLenght = textLines
            .map(tl => tl.initialText.length)
            .slice(0, textLine.lineIndex)
            .concat(0)
            .reduce((a, b) => a + b)
          const a = textLinesLenght - textLine.startIndex + param.startIndex + textLine.lineIndex
          const b = textLinesLenght - textLine.startIndex + param.endIndex + textLine.lineIndex
          this.removeStyleFromTo(a, b)
          this.insertChars(value, styles, a, b)
          this.canvas.renderAll()
        }
      })
    })
    this.updateKeyValues()
  }

  removeEmptyText() {
    if (!this.text) {
      this.canvas.remove(this)
    }
  }

  handleKeyDown(e) {
    const key = e.key
    if (this.triggered && this.isEditing) {
      const eventData = {
        object: this,
        isEditing: this.isEditing,
        visible: false,
        position: {
          left: 0,
          top: 0
        },
        key: null
      }
      this.canvas.fire('text:key:selected', eventData)
    }
    if (key === '{') {
      if (this.prevKey === '{') {
        const currentPosition = this.selectionStart
        if (this.text[currentPosition - 1] === '{') {
          const canvasPosition = this.getCanvasBoundingClientRect()
          const cursorLocation = this.get2DCursorLocation()
          const zoom = this.canvas.getZoom()
          const charbounds = [].concat(...this.__charBounds)
          const charBound = charbounds[this.selectionStart]
          const { scaleX, scaleY, width, height } = this
          const { left, top } = this.getBoundingRect(false)
          const padLeft = (width * scaleX * zoom - width) / 2
          const padTop = (height * scaleY * zoom - height) / 2

          const eventData = {
            object: this,
            isEditing: this.isEditing,
            visible: true,
            position: {
              left: canvasPosition.left + left + padLeft + charBound.left,
              top:
                canvasPosition.top + top + padTop + (cursorLocation.lineIndex + 1) * charBound.height * zoom
            },
            key: undefined
          }
          this.canvas.fire('text:key:selected', eventData)
          this.triggered = true
        }
      } else {
        this.prevKey = '{'
      }
    }
  }

  getCanvasBoundingClientRect() {
    const canvasEl = document.getElementById('canvas')
    const position = {
      left: canvasEl?.getBoundingClientRect().left,
      top: canvasEl?.getBoundingClientRect().top
    }
    return position
  }

  triggerKeysMenu() {
    this.setCoords()
    const canvasPosition = this.getCanvasBoundingClientRect()
    const zoom = this.canvas.getZoom()
    const { scaleX, scaleY, width, height } = this
    const { left, top } = this.getBoundingRect(false)
    const padLeft = (width * scaleX * zoom - width) / 2
    const padTop = (height * scaleY * zoom - height) / 2
    const cursorLocation = this.get2DCursorLocation()
    const charBounds = this.__charBounds
    const charBound = charBounds[cursorLocation.lineIndex][cursorLocation.charIndex]
    const eventData = {
      object: this,
      isEditing: this.isEditing,
      visible: true,
      position: {
        left: canvasPosition.left + left + padLeft + charBound.left,
        top: canvasPosition.top + top + padTop + (cursorLocation.lineIndex + 1) * charBound.height * zoom
      },
      key: undefined
    }
    this.canvas.fire('text:key:selected', eventData)
  }

  insertKey(value) {
    const initial = this.selectionStart
    const end = this.selectionEnd
    if (this.text[initial - 1] === '{') {
      this.insertChars(value, null, initial - 2, end)
      this.selectionStart = initial + value.length - 2
    } else {
      this.insertChars(value, null, initial, end)
      this.selectionStart = initial + value.length
    }
    this.exitEditing()
    this.canvas?.renderAll()
    this.enterEditing()
  }

  _set(key, value) {
    if (key === 'keyValues') {
      const keyValues = value ? value : []
      if (keyValues.length > 0) {
        this.keyValues = keyValues
        this.fire('text:keys:updated')
      }
    }
    return super._set(key, value)
  }

  initialize(options) {
    const { text, ...textOptions } = options
    this.keys = []
    this.keysBounds = []
    this.keyValues = options.keyValues ? options.keyValues : []
    this.triggered = false
    let updatedKeyValues = []
    const initialParams = this.getParamsFromKeys(text)
    initialParams.forEach(ip => {
      const existingParam = this.keyValues.find(kv => kv.key === ip.key)
      if (existingParam) {
        updatedKeyValues = updatedKeyValues.concat(existingParam)
      } else {
        updatedKeyValues = updatedKeyValues.concat({
          key: ip.key,
          value: ip.key.substring(2, ip.key.length - 2)
        })
      }
    })
    this.keyValues = updatedKeyValues
    // @ts-ignore
    super.initialize(text, {
      ...textOptions,
      backgroundColor: 'rgba(255,255,255,0)',
      keyValues: updatedKeyValues,
      editable: false
    })

    this.on('modified', () => {
      this.removeEmptyText()
    })

    this.on('added', () => {
      this.canvas.on('mouse:move', e => {
        if (e.target === this) {
          const pointer = this.canvas.getPointer(e.e, false)
          const key = this.keysBounds.find(key => {
            if (
              pointer.x >= key.left + this.left &&
              pointer.x <= this.left + key.left + key.width &&
              pointer.y >= key.top + this.top &&
              pointer.y <= this.top + key.top + key.height
            ) {
              return true
            } else {
              return false
            }
          })
          if (key) {
            this.hoverCursor = 'pointer'
          } else {
            this.hoverCursor = 'move'
          }
        }
      })
      this.updateParams()
    })

    this.on('mousedblclick', () => {
      this.set('editable', true)
      this.enterEditing()
    })

    this.on('mouseup', e => {
      const pointer = this.canvas.getPointer(e.e, false)
      const key = this.keysBounds.find(key => {
        if (
          pointer.x >= key.left + this.left &&
          pointer.x <= this.left + key.left + key.width &&
          pointer.y >= key.top + this.top &&
          pointer.y <= this.top + key.top + key.height
        ) {
          return true
        } else {
          return false
        }
      })
      if (key && !this.isEditing) {
        const canvasPosition = this.getCanvasBoundingClientRect()
        this.setCoords()
        const zoom = this.canvas.getZoom()
        const { scaleX, scaleY, width, height } = this
        const { left, top } = this.getBoundingRect(false)
        const padLeft = (width * scaleX * zoom - width) / 2
        const padTop = (height * scaleY * zoom - height) / 2

        const eventData = {
          object: this,
          isEditing: this.isEditing,
          visible: true,
          position: {
            left: canvasPosition.left + left + padLeft + key.width * zoom + key.left,
            top: canvasPosition.top + top + padTop + key.height * zoom + key.top
          },
          key
        }
        this.canvas.fire('text:key:selected', eventData)
      }
    })

    this.on('editing:entered', () => {
      const eventData = {
        object: this,
        isEditing: this.isEditing,
        visible: false,
        position: {
          left: 0,
          top: 0
        },
        key: null
      }
      this.canvas.fire('text:key:selected', eventData)

      if (!this.initiated) {
        this.replaceValueWithKey()
        this.initiated = true
        this.exitEditing()
      }
      window.addEventListener('keydown', this.handleKeyDown.bind(this))
    })

    this.on('editing:exited', () => {
      if (this.initiated) {
        this.enterEditing()
        this.initiated = false
      } else {
        this.updateParams()
        this.set('editable', false)
      }
      const eventData = {
        object: this,
        isEditing: this.isEditing,
        visible: false,
        position: {
          left: 0,
          top: 0
        },
        key: null
      }
      this.canvas.fire('text:key:selected', eventData)
      window.removeEventListener('keydown', this.handleKeyDown.bind(this))
    })

    this.on('text:keys:updated', () => {
      if (!this.isEditing) {
        this.updateExistingValues()
      }
    })
    return this
  }

  getText() {
    let textLines = this.getUpdatedTextLines()
    let updatedText = ''
    textLines.forEach(textLine => {
      const originalText = this.replaceValueWithKeyForText(textLine)
      updatedText += originalText
    })
    return updatedText
  }

  toObject(propertiesToInclude = []) {
    const originalText = this.getText()
    return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {
      keys: this.keys,
      originalText: originalText,
      metadata: this.metadata
    })
  }
  toJSON(propertiesToInclude = []) {
    const originalText = this.getText()
    return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {
      keys: this.keys,
      originalText: originalText,
      metadata: this.metadata
    })
  }
  static fromObject(options, callback) {
    return callback && callback(new fabric.DynamicText(options))
  }
}

fabric.DynamicText = fabric.util.createClass(DynamicTextObject, {
  type: DynamicTextObject.type
})
fabric.DynamicText.fromObject = DynamicTextObject.fromObject

export type DynamicTextOptions = fabric.ITextboxOptions & { text: string; metadata: any }

declare module 'fabric' {
  namespace fabric {
    class DynamicText extends DynamicTextObject {
      metadata: any
      constructor(options: DynamicTextOptions)
    }
  }
}
