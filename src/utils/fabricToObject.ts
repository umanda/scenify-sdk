import { ObjectType } from '../common/constants'

class ExportObject {
  run(item, options, inGroup = false) {
    let object
    switch (item.type) {
      case ObjectType.STATIC_IMAGE:
        object = this[ObjectType.STATIC_IMAGE](item, options, inGroup)
        break
      case ObjectType.STATIC_TEXT:
        object = this[ObjectType.STATIC_TEXT](item, options, inGroup)
        break
      case ObjectType.STATIC_VECTOR:
        object = this[ObjectType.STATIC_VECTOR](item, options, inGroup)
        break
      case ObjectType.STATIC_PATH:
        object = this[ObjectType.STATIC_PATH](item, options, inGroup)
        break
      case ObjectType.DYNAMIC_TEXT:
        object = this[ObjectType.DYNAMIC_TEXT](item, options, inGroup)
        break
      case ObjectType.DYNAMIC_IMAGE:
        object = this[ObjectType.DYNAMIC_IMAGE](item, options, inGroup)
        break
      case ObjectType.BACKGROUND:
        object = this[ObjectType.BACKGROUND](item, options, inGroup)
        break
      case ObjectType.GROUP:
        object = this[ObjectType.GROUP](item, options, inGroup)
        break
    }
    return object
  }

  [ObjectType.STATIC_TEXT](item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
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

  [ObjectType.DYNAMIC_TEXT](item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
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

  [ObjectType.STATIC_IMAGE](item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
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

  [ObjectType.DYNAMIC_IMAGE](item, options, inGroup) {
    const { width, height, angle, keyValues, scaleX, scaleY } = item
    const baseOptions = this.getBaseOptions(item, options, inGroup)
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

  [ObjectType.STATIC_VECTOR](item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup)

    const object = {
      ...baseOptions,
      metadata: {
        src: item.src
      }
    }

    return object
  }

  [ObjectType.STATIC_PATH](item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup)

    const object = {
      ...baseOptions,
      metadata: {
        value: item.path,
        fill: item.fill
      }
    }

    return object
  }

  [ObjectType.BACKGROUND](item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup)

    const object = {
      ...baseOptions,
      metadata: {
        fill: item.fill
      }
    }

    return object
  }

  [ObjectType.GROUP](item, options, inGroup) {
    const baseOptions = this.getBaseOptions(item, options, inGroup)
    const groupObjects = item.objects.map(object => {
      return this.run(object, options, true)
    })
    return {
      ...baseOptions,
      objects: groupObjects
    }
  }

  getBaseOptions(item, options, inGroup = false) {
    const {
      id,
      name,
      top,
      left,
      width,
      height,
      scaleX,
      scaleY,
      originX,
      originY,
      type,
      stroke,
      strokeWidth,
      opacity,
      angle,
      flipX,
      flipY,
      skewX,
      skewY,
      visible,
      animation
    } = item
    const baseOptions = {
      id,
      name,
      angle,
      stroke,
      strokeWidth,
      left: inGroup ? left : left - options.left,
      top: inGroup ? top : top - options.top,
      width,
      height,
      opacity,
      originX,
      originY,
      scaleX,
      scaleY,
      type,
      flipX,
      flipY,
      skewX,
      skewY,
      visible,
      animation
    }
    return baseOptions
  }
}

export default new ExportObject()
