import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'
import { Snackbar, Alert } from '@mui/material'
import { uiActions } from '../../store/ui-slice'


const Notification = (props) => {
  const dispatch = useDispatch()
  const { open, message, status = 'success' } = props

  const handleClose = () => {
    dispatch(uiActions.closeNotification())
  }

  return (
    createPortal(
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>,
      document.getElementById('root-notification'))
  )
}

export default Notification