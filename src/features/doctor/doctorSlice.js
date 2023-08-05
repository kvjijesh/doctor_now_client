import {createSlice} from '@reduxjs/toolkit';

const initialState={
    loading:false,
    doctor:null,
    error:''
}

const doctorSlice=createSlice({
    name:'doctor',
    initialState,
    reducers:{
        doctorLoginStart:(state)=>{
            state.loading=true
        },
        doctorLoginSucces:(state,action)=>{
            state.loading=false
            state.doctor=action.payload
        },
        doctorLoginFailure:(state,action)=>{
            state.loading=false
            state.doctor=null
            state.error=action.payload
        },
        doctorLogout:(state)=>{
            state.loading=false
            state.doctor=null
            state.error=''
        }


    }
})

export const {doctorLoginStart,doctorLoginSucces,doctorLoginFailure,doctorLogout,action}=doctorSlice.actions;
export default doctorSlice.reducer