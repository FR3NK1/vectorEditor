import { fabric } from 'fabric'

class CanvasManager {
  canvas: fabric.Canvas | null = null

  public setCanvas() {
    this.canvas = new fabric.Canvas('canvas', {
      height: 1000,
      width: 1000,
      backgroundColor: 'white',
      selection: true,
    })
  }
  public addRect() {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 200,
      height: 200,
    })
    if (this.canvas) {
      this.canvas.add(rect)
    }
  }
  public addCircle() {
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      fill: 'green',
      radius: 100,
    })
    if (this.canvas) {
      this.canvas.add(circle)
    }
  }
  public changeCanvasSize(width: number, height: number) {
    if (this.canvas) {
      this.canvas.setWidth(width)
      this.canvas.setHeight(height)
    }
  }
}

export const canvasManager = new CanvasManager()
