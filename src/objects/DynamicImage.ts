import { fabric } from 'fabric'

const imagePath =
  'M50.1207 0H0.87931C0.646103 0 0.422447 0.117422 0.257544 0.326433C0.0926413 0.535444 0 0.818924 0 1.11451V49.8855C0 50.1811 0.0926413 50.4646 0.257544 50.6736C0.422447 50.8826 0.646103 51 0.87931 51H50.1207C50.3539 51 50.5776 50.8826 50.7425 50.6736C50.9074 50.4646 51 50.1811 51 49.8855V1.11451C51 0.818924 50.9074 0.535444 50.7425 0.326433C50.5776 0.117422 50.3539 0 50.1207 0ZM49.2414 48.771H1.75862V2.22902H49.2414V48.771Z M12.0386 23.74C13.1996 23.74 14.3345 23.3957 15.2998 22.7507C16.2651 22.1057 17.0175 21.189 17.4617 20.1164C17.906 19.0438 18.0223 17.8635 17.7958 16.7248C17.5693 15.5862 17.0102 14.5402 16.1893 13.7193C15.3684 12.8984 14.3224 12.3393 13.1838 12.1128C12.0451 11.8863 10.8648 12.0025 9.79222 12.4468C8.71962 12.8911 7.80285 13.6435 7.15785 14.6088C6.51285 15.5741 6.16858 16.709 6.16858 17.87C6.17122 19.426 6.79051 20.9175 7.89078 22.0178C8.99105 23.1181 10.4826 23.7374 12.0386 23.74ZM12.0386 14C12.804 14 13.5522 14.227 14.1886 14.6522C14.8251 15.0775 15.3211 15.6819 15.614 16.389C15.9069 17.0962 15.9835 17.8743 15.8342 18.625C15.6849 19.3757 15.3163 20.0653 14.7751 20.6065C14.2339 21.1477 13.5443 21.5163 12.7936 21.6656C12.0429 21.815 11.2647 21.7383 10.5576 21.4454C9.85044 21.1525 9.24603 20.6565 8.82079 20.0201C8.39555 19.3836 8.16858 18.6354 8.16858 17.87C8.16857 16.8427 8.57598 15.8573 9.30146 15.13C10.0269 14.4026 11.0113 13.9926 12.0386 13.99V14ZM2.93858 41.47C3.18165 41.4697 3.41627 41.3808 3.59858 41.22L19.9386 26.88L24.9386 31.53L30.6786 36.94C30.8722 37.1217 31.13 37.219 31.3954 37.2106C31.6608 37.2021 31.9119 37.0886 32.0936 36.895C32.2752 36.7014 32.3726 36.4435 32.3641 36.1782C32.3557 35.9128 32.2422 35.6617 32.0486 35.48L27.0486 30.74L36.0486 20.89L47.3086 31.37C47.5054 31.5296 47.7554 31.6085 48.0081 31.5908C48.2608 31.5732 48.4974 31.4603 48.6701 31.2749C48.8428 31.0895 48.9387 30.8455 48.9384 30.5921C48.9381 30.3388 48.8417 30.095 48.6686 29.91L36.6686 18.75C36.5741 18.6537 36.46 18.5788 36.3341 18.5305C36.2081 18.4822 36.0732 18.4616 35.9386 18.47C35.8065 18.4745 35.6767 18.505 35.5566 18.56C35.4364 18.6149 35.3283 18.6931 35.2386 18.79L25.5286 29.37L20.6686 24.79C20.4842 24.6214 20.2434 24.5278 19.9936 24.5278C19.7437 24.5278 19.5029 24.6214 19.3186 24.79L2.31858 39.74C2.17543 39.8733 2.07451 40.0456 2.0283 40.2357C1.9821 40.4257 1.99264 40.6251 2.05863 40.8093C2.12461 40.9934 2.24314 41.1541 2.39955 41.2715C2.55595 41.389 2.74336 41.458 2.93858 41.47Z'

//@ts-ignore
export class DynamicImageObject extends fabric.Rect {
  static type = 'DynamicImage'
  keyValues
  getKeyScaling() {
    const { height, width } = this.getBoundingRect()

    let scale = 1
    if (height > 120 && width > 120) {
      scale = 1.5
    }
    if ((height < 80 && height > 70) || (width < 80 && width > 70)) {
      scale = 0.75
    }
    if (height < 70 || width < 70) {
      scale = 0.55
    }
    return scale
  }

  getCanvasBoundingClientRect() {
    const canvasEl = document.getElementById('canvas')
    const position = {
      left: canvasEl?.getBoundingClientRect().left,
      top: canvasEl?.getBoundingClientRect().top
    }
    return position
  }

  _set(key, value) {
    if (key === 'keyValues') {
      const keyValues = value ? value : []
      if (value.length > 0) {
        this.keyValues = keyValues
      } else {
        return super._set(key, this.keyValues)
      }
    }
    return super._set(key, value)
  }

  initialize(options) {
    this.keyValues = options.keyValues
    if (options.keyValues.length < 1) {
      this.keyValues = options.keys.map(key => ({
        key: '{{' + key + '}}',
        value: ''
      }))
    }

    super.initialize({ ...options, strokeWidth: 0, fill: '#ecf0f1' })
    this.on('added', () => {
      this.canvas.on('mouse:move', e => {
        if (e.target === this) {
          const pointer = this.canvas.getPointer(e.e, false)
          const centerPoint = this.getCenterPoint()
          const keyScale = this.getKeyScaling()
          const change = 25 * keyScale
          if (
            pointer.x >= centerPoint.x - change &&
            pointer.x <= centerPoint.x + change &&
            pointer.y >= centerPoint.y - change &&
            pointer.y <= centerPoint.y + change
          ) {
            this.hoverCursor = 'pointer'
          } else {
            this.hoverCursor = 'default'
          }
        }
      })
    })

    this.on('mouseup', () => {
      if (this.hoverCursor === 'pointer') {
        const canvasPosition = this.getCanvasBoundingClientRect()
        this.setCoords()
        const zoom = this.canvas.getZoom()
        const { scaleX, scaleY, width, height } = this
        const boundingRect = this.getBoundingRect(false)
        const padLeft = (width * scaleX * zoom - width) / 2
        const padTop = (height * scaleY * zoom - height) / 2
        const eventData = {
          object: this,
          isEditing: true,
          visible: true,
          position: {
            left: canvasPosition.left + boundingRect.left + padLeft + boundingRect.width / 2,
            top: canvasPosition.top + boundingRect.top + padTop + boundingRect.height / 2
          },
          key: this.keyValues[0]
        }
        this.canvas.fire('text:key:selected', eventData)
      }
    })
    return this
  }

  _renderStroke(ctx) {
    let keyScale = this.getKeyScaling()
    const path = imagePath
    ctx.save()
    // @ts-ignore
    ctx.scale(1 / this.scaleX, 1 / this.scaleY)
    ctx.scale(keyScale, keyScale)
    ctx.translate(-25.5, -25.5)
    ctx.fillStyle = '#000000'
    const icon = new Path2D(path)
    ctx.fill(icon)
    ctx.restore()
  }

  toObject(propertiesToInclude = []) {
    return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {
      keys: this.keyValues.map(param => param.key.substring(2, param.key.length - 2))
    })
  }
  toJSON(propertiesToInclude = []) {
    return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {
      keys: this.keyValues.map(param => param.key.substring(2, param.key.length - 2))
    })
  }
  static fromObject(options, callback) {
    return callback && callback(new fabric.DynamicImage(options))
  }
}

fabric.DynamicImage = fabric.util.createClass(DynamicImageObject, {
  type: DynamicImageObject.type
})
fabric.DynamicImage.fromObject = DynamicImageObject.fromObject

export type DynamicImageOptions = fabric.Rect & { text: string; metadata: any; keys: any; keyValues: any }

declare module 'fabric' {
  namespace fabric {
    class DynamicImage extends DynamicImageObject {
      metadata: any
      constructor(options: DynamicImageOptions)
    }
  }
}
