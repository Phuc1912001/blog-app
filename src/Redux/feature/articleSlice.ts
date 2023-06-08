import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    article: {
        title: "",
        description: "",
        body: "",
        tagList: "",

    }
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        infoArticle: (state, action) => {
            const { title, description, body, tagList } = action.payload
            state.article.title = title;
            state.article.description = description;
            state.article.body = body;
            state.article.tagList = tagList;
        },

    },
})

// Action creators are generated for each case reducer function
export const { infoArticle } = articleSlice.actions

export default articleSlice.reducer