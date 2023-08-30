import {useState} from "react";
import {toast} from "react-toastify";
import {changePassword} from "../../Redux/api/user";
import {useDispatch, useSelector} from "react-redux";
import {logoutSuccess} from "../../Redux/Slice/authSlice";

const Password = () => {
    const dispatch = useDispatch();

    const idUser = useSelector(state => state.auth.login.currentUser._id);

    const [currentPass, setCurrent] = useState('');
    const [newPass, setNew] = useState('');
    const [newPassRetype, setNewRetype] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(newPass !== newPassRetype){
            toast.warn("Mật khẩu không trùng khớp");
            return;
        }
        const data = {
            currentPass: currentPass,
            newPass: newPass,
            idUser: idUser
        }
        changePassword(data).then(msg => {
            if(msg != "Có lỗi"){
                toast.success("Thay đổi mật khẩu thành công, đăng nhập lại!");
                dispatch(logoutSuccess());
            }else{
                toast.error(msg);

            }
        }).catch(msg => toast.error("Có lỗi"));
    }
    return(
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div
                    className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="passwd"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu hiện tại</label>
                            <input type="password" name="passwd" id="passwd"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Mật khẩu hiện tại" required="" value={currentPass} onChange={e => setCurrent(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu mới</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required="" value={newPass} onChange={e => setNew(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="confirm-password"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu</label>
                            <input type="password" name="confirm-password" id="confirm-password"
                                   placeholder="••••••••"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required="" value={newPassRetype} onChange={e => setNewRetype(e.target.value)}/>
                        </div>

                        <button type="submit"
                                className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset
                            passwod
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Password;
