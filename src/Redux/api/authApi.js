import { instance } from "../../createInstance";
import {
    loginFail,
    loginStart,
    loginSuccess,
    logoutFail,
    logoutStart,
    logoutSuccess,
    registerFail,
    registerStart,
    registerSuccess
} from "../Slice/authSlice";
import { toast } from "react-toastify";


export const registerUser = async (user, dispatch, navigate) => {
    try {
        dispatch(registerStart());
        instance.post("v1/auth/register", user).then(data => {
            if (data.status === 200) {
                dispatch(registerSuccess(data.data.message));
                navigate("/login");
            } else {
                dispatch(registerFail(data.data.message));
            }
        }).catch(err => dispatch(registerFail(err.response.data.message)));
    } catch (err) {
        dispatch(registerFail("Có lỗi xảy ra"));
    }
}

export const loginUser = async (user, dispatch, navigate) => {
    try {
        dispatch(loginStart());
        instance.post("v1/auth/login", user).then(data => {
            if (data.status === 200) {
                dispatch(loginSuccess(data.data));
                navigate("/");
            } else {
                dispatch(loginFail(data.data.message));
            }
        }).catch(err => dispatch(loginFail(err.response?.data.message)));
    } catch (error) {
        dispatch(loginFail({ message: "Có lỗi xảy ra" }));
    }
}

export const logoutUser = async (dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("v1/auth/logout", '', { headers: { token: `Bearer ${accessToken}` } });
        dispatch(logoutSuccess());
        navigate("/login");
    } catch (err) {
        console.log(err);
        dispatch(logoutFail());
    }
}

