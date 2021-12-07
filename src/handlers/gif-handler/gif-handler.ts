import { fabric } from 'fabric'
import { Animations, AnimationType } from '../../common/interfaces'
import BaseHandler from '../BaseHandler'
import renderer from './renderer'
import objectToFabric from '../design-handler/objectToFabric'
import { Linear } from 'gsap'
import gifshot from 'gifshot'

class GifHandler extends BaseHandler {
  public async toGif(params: {}) {
    const template = this.handlers.templateHandler.exportToJSON()
    const { frames, frameDuration } = await renderer({
      silent: false,
      width: template.frame.width,
      height: template.frame.height,
      fps: 30,
      makeScene: async (_, canvas, anim, compose) => {
        for (const object of template.objects) {
          const element = await objectToFabric.run(object, params)
          if (element) {
            canvas.add(element)
            if (element.animation) {
              this.animateObject(element, element.animation, anim)
            }
          } else {
            console.log('UNABLE TO LOAD OBJECT: ', object)
          }
        }
        compose()
      }
    })
    const gif = await this.framesToGif(frames, {
      width: template.frame.width,
      height: template.frame.height,
      frameDuration
    })
    return gif
  }

  framesToGif = (images: string[], options: any) => {
    return new Promise((resolve, reject) => {
      gifshot.createGIF(
        {
          images: images,
          gifWidth: options.width,
          gifHeight: options.height,
          frameDuration: 0.0001
        },
        function(obj: any) {
          if (!obj.error) {
            const image = obj.image
            resolve(image)
          } else {
            reject(obj)
          }
        }
      )
    })
  }

  animateObject = (object: fabric.Object, animation: AnimationType, anim: gsap.core.Timeline) => {
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
      anim.from(
        object,
        {
          ...animations[animation]
        },
        0
      )
    }
  }
}

export default GifHandler
