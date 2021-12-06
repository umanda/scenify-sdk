import gsap, { Bounce, Linear, Expo, Circ, SteppedEase, Elastic } from 'gsap'
import { HandlerOptions } from '../common/interfaces'
import BaseHandler from './BaseHandler'

enum Animations {
  STOMP = 'STOMP',
  TUMBLE = 'TUMBLE',
  RISE = 'RISE',
  PAN = 'PAN',
  FADE = 'FADE',
  BREATHE = 'BREATHE'
}
type AnimationType = keyof typeof Animations

class AnimationHandler extends BaseHandler {
  constructor(props: HandlerOptions) {
    super(props)
  }

  public animate = (animation: AnimationType) => {
    const activeObject = this.canvas.getActiveObject()
    const animations = {
      [Animations.TUMBLE]: {
        duration: 0.5,
        left: 0 - activeObject.width,
        angle: 45,
        ease: Linear.easeInOut
      },
      [Animations.STOMP]: {
        duration: 1,
        ease: 'slow(0.7, 0.7, false)',
        scaleX: 1.5 * activeObject.scaleX,
        scaleY: 1.5 * activeObject.scaleY
      },
      [Animations.RISE]: {
        duration: 0.5,
        top: activeObject.top + activeObject.height * 2,
        opacity: 0,
        ease: 'pexpo.out'
      },
      [Animations.PAN]: {
        duration: 0.5,
        left: activeObject.left - (activeObject.width * activeObject.scaleX) / 2,
        opacity: 0,
        ease: 'pexpo.out'
      },
      [Animations.FADE]: {
        duration: 1,
        opacity: 0,
        ease: 'slow(0.7, 0.7, false)'
      },
      [Animations.BREATHE]: {
        duration: 1,
        scaleX: activeObject.scaleX + activeObject.scaleX / 2,
        scaleY: activeObject.scaleY + activeObject.scaleY / 2,
        ease: 'slow(0.7, 0.7, false)'
      }
    }
    if (activeObject) {
      gsap.from(activeObject, {
        ...animations[animation],
        onUpdate: () => {
          this.canvas.requestRenderAll()
        },
        onComplete: () => {
          activeObject.setCoords()
        }
      })
    }
  }

  public breathe = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      activeObject.set({
        originX: 'center',
        originY: 'center'
      })
      console.log(activeObject.scaleY)
      gsap.from(activeObject, {
        duration: 1,
        scaleX: activeObject.scaleX - activeObject.scaleX / 2,
        scaleY: activeObject.scaleY - activeObject.scaleY / 2,
        ease: 'slow(0.7, 0.7, false)',
        onUpdate: () => {
          this.canvas.requestRenderAll()
        },
        onComplete: () => {
          activeObject.setCoords()
        }
      })
    }
  }

  public stop = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      activeObject.set({
        originX: 'center',
        originY: 'center'
      })
      console.log(activeObject.scaleY)
      gsap.from(activeObject, {
        duration: 1,
        scaleX: activeObject.scaleX + activeObject.scaleX / 2,
        scaleY: activeObject.scaleY + activeObject.scaleY / 2,
        ease: 'slow(0.7, 0.7, false)',
        onUpdate: () => {
          this.canvas.requestRenderAll()
        },
        onComplete: () => {
          activeObject.setCoords()
        }
      })
    }
  }

  public default = () => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      gsap.from(activeObject, {
        duration: 1.5,
        top: 0 - activeObject.height,
        ease: Bounce.easeInOut,
        onUpdate: () => {
          this.canvas.requestRenderAll()
        },
        onComplete: () => {
          activeObject.setCoords()
        }
      })
    }
  }
}

export default AnimationHandler
