import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        email: "",
        token: "",
        username: "",
        bio: "",
        image: "",
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        infoUser: (state, action) => {
            const { email, token, username, bio, image } = action.payload
            state.user.email = email;
            state.user.token = token;
            state.user.username = username;
            state.user.bio = bio ? bio : state.user.bio;
            state.user.image = image;
        },
        resetUser: (state) => {
            state.user.email = '';
            state.user.token = '';
            state.user.username = '';
            state.user.bio = '';
            state.user.image = '';
        },

    },
})

// Action creators are generated for each case reducer function
export const { infoUser, resetUser } = userSlice.actions

export default userSlice.reducer