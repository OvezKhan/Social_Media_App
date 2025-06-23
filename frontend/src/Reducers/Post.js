import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    like: null,
    error: null,
    message: null,
};

export const likeReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("likeRequest", (state) => {
            state.loading = true;
        })
        .addCase("likeSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("likeFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        })
        .addCase("clearMessage", (state) => {
            state.message = null;
        })
        .addCase("NewPostRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    })
    .addCase("NewPostSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("NewPostFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("DeletePostRequest", (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    })
    .addCase("DeletePostSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("DeletePostFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
});




export const commentReducer = (state = {}, action) => {
    switch (action.type) {
      case 'COMMENT_SUCCESS':
        return {
          loading: false,
          message: action.payload,
        };
  
      case 'COMMENT_FAIL':
        return {
          loading: false,
          error: action.payload,
        };

        case 'COMMENT_REQUEST':
    case 'DELETE_COMMENT_REQUEST':
      return {
        ...state,
        loading: true,
      };

    case 'COMMENT_SUCCESS':
    case 'DELETE_COMMENT_SUCCESS':
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case 'COMMENT_FAIL':
    case 'DELETE_COMMENT_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

  
      case 'CLEAR_ERRORS':
        return {
          ...state,
          error: null,
        };
  
      case 'CLEAR_MESSAGE':
        return {
          ...state,
          message: null,
        };
  
      default:
        return state;
    }
  };
  


  
export const myPostsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("myPostsRequest", (state) => {
      state.loading = true;
    })
    .addCase("myPostsSuccess", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("myPostsFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    
});



export const userPostsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("userPostsRequest", (state) => {
      state.loading = true;
    })
    .addCase("userPostsSuccess", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("userPostsFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    
});


