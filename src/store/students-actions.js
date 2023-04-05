import { uiActions } from "./ui-slice"
import { studentsActions } from "./students-slice"
import { base_url, class_key } from "."

export const fetchData = (type) => {
  return async dispatch => {
    const getData = async () => {
      const response = await fetch(`${base_url}/v1/${class_key}/${type}`)

      if (!response.ok) {
        throw new Error('Could not fetch data!')
      }
      const data = await response.json()

      return data
    }

    try {
      const data = await getData()
      dispatch(studentsActions.setFetchedData({ data, type }))
    } catch {
      dispatch(uiActions.showNotification({
        status: 'error',
        message: 'Fetching students data failed!'
      }))
    }
  }
}

export const sendStudentData = ({ studentId, columnId, type }) => {
  console.log('{ studentId, columnId, type }', { studentId, columnId, type })
  const body = type === 'Rate'
    ? {
      SchoolboyId: studentId,
      ColumnId: columnId,
      Title: 'H'
    } : {
      SchoolboyId: studentId,
      ColumnId: columnId,
    }

  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${base_url}/v1/${class_key}/${type}`, {
        method: 'POST',
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        throw new Error('Could not fetch data!')
      }
    }

    try {
      await sendRequest()

      dispatch(uiActions.showNotification({
        status: 'success',
        message: 'Sent data success!'
      }))
      dispatch(studentsActions.setStudentRate({ studentId, columnId }))
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        message: 'Sending data failed!'
      }))
    }
  }
}