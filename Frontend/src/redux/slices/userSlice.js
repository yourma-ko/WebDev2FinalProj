import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";

// Регистрация пользователя (POST с телом запроса)
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("User/Register", userData);
      
      const { id, firstName, lastName, phone, email, role } = response.data;
      const isAdmin = role === 0;
      
      return { id, firstName, lastName, phone, email, isAdmin };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка регистрации");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, hashedpassword }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`User/Login?email=${email}&password=${hashedpassword}`);

      const { id, firstName, lastName, phone, role } = response.data;
      const isAdmin = role === 0;

      return { id, firstName, lastName, phone, email, isAdmin };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Ошибка входа");
    }
  }
);

// Начальное состояние
const initialState = {
  isAuth: localStorage.getItem("isAuth") === "true",
  isAdmin: localStorage.getItem("isAdmin") === "true",
  userId: localStorage.getItem("userId") || "",
  userName: localStorage.getItem("userName") || "",
  userNumber: localStorage.getItem("userNumber") || "",
  userEmail: localStorage.getItem("userEmail") || "",
  error: null,
  loading: false
};

// Срез пользователя
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.isAdmin = false;
      state.userId = "";
      state.userName = "";
      state.userNumber = "";
      state.userEmail = "";
      localStorage.clear();
    },
    toggleAdmin: (state) => {
      state.isAdmin = !state.isAdmin;
      localStorage.setItem("isAdmin", state.isAdmin.toString());
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;

        const { id, firstName, lastName, phone, email, isAdmin } = action.payload;
        state.userId = id;
        state.userName = `${firstName} ${lastName}`;
        state.userNumber = phone;
        state.userEmail = email;
        state.isAdmin = isAdmin;

        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userId", id);
        localStorage.setItem("userName", `${firstName} ${lastName}`);
        localStorage.setItem("userNumber", phone);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isAdmin", isAdmin.toString());
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;

        const { id, firstName, lastName, phone, email, isAdmin } = action.payload;
        state.userId = id;
        state.userName = `${firstName} ${lastName}`;
        state.userNumber = phone;
        state.userEmail = email;
        state.isAdmin = isAdmin;

        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userId", id);
        localStorage.setItem("userName", `${firstName} ${lastName}`);
        localStorage.setItem("userNumber", phone);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isAdmin", isAdmin.toString());
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, toggleAdmin } = userSlice.actions;
export default userSlice.reducer;
