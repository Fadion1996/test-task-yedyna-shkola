import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';

import { fetchData } from './store/students-actions'

import { Main, Details, Notification, PageToggler } from './components'

function App() {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.ui.notification)
  const students = useSelector(state => state.students.students)
  const columns = useSelector(state => state.students.columns)
  const rates = useSelector(state => state.students.rates)
  const isLoaded = students.length !== 0 && columns.length !== 0 && rates.length !== 0
  const [page, setPage] = useState('1')

  const toggleChange = () => {
    page === '1' ? setPage('2') : setPage('1')
  }

  useEffect(() => {
    dispatch(fetchData('Schoolboy'))
    dispatch(fetchData('Column'))
    dispatch(fetchData('Rate'))
  }, [dispatch])

  return (
    <div className="App">
      {notification.open && <Notification {...notification} />}
      <PageToggler value={page} handleChange={toggleChange} />
      {!isLoaded &&
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', position: 'absolute' }}>
          <CircularProgress size={100} />
        </Box>
      }
      {
        isLoaded && (page === '1'
          ? <Main />
          : <Details />
        )
      }
    </div>
  )
}

export default App;
