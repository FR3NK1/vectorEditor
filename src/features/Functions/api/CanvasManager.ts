import { fabric } from 'fabric'
import {
  GradientColor,
  GradientCoordinates,
} from '../../Properties/ui/ChangeShapeColor.tsx/ChangeShapeGradient'

class CanvasManager {
  canvas: fabric.Canvas | null = null
  id: number = 1

  public setCanvas() {
    this.canvas = new fabric.Canvas('canvas', {
      height: window.innerHeight - 100,
      width: window.innerHeight - 100,
      backgroundColor: 'white',
      selection: true,
    })
    this.canvas.setZoom(0.5)

    this.canvas.on('mouse:wheel', (opt) => {
      if (opt.e.altKey) {
        var delta = opt.e.deltaY
        var zoom = this.canvas?.getZoom() ?? 0
        zoom *= 0.999 ** delta
        if (zoom > 20) zoom = 20
        if (zoom < 0.01) zoom = 0.01
        this.canvas?.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
        opt.e.preventDefault()
        opt.e.stopPropagation()
      }
    })
  }
  public changeCanvasSize(width: number, height: number) {
    if (this.canvas) {
      this.canvas.setWidth(width)
      this.canvas.setHeight(height)
    }
  }

  public addRect() {
    if (this.canvas) {
      const rect = new fabric.Rect({
        fill: 'red',
        width: 200,
        height: 200,
      })

      this.canvas.add(rect)
      rect.center()
    }
  }
  public addCircle() {
    if (this.canvas) {
      const circle = new fabric.Circle({
        fill: 'green',
        radius: 100,
      })

      this.canvas.add(circle)
      circle.center()
    }
  }
  public addTriangle() {
    if (this.canvas) {
      const triangle = new fabric.Triangle({
        fill: 'blue',
        width: 200,
        height: 200,
      })

      this.canvas.add(triangle)
      triangle.center()
    }
  }
  public changeSelectionColor(color: string) {
    const selectionGroup = this.canvas?.getActiveObject() as any
    if (selectionGroup) {
      if ('_objects' in selectionGroup) {
        selectionGroup._objects.forEach((selectionElement: any) => {
          selectionElement.set('fill', color)
        })
      } else {
        selectionGroup.set('fill', color)
      }
      this.canvas?.requestRenderAll()
    }
  }
  public changeSelectionGradient(
    gradientColors: GradientColor[],
    gradientCoordinates: GradientCoordinates,
  ) {
    const selectionGroup = this.canvas?.getActiveObject() as any
    const gradient = new fabric.Gradient({
      type: 'linear',
      gradientUnits: 'percentage',
      coords: gradientCoordinates,
      colorStops: gradientColors,
    })
    if (selectionGroup) {
      if ('_objects' in selectionGroup) {
        selectionGroup._objects.forEach((selectionElement: any) => {
          selectionElement.set('fill', gradient)
        })
      } else {
        selectionGroup.set('fill', gradient)
      }
      this.canvas?.requestRenderAll()
    }
  }

  public deleteSelectedObjects() {
    if (this.canvas) {
      const selectionGroup = this.canvas?.getActiveObject() as any
      if (selectionGroup) {
        if ('_objects' in selectionGroup) {
          selectionGroup._objects.forEach((selectionElement: any) => {
            this.canvas?.remove(selectionElement)
          })
        } else {
          this.canvas.remove(selectionGroup)
        }
        this.canvas.requestRenderAll()
      }
    }
  }

  public renderSVG(data: string) {
    fabric.loadSVGFromString(data, (objects, options) => {
      if (this.canvas) {
        const obj = fabric.util.groupSVGElements(objects, options)

        this.canvas.add(obj)
        this.canvas.requestRenderAll()
      }
    })
  }

  public exportToSvg(fileName: string) {
    if (this.canvas) {
      const svgData = this.canvas.toSVG()
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
      const svgUrl = URL.createObjectURL(svgBlob)
      const downloadLink = document.createElement('a')
      downloadLink.href = svgUrl
      downloadLink.download = fileName + '.svg'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
  }
}

export const canvasManager = new CanvasManager()
