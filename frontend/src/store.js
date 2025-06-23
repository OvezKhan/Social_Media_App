import { configureStore } from '@reduxjs/toolkit';
import { allUsersReducer, postOfFollowingReducer, userProfileReducer, userReducer } from './Reducers/User';
import { commentReducer, likeReducer, myPostsReducer, userPostsReducer } from './Reducers/Post';

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing:postOfFollowingReducer,
        allUsers:allUsersReducer,
        like:likeReducer,
        comment: commentReducer,
        myPosts : myPostsReducer,
        userProfile : userProfileReducer,
        userPosts : userPostsReducer,
    },
});

export default store;
