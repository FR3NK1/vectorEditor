import { fabric } from 'fabric'
import { find } from 'lodash'
import { ShapeService } from '../../../app/services/ShapeService'
import { store } from '../../../app/store/store'
import { CanvasSliceActions } from '../../../entities/Canvas/api/CanvasSlice'
import { IShape } from '../../../entities/Shape/model/IShape'
import {
  GradientColor,
  GradientCoordinates,
} from '../../Properties/ui/ChangeShapeColor.tsx/ChangeShapeGradient'

class CanvasManager {
  canvas: fabric.Canvas | null = null
  ungroupedObjects: fabric.Object[] = []
  private drawingEnabled = false
  private points: fabric.Point[] = []
  private previewLine: fabric.Line | null = null
  private temporaryLines: fabric.Line[] = []

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

    this.canvas.on('selection:created', function (obj) {
      const selectedObjectsTypes = obj.selected?.map((item) => item.data?.objectType)
      if (selectedObjectsTypes)
        store.dispatch(CanvasSliceActions.setActiveObject(selectedObjectsTypes))
    })
    this.canvas.on('selection:updated', function (obj) {
      const selectedObjectsTypes = obj.selected?.map((item) => item.data?.objectType)
      if (selectedObjectsTypes)
        store.dispatch(CanvasSliceActions.setActiveObject(selectedObjectsTypes))
    })
    this.canvas.on('selection:cleared', function () {
      store.dispatch(CanvasSliceActions.setActiveObject([]))
    })
  }

  public ungroupActiveObjects() {
    const canvas = this.canvas as any
    var activeObject = canvas.getActiveObject()
    if (activeObject) {
      if (activeObject.type == 'group') {
        var items = activeObject._objects
        activeObject._restoreObjectsState()
        canvas.remove(activeObject)
        for (var i = 0; i < items.length; i++) {
          canvas.add(items[i])
          items[i].dirty = true
          canvas.item(canvas.size() - 1).hasControls = true
          this.ungroupedObjects.push(items[i])
        }

        canvas.renderAll()
      }
    }
  }

  public groupUngroupedObjects() {
    const validObjects = this.ungroupedObjects.filter((obj) =>
      this.canvas?.getObjects().includes(obj),
    )

    if (validObjects.length === 0) {
      console.warn('No valid objects to group.')
      return
    }

    const group = new fabric.Group(validObjects)

    // Удалить объекты из холста перед добавлением группы
    validObjects.forEach((obj) => this.canvas?.remove(obj))

    this.canvas?.add(group)
    this.ungroupedObjects = []
    this.canvas?.requestRenderAll()
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
          objectType: 'Rect',
        },
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
        data: {
          objectType: 'Circle',
        },
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
        data: {
          objectType: 'Triangle',
        },
      })

      this.canvas.add(triangle)
      triangle.center()
    }
  }

  public addShape(shape: IShape) {
    if (this.canvas) {
      const newShape = new fabric.Path(shape.path, {
        fill: shape.fill,
        stroke: shape.stroke,
        strokeWidth: shape.stroke_width,
        width: 200,
        height: 200,
        data: {
          objectType: 'Shape',
        },
      })

      this.canvas.add(newShape)
      newShape.center()
    }
  }

  public addImage(imageElement: HTMLImageElement) {
    if (this.canvas) {
      const newImage = new fabric.Image(imageElement, {
        width: 512,
        height: 512,
        data: {
          objectType: 'Image',
        },
      })

      this.canvas.add(newImage)
      newImage.center()
    }
  }

  public addText() {
    if (this.canvas) {
      const text = new fabric.IText('Sample text', {
        fontFamily: 'Arial',
        left: 100,
        top: 100,
        data: {
          objectType: 'Text',
        },
      })

      this.canvas.add(text)
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

  public getActiveObjectColors() {
    let colors: (string | fabric.Gradient | fabric.Pattern | undefined)[] = []
    if (this.canvas) {
      this.canvas.getActiveObjects().forEach((item) => {
        colors.push(item.fill)
        if ('_objects' in item) {
          const objectItems = item._objects as Array<fabric.Object>
          objectItems.forEach((objectItem) => {
            colors.push(objectItem.fill)
          })
        }
      })
    }
    return colors.filter((item) => String(item).includes('#'))
  }

  public changeActiveObjectColors(newColors: { fromColor: string; toColor: string }[]) {
    if (this.canvas) {
      this.canvas.getObjects().forEach((item) => {
        const itemColor = item.fill as string
        const findColor = find(newColors, ['fromColor', itemColor])
        if (findColor) {
          item.set('fill', findColor.toColor)
        }
        if ('_objects' in item) {
          const objectItems = item._objects as Array<fabric.Object>
          objectItems.forEach((objectItem) => {
            const itemColor = objectItem.fill as string
            const findColor = find(newColors, ['fromColor', itemColor])
            if (findColor) {
              objectItem.set('fill', findColor.toColor)
            }
          })
        }
      })
      this.canvas.renderAll()
    }
  }

  public changeActiveObjectsFont(newFont: string) {
    if (this.canvas) {
      const activeObjects = this.canvas.getActiveObjects()
      activeObjects.forEach((item) => {
        if (item.data?.objectType && item.data.objectType === 'Text')
          item.set('fontFamily', newFont)
      })
      console.log(activeObjects)
      this.canvas.requestRenderAll()
    }
  }

  public startDrawShape() {
    if (!this.canvas) return

    this.enableDrawingMode()
    store.dispatch(CanvasSliceActions.setShapeDrawingEnable(true))
    this.canvas.on('mouse:down', this.handleMouseDown.bind(this))
    this.canvas.on('mouse:move', this.handleMouseMove.bind(this))
  }

  public stopDrawShape() {
    if (!this.canvas) return

    if (this.points.length > 2) {
      this.createClosedShape()
    }
    this.cleanupDrawing()
    store.dispatch(CanvasSliceActions.setShapeDrawingEnable(false))
  }

  private enableDrawingMode() {
    this.drawingEnabled = true
    this.points = []
    this.previewLine = null
    this.temporaryLines = []
  }

  private async createClosedShape() {
    const pathData = this.generatePathData()
    const path = new fabric.Path(pathData, {
      fill: '#ffa94d',
      stroke: '#4dabf7',
      strokeWidth: 2,
    })

    await fetch('http://localhost:3000/shapes', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: pathData,
        fill: '#ffa94d',
        stroke: '#4dabf7',
        stroke_width: 2,
        userId: store.getState().User.userId,
      }),
    })
    store.dispatch(ShapeService.util.invalidateTags(['Shape']))

    this.canvas?.add(path)
    this.canvas?.requestRenderAll()
  }

  private generatePathData(): string {
    const pathData = this.points.map((point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`,
    )
    pathData.push(`Z`) // Закрыть путь
    return pathData.join(' ')
  }

  private cleanupDrawing() {
    this.removeTemporaryLines()
    this.resetPreviewLine()
    this.resetDrawingState()
    this.removeEventListeners()
  }

  private removeTemporaryLines() {
    this.temporaryLines.forEach((line) => this.canvas?.remove(line))
    this.temporaryLines = []
  }

  private resetPreviewLine() {
    if (this.previewLine) {
      this.canvas?.remove(this.previewLine)
      this.previewLine = null
    }
  }

  private resetDrawingState() {
    this.drawingEnabled = false
    this.points = []
  }

  private removeEventListeners() {
    this.canvas?.off('mouse:down', this.handleMouseDown.bind(this))
    this.canvas?.off('mouse:move', this.handleMouseMove.bind(this))
  }

  private handleMouseDown(event: fabric.IEvent) {
    if (!this.drawingEnabled || !this.canvas) return

    const pointer = this.canvas.getPointer(event.e)
    const point = new fabric.Point(pointer.x, pointer.y)
    this.points.push(point)

    if (this.points.length > 1) {
      this.addTemporaryLine(point)
    }
  }

  private handleMouseMove(event: fabric.IEvent) {
    if (!this.drawingEnabled || !this.canvas || this.points.length === 0) return

    const pointer = this.canvas.getPointer(event.e)
    const point = new fabric.Point(pointer.x, pointer.y)

    this.updatePreviewLine(point)
  }

  private addTemporaryLine(pointer: fabric.Point) {
    const lastPoint = this.points[this.points.length - 2]
    const line = new fabric.Line([lastPoint.x, lastPoint.y, pointer.x, pointer.y], {
      stroke: 'blue',
      strokeWidth: 2,
      selectable: false,
    })
    this.canvas?.add(line)
    this.temporaryLines.push(line)
  }

  private updatePreviewLine(pointer: fabric.Point) {
    const lastPoint = this.points[this.points.length - 1]

    this.resetPreviewLine()
    this.previewLine = new fabric.Line([lastPoint.x, lastPoint.y, pointer.x, pointer.y], {
      stroke: 'red',
      strokeWidth: 1,
      selectable: false,
      evented: false,
    })
    this.canvas?.add(this.previewLine)
  }
}

export const canvasManager = new CanvasManager()
