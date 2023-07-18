import {createSlice} from '@reduxjs/toolkit';

const initialState={
    loading:false,
    admin:null,
    error:''
}

const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        adminLoginStart:(state)=>{
            state.loading=true
        },
        adminLoginSucces:(state,action)=>{
            state.loading=false
            state.admin=action.payload
        },
        adminLoginFailure:(state,action)=>{
            state.loading=false
            state.admin=null
            state.error=action.payload
        },
        adminLogout:(state)=>{
            state.loading=false
            state.admin=null
            state.error=''
        }


    }
})

export const {adminLoginStart,adminLoginSucces,adminLoginFailure,adminLogout,action}=adminSlice.actions;
export default adminSlice.reducer