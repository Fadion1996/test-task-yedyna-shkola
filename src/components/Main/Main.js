import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { sendStudentData } from '../../store/students-actions'
import { useCallback } from 'react';

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderLeft: '1px solid #d3d3d3!important',
        }
      }
    }
  }
});

const themeRate = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          borderLeft: '1px solid #d3d3d3!important',
          '&:hover': {
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
          }
        }
      }
    }
  }
})


const CustomTable = () => {
  const dispatch = useDispatch()
  const students = useSelector(state => state.students.students)
  const columns = useSelector(state => state.students.columns)
  const rates = useSelector(state => state.students.rates)

  const getTitle = (studentId, columnId) => {
    const rate = rates.find(({ SchoolboyId, ColumnId }) => SchoolboyId === studentId && ColumnId === columnId)
    return rate ? rate.Title : ''
  }

  const handleClickCell = useCallback(({ studentId, columnId }) => {
    const existingRate = rates.find(({ SchoolboyId, ColumnId }) => SchoolboyId === studentId && ColumnId === columnId)

    const type = (!!existingRate && existingRate.Title !== '') ? 'UnRate' : 'Rate'
    dispatch(sendStudentData({ studentId, columnId, type }))
  }, [dispatch, rates])

  return (
    <TableContainer sx={{ maxHeight: window.innerHeight }} component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ background: '#97c1d9' }}>№</TableCell>
            <TableCell sx={{ background: '#97c1d9' }}>Студент</TableCell>
            {columns.map(({ Id, Title }) =>
              <TableCell key={Id} align="center" sx={{ background: '#97c1d9' }}>{Title}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(({ FirstName, LastName, SecondName, Id: studentId }, index) => (
            <TableRow
              key={studentId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {`${!!FirstName ? FirstName : ''} ${!!LastName ? LastName : ''} ${!!SecondName ? SecondName : ''}`}
              </TableCell>
              {columns.map(({ Id: columnId }) =>
                <ThemeProvider theme={themeRate} key={columnId}>
                  <TableCell style={{ cursor: 'pointer', '&:hover': { boxShadow: 8 } }} align="center" onClick={() => handleClickCell({ studentId, columnId })}>
                    {
                      getTitle(studentId, columnId)
                    }
                  </TableCell>
                </ThemeProvider>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <CustomTable />
    </ThemeProvider>
  )
}

export default Main