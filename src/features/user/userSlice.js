import {createSlice} from '@reduxjs/toolkit';

const initialState={
    loading:false,
    user:null,
    error:'',
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading=true
        },
        loginSucces:(state,action)=>{
            state.loading=false
            state.user=action.payload
        },
        loginFailure:(state,action)=>{
            state.loading=false
            state.user=null
            state.error=action.payload
        },
        logout:(state)=>{
            state.loading=false
            state.user=null
            state.error=''
        }

    }
})
export const {loginStart,loginSucces,loginFailure,logout}=userSlice.actions;
export default userSlice.reducer