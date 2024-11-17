import { Select } from '@mantine/core'
import { useEffect, useState } from 'react'
import WebFont from 'webfontloader'
import { canvasManager } from '../../../features/Functions/api/CanvasManager'
import { useGetGoogleFontsListQuery } from '../api/GoogleFontsApi'

const GoogleFontsSelect = () => {
  const { data } = useGetGoogleFontsListQuery()

  const [value, setValue] = useState<string | null>(null)

  useEffect(() => {
    if (value)
      WebFont.load({
        google: {
          families: [value],
        },
        active: () => canvasManager.changeActiveObjectsFont(value),
      })
  }, [value])
  return (
    <>
      {data && (
        <Select value={value} onChange={setValue} data={data.items.map((item) => item.family)} />
      )}
    </>
  )
}

export default GoogleFontsSelect
