import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: {
    open: false,
    message: '',
    type: ''
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    showNotification(state, { payload }) {
      state.notification = {
        open: true,
        ...payload
      }
    },
    closeNotification(state, { payload }) {
      state.notification.open = false
    }
  }
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer