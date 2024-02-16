import classes from './DeleteIndicator.module.css'

interface DeleteIndicatorProps {
  size: number
  action: () => void
}
const DeleteIndicator = ({ size, action }: DeleteIndicatorProps) => {
  return (
    <div className={classes.indicatorParent}>
      <div
        role='none'
        className={classes.indicatorChild}
        style={{
          position: 'absolute',
          top: `${-size / 2}px`,
          right: `${-size / 2}px`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '100%',
          backgroundColor: 'var(--mantine-color-red-filled)',
        }}
        onClick={action}
      ></div>
    </div>
  )
}

export default DeleteIndicator
