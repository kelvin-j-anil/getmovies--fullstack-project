import {createSlice} from '@reduxjs/toolkit';

// spinner icon
const loadersSlice = createSlice({
    name: 'loaders',
    initialState: {
        loading : false,
    },
    reducers: {
        ShowLoading : (state) => {
            state.loading = true;
        },
        HideLoading : (state) => {
            state.loading = false;
        }
    }
});

export const {ShowLoading, HideLoading} = loadersSlice.actions;
export default loadersSlice.reducer;