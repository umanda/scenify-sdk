import { ObjectType } from '../common/constants'

class ExportObject {
  run(item, options) {
    let object
    switch (item.type) {
      case ObjectType.STATIC_IMAGE:
        object = this[ObjectType.STATIC_IMAGE](item, options)
        break
      case ObjectType.STATIC_TEXT:
        object = this[ObjectType.STATIC_TEXT](item, options)
        break
      case ObjectType.STATIC_VECTOR:
        object = this[ObjectType.STATIC_VECTOR](item, options)
        break
      case ObjectType.STATIC_PATH:
        object = this[ObjectType.STATIC_PATH](item, options)
        break
      case ObjectType.DYNAMIC_TEXT:
        object = this[ObjectType.DYNAMIC_TEXT](item, options)
        break
      case ObjectType.DYNAMIC_IMAGE:
        object = this[ObjectType.DYNAMIC_IMAGE](item, options)
        break
    }
    return object
  }

  [ObjectType.STATIC_TEXT](item, options) {
    const baseOptions = this.getBaseOptions(item, options)
    const { fontFamily, textAlign, fontSize, fontWeight, charSpacing, lineHeight, fill, text, angle } = item
    const metadata = {
      ...item.metadata,
      angle,
      fill,
      fontWeight,
      charspacing: charSpacing,
      fontSize: fontSize,
      template: text,
      fontFamily,
      textAlign,
      lineheight: lineHeight,
      text: item.text
    }

    const object = {
      ...baseOptions,
      metadata
    }

    return object
  }

  [ObjectType.DYNAMIC_TEXT](item, options) {
    const baseOptions = this.getBaseOptions(item, options)
    const {
      fontFamily,
      textAlign,
      fontSize,
      fontWeight,
      charSpacing,
      lineHeight,
      fill,
      angle,
      originalText,
      keyValues
    } = item

    const metadata = {
      ...item.metadata,
      angle,
      fill,
      fontWeight,
      charSpacing,
      fontSize,
      text: originalText,
      fontFamily,
      textAlign,
      lineHeight,
      keyValues,
      keys: item.keys ? item.keys : []
    }

    const object = {
      ...baseOptions,
      metadata
    }

    return object
  }

  [ObjectType.STATIC_IMAGE](item, options) {
    const baseOptions = this.getBaseOptions(item, options)
    const object = {
      ...baseOptions,
      metadata: {
        src: item.src,
        cropX: item.cropX,
        cropY: item.cropY
      }
    }

    return object
  }

  [ObjectType.DYNAMIC_IMAGE](item, options) {
    const { width, height, angle, keyValues, scaleX, scaleY } = item
    const baseOptions = this.getBaseOptions(item, options)
    const metadata = {
      originX: item.originX,
      originY: item.originY,
      angle,
      width,
      height,
      keyValues,
      keys: item.keys ? item.keys : []
    }
    const object = {
      ...baseOptions,
      width: width * scaleX,
      height: height * scaleY,
      scaleX: 1,
      scaleY: 1,
      metadata
    }

    return object
  }

  [ObjectType.STATIC_VECTOR](item, options) {
    const baseOptions = this.getBaseOptions(item, options)

    const object = {
      ...baseOptions,
      metadata: {
        src: item.src
      }
    }

    return object
  }

  [ObjectType.STATIC_PATH](item, options) {
    const baseOptions = this.getBaseOptions(item, options)

    const object = {
      ...baseOptions,
      metadata: {
        value: item.path,
        fill: item.fill
      }
    }

    return object
  }

  getBaseOptions(item, options) {
    const { top, left, width, height, scaleX, scaleY, originX, originY, type } = item
    const baseOptions = {
      left: left - options.left,
      top: top - options.top,
      width: width,
      height: height,
      originX,
      originY,
      scaleX,
      scaleY,
      type
    }
    return baseOptions
  }
}

export default new ExportObject()
