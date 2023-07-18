import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import adminReducer from '../features/admin/adminSlice'
import doctorSlice from '../features/doctor/doctorSlice';
const store=configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer,
        doctor:doctorSlice

    }
})

export default store;