import { fabric } from 'fabric'
// @ts-ignore
export class BackgroundObject extends fabric.Rect {
  static type = 'Background'
  initialize(options: BackgroundOptions) {
    super.initialize({
      ...options,
      selectable: false,
      hasControls: true,
      hasBorders: false,
      lockMovementY: true,
      lockMovementX: true,
      strokeWidth: 0,
      evented: true,
      hoverCursor: 'default'
    })
    return this
  }

  toObject(propertiesToInclude: string[] = []) {
    return super.toObject(propertiesToInclude)
  }
  toJSON(propertiesToInclude: string[] = []) {
    return super.toObject(propertiesToInclude)
  }

  static fromObject(options: BackgroundOptions, callback) {
    return callback && callback(new fabric.Background(options))
  }
}

fabric.Background = fabric.util.createClass(BackgroundObject, {
  type: BackgroundObject.type
})
fabric.Background.fromObject = BackgroundObject.fromObject

export interface BackgroundOptions extends fabric.IRectOptions {
  id: string
  name: string
  description?: string
}

declare module 'fabric' {
  namespace fabric {
    class Background extends BackgroundObject {
      constructor(options: BackgroundOptions)
    }
  }
}
