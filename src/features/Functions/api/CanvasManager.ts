import { fabric } from 'fabric'

class CanvasManager {
  canvas: fabric.Canvas | null = null

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
    const rect = new fabric.Rect({
      fill: 'red',
      width: 200,
      height: 200,
    })
    if (this.canvas) {
      this.canvas.add(rect)
      rect.center()
    }
  }
  public addCircle() {
    const circle = new fabric.Circle({
      fill: 'green',
      radius: 100,
    })
    if (this.canvas) {
      this.canvas.add(circle)
      circle.center()
    }
  }
  public addTriangle() {
    const triangle = new fabric.Triangle({
      fill: 'blue',
      width: 200,
      height: 200,
    })
    if (this.canvas) {
      this.canvas.add(triangle)
      triangle.center()
    }
  }
  public changeSelectionColor(color: string) {
    const selectionGroup = this.canvas?.getActiveObject() as any
    if ('_objects' in selectionGroup) {
      selectionGroup._objects.forEach((selectionElement: any) => {
        selectionElement.set('fill', color)
      })
    } else if (selectionGroup) {
      selectionGroup.set('fill', color)
    }
    this.canvas?.renderAll()
  }
}

export const canvasManager = new CanvasManager()