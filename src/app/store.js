import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import adminReducer from '../features/admin/adminSlice'
import doctorReducer from '../features/doctor/doctorSlice';
import appointmentReducer from '../features/user/appoinmentSlice'
import storage from "redux-persist/lib/storage";
import {persistReducer} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import consultReducer from '../features/consult/consultSlice';
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['user', 'admin', 'doctor']
};
const reducer=combineReducers({
    user:userReducer,
    admin:adminReducer,
    doctor:doctorReducer,
    appointment:appointmentReducer,
    consult:consultReducer
})
const persistedReducer=persistReducer(persistConfig,reducer)
const store=configureStore({
    reducer:persistedReducer
})

export default store;