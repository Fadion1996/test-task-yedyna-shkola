import { configureStore } from "@reduxjs/toolkit"
import uiReducer from "./ui-slice"
import studentsReducer from "./students-slice"


export const base_url = 'http://94.131.246.109:5555'
export const class_key = '2'

const store = configureStore({
  reducer: {
    ui: uiReducer,
    students: studentsReducer
  },
})

export default store;
