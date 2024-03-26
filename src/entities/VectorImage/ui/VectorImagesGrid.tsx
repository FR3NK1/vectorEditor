import _ from 'lodash'
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
    const result = await fetchData(id)
    console.log(result.data)
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
