import gsap, { Linear } from 'gsap'
import { Animations, AnimationType, HandlerOptions } from '../common/interfaces'
import BaseHandler from './BaseHandler'

class AnimationHandler extends BaseHandler {
  private anim: gsap.core.Timeline
  constructor(props: HandlerOptions) {
    super(props)
    this.anim = gsap.timeline({ paused: true })
  }

  public animate = (animation: AnimationType) => {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      activeObject.set('animation', animation)
    }
    this.apply()
  }

  apply = () => {
    this.anim.clear()
    this.anim.pause()
    const objects = this.canvas.getObjects()
    objects.forEach(object => {
      if (object.animation) {
        this.animateObject(object, object.animation)
      }
    })
  }

  animateObject = (object: fabric.Object, animation: AnimationType) => {
    const animations = {
      [Animations.NONE]: {},
      [Animations.TUMBLE]: {
        duration: 0.5,
        left: 0 - object.width,
        angle: 45,
        ease: Linear.easeInOut
      },
      [Animations.STOMP]: {
        duration: 1,
        ease: 'slow(0.7, 0.7, false)',
        scaleX: 1.5 * object.scaleX,
        scaleY: 1.5 * object.scaleY
      },
      [Animations.RISE]: {
        duration: 0.5,
        top: object.top + object.height * 2,
        opacity: 0,
        ease: 'pexpo.out'
      },
      [Animations.PAN]: {
        duration: 0.5,
        left: object.left - (object.width * object.scaleX) / 2,
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
        scaleX: object.scaleX + object.scaleX / 2,
        scaleY: object.scaleY + object.scaleY / 2,
        ease: 'slow(0.7, 0.7, false)'
      }
    }
    if (object && animations[animation]) {
      this.anim.from(
        object,
        {
          ...animations[animation],
          onUpdate: () => {
            this.canvas.requestRenderAll()
          },
          onComplete: () => {
            object.setCoords()
          }
        },
        0
      )
    }
    this.anim.play()
  }
}

export default AnimationHandler
