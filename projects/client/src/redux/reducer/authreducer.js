const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  user: {
    id: null,
    username: "",
    email: "",
    role: "",
    isActive: false,
    imgProfile: "",
  },
  login: false,
  cashiers: [],
};

export const authreducer = createSlice({
  name: "authreducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, role, isActive, imgProfile } = action.payload;
      state.user = {
        id,
        username,
        email,
        role,
        isActive,
        imgProfile,
      };
    },
    loginSuccess: (state) => {
      state.login = true;
    },
    logoutSuccess: (state) => {
      state.login = false;
      localStorage.removeItem("token");
      document.location.href = "/";
    },
    setCashiers: (state, action) => {
      state.cashiers = action.payload;
      console.log(state.cashiers);
    },
  },
});

export const Signinreducer = (values, navigate) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:8000/pos-kasir/login", {
        username: values.username,
        password: values.password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      dispatch(loginSuccess());
      dispatch(setUser(res.data.cekUser));
      alert("Login Berhasil");
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };
};

export const cekLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8000/pos-kasir/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUser(res.data.cekUser));
    } catch (err) {
      alert(err.message);
    }
  };
};
export const changePicture = (photo) => {
  return async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("imgProfile", photo);
    try {
      const respon = await axios.patch("http://localhost:8000/pos-kasir/ganti-avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("ganti avatas sukses");
      document.location.href = "/home";
    } catch (error) {
      console.log(error);
      alert("ganti avatas gagal");
    }
  };
};

export const getCashiers = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8000/pos-kasir/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setCashiers(res.data.result));
    } catch (err) {
      alert(err.message);
    }
  };
};

export const udpateStatusCashier = (status, id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    console.log(status);
    try {
      const res = await axios.patch(
        "http://localhost:8000/pos-kasir/active-cashier",
        { id, isActive: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.message);
    }
  };
};

export const { setUser, loginSuccess, logoutSuccess, setCashiers } = authreducer.actions;
export default authreducer.reducer;
