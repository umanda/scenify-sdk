import { ObjectType } from '../../common/constants'
import { fabric } from 'fabric'
import { loadImageFromURL } from '../../utils/image-loader'
import { replaceKeyWithValue } from '../../utils/text'

class ObjectToFabric {
  async run(item: any, params: any): Promise<fabric.Object> {
    let object
    switch (item.type) {
      case ObjectType.STATIC_TEXT:
        object = await this[ObjectType.STATIC_TEXT](item)
        break
      case ObjectType.DYNAMIC_TEXT:
        object = await this[ObjectType.DYNAMIC_TEXT](item, params)
        break
      case ObjectType.STATIC_IMAGE:
        object = await this[ObjectType.STATIC_IMAGE](item)
        break
      case ObjectType.DYNAMIC_IMAGE:
        object = await this[ObjectType.DYNAMIC_IMAGE](item, params)
        break
      case ObjectType.STATIC_VECTOR:
        object = await this[ObjectType.STATIC_VECTOR](item)
        break
      case ObjectType.STATIC_PATH:
        object = await this[ObjectType.STATIC_PATH](item)
        break
      case ObjectType.BACKGROUND:
        object = await this[ObjectType.BACKGROUND](item)
        break
      case ObjectType.GROUP:
        object = await this[ObjectType.GROUP](item, params)
        break
    }
    return object as fabric.Object
  }

  [ObjectType.STATIC_TEXT](item: any) {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item)
        const metadata = item.metadata
        const { textAlign, fontFamily, fontSize, fontWeight, charSpacing, lineheight, text } = metadata
        const textOptions = {
          ...baseOptions,
          text: text ? text : 'Default Text',
          ...(textAlign && { textAlign }),
          ...(fontFamily && { fontFamily }),
          ...(fontSize && { fontSize }),
          ...(fontWeight && { fontWeight }),
          ...(charSpacing && { charSpacing }),
          ...(lineheight && { lineheight })
        }
        const element = new fabric.StaticText(textOptions)

        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.DYNAMIC_TEXT](item: any, params: any) {
    return new Promise((resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item)
        const metadata = item.metadata
        const { textAlign, fontFamily, fontSize, fontWeight, charSpacing, lineheight, text, keys } = metadata
        const updatedText = replaceKeyWithValue(text, keys, params)

        const textOptions = {
          ...baseOptions,
          text: updatedText ? updatedText : 'Default Text',
          ...(textAlign && { textAlign }),
          ...(fontFamily && { fontFamily }),
          ...(fontSize && { fontSize }),
          ...(fontWeight && { fontWeight }),
          ...(charSpacing && { charSpacing }),
          ...(lineheight && { lineheight })
        }
        const element = new fabric.StaticText(textOptions)

        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.STATIC_IMAGE](item: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item)
        const src = item.metadata.src

        const image = await loadImageFromURL(src)

        const element = new fabric.StaticImage(image, {
          ...baseOptions,
          cropX: 0,
          cropY: item.metadata.cropY
        })
        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.DYNAMIC_IMAGE](item: any, params: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item)
        const src = params.image

        const image = await loadImageFromURL(src)
        // @ts-ignore
        const element = new fabric.StaticImage(image, {
          ...baseOptions,
          // @ts-ignore
          width: image.width,
          // @ts-ignore

          height: image.height,
          cropX: 0,
          cropY: 0
          // scaleX: 0.2
        })
        element.scaleToWidth(item.width)
        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.STATIC_PATH](item: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item)
        const value = item.metadata.value
        const element = new fabric.Path(value, baseOptions)
        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.GROUP](item, params: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item)
        let objects = []
        for (const object of item.objects) {
          objects = objects.concat(await this.run(object, params))
        }
        const element = new fabric.Group(objects, baseOptions)
        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.BACKGROUND](item) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item)
        // const path = item.metadata.value
        const fill = item.metadata.fill
        const element = new fabric.Background({
          ...baseOptions,
          fill: fill ? fill : '#000000',
          id: 'background',
          name: ''
        })
        resolve(element)
      } catch (err) {
        reject(err)
      }
    })
  }

  [ObjectType.STATIC_VECTOR](item: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const baseOptions = this.getBaseOptions(item)
        const src = item.metadata.src
        fabric.loadSVGFromURL(src, (objects, opts) => {
          const { width, height } = baseOptions
          if (!width || !height) {
            baseOptions.width = opts.width
            baseOptions.height = opts.height
          }
          const object = new fabric.StaticVector(objects, opts, { ...baseOptions, src })

          resolve(object)
        })
      } catch (err) {
        reject(err)
      }
    })
  }

  getBaseOptions(item: any) {
    const {
      left,
      top,
      width,
      height,
      scaleX,
      scaleY,
      opacity,
      flipX,
      flipY,
      skewX,
      skewY,
      stroke,
      strokeWidth,
      animation,
      originX,
      originY,
      angle
    } = item
    let metadata = item.metadata ? item.metadata : {}
    const { fill } = metadata
    let baseOptions = {
      angle: angle,
      top: top,
      left: left,
      width: width,
      height: height,
      originX: originX || 'left',
      originY: originY || 'top',
      scaleX: scaleX || 1,
      scaleY: scaleY || 1,
      fill: fill || '#000000',
      opacity: opacity ? opacity : 1,
      flipX: flipX ? flipX : false,
      flipY: flipY ? flipY : false,
      skewX: skewX ? skewX : 0,
      skewY: skewY ? skewY : 0,
      metadata: metadata,
      stroke,
      strokeWidth,
      animation
    }
    return baseOptions
  }
}

export default new ObjectToFabric()
