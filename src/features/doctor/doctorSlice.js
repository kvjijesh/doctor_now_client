import {createSlice} from '@reduxjs/toolkit';

const initialState={
    loading:false,
    user:null,
    error:'',
}

const doctorSlice=createSlice({
    name:'doctor',
    initialState,
    reducers:{
        doctorloginStart:(state)=>{
            state.loading=true
        },
        doctorloginSucces:(state,action)=>{
            state.loading=false
            state.doctor=action.payload
        },
        doctorloginFailure:(state,action)=>{
            state.loading=false
            state.doctor=null
            state.error=action.payload
        },
        doctologout:(state)=>{
            state.loading=false
            state.doctor=null
            state.error=''
        }

    }
})
export const {doctorloginStart,doctorloginSucces,doctorloginFailure,doctorlogout}=doctorSlice.actions;
export default doctorSlice.reducer