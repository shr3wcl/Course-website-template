import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./style.css";
import {useDispatch, useSelector} from "react-redux";
import {logoutSuccess} from "../../Redux/Slice/authSlice";
import {toast} from "react-toastify";
import Tippy from "@tippyjs/react";
function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = useSelector(state => state.auth.login);
    const [show, setShow] = useState(true);
    const [showMyCourse, setSMC] = useState(true);
    const [search, setSearch] = useState("");
    const [checkSearch, setCheckSearch] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate(`/search/${search}`);
        }
    };

    function toggle() {
        setIsOpen(!isOpen);
    }

    function selectOption(option) {
        setSelectedOption(option);
        setIsOpen(false);
    }
    const handleLogout = () => {
        dispatch(logoutSuccess());
        toast.success("Đăng xuất thành công",{
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            position: "bottom-right"
        });
    }

    return (
        <header className={"sticky right-0 left-0 top-0 bg-white z-50"}>
            <div
                className="sticky h-[66px] items-center border-b-2 border-solid flex text-sm px-[28px] right-0 left-0 top-0 z-20"
                id="header">
                <div className="items-center flex flex-1">
                    <Link to="/" className={"flex"}>
                        <img className="rounded-[8px] flex-shrink-0 h-[38px] w-[38px] object-contain"
                             src="http://localhost:8000/uploads/banner/logo.png" alt="Couseraa"/>
                    </Link>
                    <Link to="/" className="text-black font-bold ml-[16px] md:inline-block hidden">English For Kids</Link>
                </div>
                <div className="flex-1 items-center flex justify-center">
                    <div>
                        <div
                            className="border-[2px] border-solid rounded-[20px] w-[420px] flex-1 h-[40px] pr-[16px] pl-[8px] items-center flex justify-center"
                            aria-expanded="false">
                            <div
                                className="bg-search-logo bg-[#fff] bg-center bg-[length:18px_18px] bg-no-repeat opacity-[.7] w-[32px] rounded-[50%] h-[32px]"></div>
                            <input className="border-0 caret-[#444] flex-1 h-full outline-0 px-4" spellCheck="false"
                                placeholder="Search courses, articles, videos,..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleKeyDown} onFocus={e => setCheckSearch(false)} />
                        </div>

                    </div>
                </div>
                {!isLogin.success ? (
                    <>
                        <div className="flex-1 items-center justify-end flex">
                            <div>
                                <div id="navbar-actions-portal"></div>
                                <a href="/login" className="bg-[#f05123] rounded-[999px] text-[#fff] cursor-pointer font-semibold py-[9px] px-[20px]">Đăng nhập</a>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex-1 items-center justify-end flex">
                            <div id="navbar-actions-portal"></div>
                            <div>
                                <button className="bg-transparent md:inline-block hidden text-[#333] cursor-pointer font-semibold mr-[16px] p-[8px]"
                                        aria-expanded="false" onClick={_=>setSMC(!showMyCourse)}>My courses
                                </button>
                            </div>
                            <div>
                                <div className="p-[8px] relative select-none" id="notification-button" aria-expanded="false" >
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell"
                                         className="overflow-visible inline-block h-[1em] align-[-0.125em] fa-bell text-[#707070] hover:text-[#333]"
                                         role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                              d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-[12px]" aria-expanded="false" onClick={()=>setShow(!show)}>
                                <div className="bg-transparent rounded-[50%]"><img
                                    className="cursor-pointer rounded-[50%] h-[28px] w-[28px] object-cover"
                                    src={`http://localhost:8000/${isLogin.currentUser.avatar}`}
                                    alt={isLogin.currentUser.name}/></div>
                            </div>
                        </div>
                        <div data-tippy-root="true" id="tippy-4" hidden={show}>
                            <ul className="Tippy-module_wrapper__1s5m5 UserMenu_wrapper__kevhj hide-on-click">
                                <div className="UserMenu_user__GXFLp">
                                    <div className="UserMenu_avatarWrapper__9ABYL">
                                        <div className="FallbackAvatar_avatar__gmj3S"><img
                                            src={`http://localhost:8000/${isLogin.currentUser.avatar}`} alt={isLogin.currentUser.name}/>
                                        </div>
                                    </div>
                                    <div className="UserMenu_info__UqeZT"><span
                                        className="UserMenu_name__L18s-">{isLogin.currentUser.name}</span>
                                        <div className="UserMenu_username__7qkRU">@{isLogin.currentUser.username}</div>
                                    </div>
                                </div>
                                <hr/>
                                <ul className="UserMenu_list__FI9-C">
                                        <li className="py-1"><a className="UserMenu_item__NXwf1 hover:text-gray-400" href={"/profile/"+isLogin.currentUser._id}>Profile</a></li>
                                        <li className="py-1"><a className="UserMenu_item__NXwf1 hover:text-gray-400" href="/edit/profile">Edit profile</a></li>
                                        <li className="py-1"><a className="UserMenu_item__NXwf1 hover:text-gray-400" href="/edit/password">Change password</a></li>
                                </ul>
                                <hr/>
                                <ul className="UserMenu_list__FI9-C" >
                                    <li><span className="UserMenu_item__NXwf1 text-red-600 cursor-pointer hover:text-red-800" onClick={handleLogout}>Log out</span></li>
                                </ul>
                            </ul>
                        </div>
                    </>
                )}


            </div>
        </header>
)
}

export default Header;
