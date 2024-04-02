import { notifications } from '@mantine/notifications'
import _ from 'lodash'
import { canvasManager } from '../../../features/Functions/api/CanvasManager'
import { useLazyGetVectorImageByIdQuery } from '../api/VectorImageApi'
import { IVectorImagesItems } from '../model/IVectorImages'
import classes from './VectorImagesGrid.module.css'

interface VectorImagesGridProps {
  data: IVectorImagesItems[]
}

const VectorImagesGrid = ({ data }: VectorImagesGridProps) => {
  const chunks = _.chunk(data, 16)
  const [fetchData] = useLazyGetVectorImageByIdQuery()

  const getImage = async (id: number) => {
    notifications.show({
      id: 'getVectorImage',
      title: 'Загрузка',
      message: 'Пожалуйста, подождите',
      loading: true,
      color: 'blue',
      autoClose: false,
    })
    const result = await fetchData(id)
    if (result.isError) {
      notifications.update({
        id: 'getVectorImage',
        title: 'Возникла ошибка',
        message: String(result.error),
        loading: false,
        color: 'red',
        autoClose: true,
      })
    } else {
      canvasManager.renderSVG(result.data)
      notifications.update({
        id: 'getVectorImage',
        title: 'Изображение добавлено',
        message: '',
        loading: false,
        color: 'green',
        autoClose: true,
      })
    }
  }
  return (
    <div className={classes.row}>
      <div className={classes.column}>
        {chunks[0].map((item) => (
          <img
            key={item.id}
            src={item.preview.url}
            alt={item.name}
            onClick={() => getImage(item.id)}
          />
        ))}
      </div>
      <div className={classes.column}>
        {chunks[1].map((item) => (
          <img
            key={item.id}
            src={item.preview.url}
            alt={item.name}
            onClick={() => getImage(item.id)}
          />
        ))}
      </div>
      <div className={classes.column}>
        {chunks[2].map((item) => (
          <img
            key={item.id}
            src={item.preview.url}
            alt={item.name}
            onClick={() => getImage(item.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default VectorImagesGrid
