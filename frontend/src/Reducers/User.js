import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated:false,

};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoginRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoginSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("LoginFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("RegisterRequest", (state) => {
      state.loading = true;
    })
    .addCase("RegisterSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("RegisterFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;

    })


     .addCase("UpdateProfileRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdateProfileSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("UpdateProfileFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;

    })


    .addCase("UpdatePasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("UpdatePasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("UpdatePasswordFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;

    })


    .addCase("forgotPasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("forgotPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
      
    })
    .addCase("forgotPasswordFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
     

    })


     .addCase("ResetPasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("ResetPasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    
    })
    .addCase("ResetPasswordFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
     

    })


     .addCase("followUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("followUserSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
      
    })
    .addCase("followUserFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
     

    })


    .addCase("DeleteProfileRequest", (state) => {
  state.loading = true;
})
.addCase("DeleteProfileSuccess", (state, action) => {
  state.loading = false;
  state.message = action.payload;
  state.user = null;
  state.isAuthenticated = false;
})
.addCase("DeleteProfileFailed", (state, action) => {
  state.loading = false;
  state.error = action.payload;
})




    .addCase("ClearMessage", (state) => {
  state.message = null;
})



    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;

    })
    .addCase("LoadUserFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("ClearError", (state) => {
      state.error = null;
      state.loading = false;
    })


     .addCase("LogoutRequest", (state) => {
      state.loading = true;
    })
    .addCase("LogoutSuccess", (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;

    })
    .addCase("LogoutFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    })
});







export const postOfFollowingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("PostOfFollowingRequest", (state) => {
      state.loading = true;
    })
    .addCase("PostOfFollowingSuccess", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      
    })
    .addCase("PostOfFollowingFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      
    })
    .addCase("ClearError", (state) => {
      state.error = null;
      state.loading = false;
    });
});











export const allUsersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("allUsersRequest", (state) => {
      state.loading = true;
    })
    .addCase("allUsersSuccess", (state, action) => {
      state.loading = false;
      state.users = action.payload;
      
    })
    .addCase("allUsersFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      
    })
    .addCase("ClearError", (state) => {
      state.error = null;
      state.loading = false;
    });
});





export const userProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("userProfileRequest", (state) => {
      state.loading = true;
    })
    .addCase("userProfileSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      
    })
    .addCase("userProfileFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      
    })
    .addCase("ClearError", (state) => {
      state.error = null;
      state.loading = false;
    });
});