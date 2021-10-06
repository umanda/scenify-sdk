import { fabric } from 'fabric'
import { ObjectType, SCALE_FACTOR } from '../common/constants'
import { loadImageFromURL } from './image-loader'
import isNaN from 'lodash/isNaN'

class ObjectToFabric {
  async run(item, options) {
    let object
    switch (item.type) {
      case ObjectType.STATIC_TEXT:
        object = await this[ObjectType.STATIC_TEXT](item, options)
        break
      case ObjectType.STATIC_IMAGE:
        object = await this[ObjectType.STATIC_IMAGE](item, options)
        break
      case ObjectType.STATIC_VECTOR:
        object = await this[ObjectType.STATIC_VECTOR](item, options)
        break
      case ObjectType.STATIC_PATH:
        object = await this[ObjectType.STATIC_PATH](item, options)
        break
    }
    return object
  }

  [ObjectType.STATIC_TEXT](item, options) {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options)
        const metadata = item.metadata
        const { textAlign, fontFamily, fontSize, fontWeight, charSpacing, lineheight, text } = metadata
        const textOptions = {
          ...baseOptions,
          text: text ? text : 'Default Text',
          ...(textAlign && { textAlign }),
          ...(fontFamily && { fontFamily }),
          ...(fontSize && { fontSize: SCALE_FACTOR * fontSize }),
          ...(fontWeight && { fontWeight }),
          ...(charSpacing && { charSpacing }),
          ...(lineheight && { lineheight }),
        }
        const element = new fabric.StaticText(textOptions)

        const { top, left, width, height } = element

        if (isNaN(top) || isNaN(left)) {
          element.set({
            top: options.top + options.height / 2 - height / 2,
            left: options.left + options.width / 2 - width / 2,
          })
        }

        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.STATIC_IMAGE](item, options) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options)
        const src = item.metadata.src
        const image: any = await loadImageFromURL(src)

        const { width, height } = baseOptions
        if (!width || !height) {
          baseOptions.width = image.width
          baseOptions.height = image.height
        }

        const element = new fabric.StaticImage(image, baseOptions)

        const { top, left } = element

        if (isNaN(top) || isNaN(left)) {
          element.set({
            top: options.top,
            left: options.left,
          })
          element.scaleToWidth(320)
        }
        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.STATIC_PATH](item, options) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options)
        const path = item.metadata.value
        const fill = item.metadata.fill
        const element = new fabric.StaticPath({ ...baseOptions, path, fill: fill ? fill : '#000000' })

        const { top, left } = element

        if (isNaN(top) || isNaN(left)) {
          element.set({
            top: options.top,
            left: options.left,
          })
          element.scaleToWidth(320)
        }
        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.STATIC_VECTOR](item, options) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item, options)
        const src = item.metadata.src
        fabric.loadSVGFromURL(src, (objects, opts) => {
          const { width, height, top, left } = baseOptions
          if (!width || !height) {
            baseOptions.width = opts.width
            baseOptions.height = opts.height
            baseOptions.top = options.top
            baseOptions.left = options.left
          }
          const object = new fabric.StaticVector(objects, opts, { ...baseOptions, src })
          if (isNaN(top) || isNaN(left)) {
            object.set({
              top: options.top,
              left: options.left,
            })
            object.scaleToWidth(320)
          }
          resolve(object)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  getBaseOptions(item, options) {
    const { left, top, width, height, scaleX, scaleY } = item
    let metadata = item.metadata ? item.metadata : {}
    const { fill, angle, originX, originY } = metadata
    let baseOptions = {
      angle: angle ? angle : 0,
      top: options.top + top * SCALE_FACTOR,
      left: options.left + left * SCALE_FACTOR,
      width: width * SCALE_FACTOR,
      height: height * SCALE_FACTOR,
      originX: originX || 'left',
      originY: originY || 'top',
      scaleX: scaleX || 1,
      scaleY: scaleY || 1,
      fill: fill || '#000000',
      metadata: metadata,
    }
    return baseOptions
  }
}

export default new ObjectToFabric()
