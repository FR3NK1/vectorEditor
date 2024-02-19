import { fabric } from 'fabric'
import { store } from '../../../app/store/store'
import {
  GradientColor,
  GradientCoordinates,
} from '../../Properties/ui/ChangeShapeColor.tsx/ChangeShapeGradient'
import { addCanvasObject } from './CanvasSlice'

class CanvasManager {
  canvas: fabric.Canvas | null = null
  id: number = 1

  public setCanvas() {
    this.canvas = new fabric.Canvas('canvas', {
      height: 500,
      width: 500,
      backgroundColor: 'white',
      selection: true,
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
        data: {
          id: this.id,
          layer: this.canvas.getObjects().length,
        },
      })
      store.dispatch(addCanvasObject({ id: rect.data.id, type: 'Rect' }))
      this.id++

      this.canvas.add(rect)
      rect.center()
    }
  }
  public addCircle() {
    if (this.canvas) {
      const circle = new fabric.Circle({
        fill: 'green',
        radius: 100,
        data: {
          id: this.id,
          layer: this.canvas.getObjects().length,
        },
      })
      store.dispatch(addCanvasObject({ id: circle.data.id, type: 'Circle' }))
      this.id++

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
        data: {
          id: this.id,
          layer: this.canvas.getObjects().length,
        },
      })
      store.dispatch(addCanvasObject({ id: triangle.data.id, type: 'Triangle' }))
      this.id++

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
      this.canvas?.renderAll()
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
      this.canvas?.renderAll()
    }
  }
  public moveTo(objectId: number, layer: number) {
    const object = this.canvas?.getObjects().find((item) => item.data.id === objectId)
    if (object) {
      object.moveTo(layer)
      this.canvas?.renderAll()
    }
  }
}

export const canvasManager = new CanvasManager()
