import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    tagsPopular: []

}

export const tagsPopularSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        infoTagsPopular: (state, action) => {
            state.tagsPopular = action.payload;

        },

    },
})

// Action creators are generated for each case reducer function
export const { infoTagsPopular } = tagsPopularSlice.actions

export default tagsPopularSlice.reducer