import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Redux/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess } from "../../Redux/Slice/authSlice";
import { toast, ToastContainer } from "react-toastify";


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const isLogin = useSelector(state => state.auth.login);

    useEffect(() => {
        // isLogin.success && navigate("/");
        if (isLogin.success === true) {
            navigate('/');
        }
        else if (isLogin.error === true) {
            toast.error(isLogin.msg, {
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    }, [isLogin, navigate]);

    function handleLogin(e) {
        e.preventDefault();
        const user = {
            username,
            password
        };
        loginUser(user, dispatch, navigate);
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                    Đăng nhập
                </h1>
                <form className="mt-6" onSubmit={handleLogin}>
                    <div className="mb-2">
                        <label
                            for="username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Tên đăng nhập
                        </label>
                        <input
                            type="text" id='username'
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" value={username} onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Mật khẩu
                        </label>
                        <input
                            type="password" id='password'
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" value={password} onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Đăng nhập
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Chưa có tài khoản?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-purple-600 hover:underline">
                        Đăng ký
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login;
