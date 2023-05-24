import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/api/authApi";
import { toast, ToastContainer } from "react-toastify";
import { registerReset } from '../../Redux/Slice/authSlice';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = useSelector(state => state.auth.login.success);
    const isRegister = useSelector(state => state.auth.register);

    useEffect(() => {
        isLogin && navigate('/');
        if (isRegister.success === true) {
            toast.success(isRegister.msg, {
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        }
        if (isRegister.error === true) {
            toast.warning(isRegister.msg, {
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        }
    }, [isLogin, isRegister.error, isRegister.msg, isRegister.success, navigate]);
    
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [repassword, setRePassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (repassword !== password) {
            toast.error("Mật khẩu không trùng khớp", {
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            return
        }
        const newUser = {
            "name": name,
            "username": username,
            "password": password,
            "email": email
        };
        registerUser(newUser, dispatch, navigate);
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                    Đăng ký
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            for="name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Họ và tên
                        </label>
                        <input
                            type="text" id='name'
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" value={name} onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Tên đăng nhập
                        </label>
                        <input
                            type="text" id='username'
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" value={username} onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            for="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email" id='email'
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" value={email} onChange={e => setEmail(e.target.value)}
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
                    <div className="mb-2">
                        <label
                            for="retype-password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Nhập lại mật khẩu
                        </label>
                        <input
                            type="password" id='retype-password'
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" value={repassword} onChange={e => setRePassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Đăng ký
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Đã có tài khoản?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-purple-600 hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register;
