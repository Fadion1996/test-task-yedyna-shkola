import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  columns: [],
  rates: [],
  studentsQuantity: 0,
  columnsQuantity: 0,
  ratesQuantity: 0
}

const studentsSlice = createSlice({
  name: 'students',
  initialState: initialState,
  reducers: {
    setFetchedData(state, { payload }) {
      const { data: { Items, Quantity }, type } = payload
      switch (type) {
        case 'Schoolboy': {
          state.students = Items
          state.studentsQuantity = Quantity
          break
        }
        case 'Column': {
          state.columns = Items
          state.columnsQuantity = Quantity
          break
        }
        case 'Rate': {
          state.rates = Items
          state.ratesQuantity = Quantity
          break
        }
        default: { }
      }
    },
    setStudentRate(state, { payload }) {
      const { studentId, columnId } = payload
      console.log(payload)
      let existingRateIndex = state.rates.findIndex(({ ColumnId, SchoolboyId }) => {
        return SchoolboyId === studentId && ColumnId === columnId
      })

      if (existingRateIndex !== -1) {
        const existingRate = state.rates[existingRateIndex]
        existingRate.Title !== '' ? existingRate.Title = '' : existingRate.Title = 'H'
      } else {
        const newRate = {
          Id: Math.floor(Math.random() * 9000 + 1000),
          ColumnId: columnId,
          SchoolboyId: studentId,
          Title: 'H'
        }
        state.rates.push(newRate)
      }
    }
  }
})

export const studentsActions = studentsSlice.actions

export default studentsSlice.reducer