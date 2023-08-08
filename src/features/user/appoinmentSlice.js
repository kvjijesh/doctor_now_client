import {createSlice} from '@reduxjs/toolkit';

const initialState={
    loading:false,
    appointment:null,
    error:'',
}

const appointmentSlice=createSlice({
    name:'appointment',
    initialState,
    reducers:{

        appointmentData:(state,action)=>{
            state.loading=false
            state.appointment=action.payload
        },
        appointmentFailure:(state,action)=>{
            state.loading=false
            state.appointment=null
            state.error=action.payload
        },

        clearAppointment:(state)=>{
            state.loading=false
            state.appointment=null
            state.error=''
        }


    }
})
export const {appointmentData,appointmentFailure,clearAppointment}=appointmentSlice.actions;
export default appointmentSlice.reducer