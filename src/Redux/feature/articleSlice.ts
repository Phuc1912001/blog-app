import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    article: {
        title: "",
        description: "",
        body: "",
        favoritesCount: 0,
        favorited: "",
        tagList: "",

    }
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        infoArticle: (state, action) => {
            const { title, description, body, tagList, favoritesCount, favorited } = action.payload
            state.article.title = title;
            state.article.description = description;
            state.article.body = body;
            state.article.favoritesCount = favoritesCount;
            state.article.favorited = favorited;
            state.article.tagList = tagList;

        },

    },
})

// Action creators are generated for each case reducer function
export const { infoArticle } = articleSlice.actions

export default articleSlice.reducer