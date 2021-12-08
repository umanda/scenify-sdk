// @ts-nocheck
import { fabric } from 'fabric'
import gsap from 'gsap'
import { Renderer } from '../../common/interfaces'

const renderer: Renderer = config =>
  new Promise((resolve, reject) => {
    try {
      const { width, height, fps, makeScene, silent = true } = config
      const canvas = new fabric.StaticCanvas(null, {
        width,
        height,
        backgroundColor: '#ffffff'
      })
      const anim = gsap.timeline()
      let frames: string[] = []
      let totalFrames: number
      let frameDuration = 0
      let currentFrame = 0
      gsap.ticker.fps(fps)

      const renderFrames = () => {
        anim.progress(currentFrame++ / totalFrames)
        if (currentFrame <= totalFrames) {
          canvas.renderAll()
          frames.push(canvas.toDataURL())
          renderFrames()
        } else {
          resolve({ frames, frameDuration: frameDuration })
        }
      }
      makeScene(fabric, canvas, anim, () => {
        const duration = anim.duration()
        totalFrames = Math.max(1, Math.ceil((duration / 1) * fps))
        frameDuration = duration / totalFrames
        renderFrames()
      })
    } catch (err) {
      console.log(err)
      reject(new Error('An error occured in the renderer.'))
    }
  })

export default renderer
