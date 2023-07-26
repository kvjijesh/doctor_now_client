import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import adminReducer from '../features/admin/adminSlice'
import doctorSlice from '../features/doctor/doctorSlice';
import storage from "redux-persist/lib/storage";
import {persistReducer} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
const persistConfig={
    key:'root',
    version:1,
    storage,
}
const reducer=combineReducers({
    user:userReducer,
    admin:adminReducer,
    doctor:doctorSlice
})
const persistedReducer=persistReducer(persistConfig,reducer)
const store=configureStore({
    reducer:persistedReducer
})

export default store;