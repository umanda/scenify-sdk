import { ObjectType, SCALE_FACTOR } from '../common/constants'

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
    }
    return object
  }

  [ObjectType.STATIC_TEXT](item, options) {
    const baseOptions = this.getBaseOptions(item, options)
    const { fontFamily, textAlign, fontSize, fontWeight, charSpacing, lineHeight, fill, text, angle } = item
    const scaledFontSize = fontSize / SCALE_FACTOR
    const metadata = {
      ...item.metadata,
      angle,
      fill,
      fontWeight,
      charspacing: charSpacing,
      fontSize: scaledFontSize,
      template: text,
      fontFamily,
      textAlign,
      lineheight: lineHeight,
      text: item.text,
    }

    const object = {
      ...baseOptions,
      metadata,
    }

    return object
  }

  [ObjectType.STATIC_IMAGE](item, options) {
    const baseOptions = this.getBaseOptions(item, options)
    const object = {
      ...baseOptions,
      metadata: {
        src: item.src,
      },
    }

    return object
  }

  [ObjectType.STATIC_VECTOR](item, options) {
    const baseOptions = this.getBaseOptions(item, options)

    const object = {
      ...baseOptions,
      metadata: {
        src: item.src,
      },
    }

    return object
  }

  [ObjectType.STATIC_PATH](item, options) {
    const baseOptions = this.getBaseOptions(item, options)

    const object = {
      ...baseOptions,
      metadata: {
        value: item.path,
        fill: item.fill,
      },
    }

    return object
  }

  getBaseOptions(item, options) {
    const { top, left, width, height, scaleX, scaleY, originX, originY, type } = item
    const baseOptions = {
      left: left / SCALE_FACTOR - options.left / SCALE_FACTOR,
      top: top / SCALE_FACTOR - options.top / SCALE_FACTOR,
      width: width / SCALE_FACTOR,
      height: height / SCALE_FACTOR,
      originX,
      originY,
      scaleX,
      scaleY,
      type,
    }
    return baseOptions
  }
}

export default new ExportObject()
