import "./style.css";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useState} from "react";
import {changeAvatar, changeName} from "../../Redux/api/user";
import {changeAvatarSuccess, changeNameSuccess} from "../../Redux/Slice/authSlice";
import {toast} from "react-toastify";

const EditInfo = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.login.currentUser);
    const [name, setName] = useState(user.name);
    const [imgUrl, setUrl] = useState(user.avatar);
    function handleChangeName() {
        const data = {
            id: user._id,
            name};
        changeName(data).then(msg => {
            dispatch(changeNameSuccess(name));
            toast.success("Thay đổi thành công");
        }).catch(err => toast.error("Có lỗi"));
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const data =  {
            id: user._id,
            avatar: file
        }
        changeAvatar(data).then(avatar => {
            dispatch(changeAvatarSuccess(avatar));
            setUrl(avatar);
            toast.success("Thay đổi thành công");
        }).catch(err => toast.error("Có lỗi"));
    };
    return (
        <div className="Setting_pageWrapper__PM+M5 flex justify-center w-full">
            <section className="index-module_row__-AHgh">
                <section
                    className="index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-12__340Ve">
                    <div className="Setting_wrapper__TX8z0">
                        <div className="GroupField_wrapper__1-jfw"><h2 className="GroupField_heading__PIaoN">Thông tin
                            cá nhân</h2>
                            <div className="FieldWrapper_wrapper__QcEfS">
                                <div className="InputField_fieldContent__iWttQ"><h3
                                    className="InputField_fieldContentLabel__wJO4a">Họ tên</h3>
                                    <div>
                                        <div className="
                        InputField_fieldContentEdit__KYEiF

                    "><input type="text" name="full_name" className="InputField_fieldContentInput__lO21W" maxLength="50"
                             placeholder="Thêm tên của bạn" value={name} disabled="" onChange={e => setName(e.target.value)}/>
                                            <div className="InputField_description__unJBo"><p>Tên của bạn xuất hiện trên
                                                trang cá nhân và bên cạnh các bình luận của bạn.</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="InputField_fieldBtn__OG6ZB">
                                    <button onClick={handleChangeName} className="Button_fieldButton__B93oZ Button_fieldButtonDefault__7a6UD">Chỉnh
                                        sửa
                                    </button>
                                </div>
                            </div>

                            <div className="FieldWrapper_wrapper__QcEfS">
                                <div className="PhotoField_fieldContent__QiVzm"><h3
                                    className="PhotoField_fieldContentLabel__rBtfX">Avatar</h3>
                                    <div className="PhotoField_fieldContentEdit__8iE7p">
                                        <div className="PhotoField_contentBody__fl5E5">Nên là ảnh vuông, chấp nhận các
                                            tệp: JPG, PNG hoặc GIF.
                                        </div>
                                        <div className="PhotoField_contentImage__zbcdo">
                                            <div className="PhotoField_avatar__Qdo+k">
                                                <div className="FallbackAvatar_avatar__gmj3S"
                                                ><img
                                                    src={`http://localhost:8000/${imgUrl}`}
                                                    alt={user.name}/></div>
                                            </div>
                                            </div>
                                    </div>
                                </div>
                                <div className="PhotoField_fieldBtn__TSg2A">
                                    <label htmlFor={"avatar"} className="Button_fieldButton__B93oZ Button_fieldButtonDefault__7a6UD">Chỉnh
                                        sửa
                                    </label>
                                    <input id={"avatar"} onChange={handleImageChange} type={"file"} hidden={true}/>
                                </div>
                            </div>
                            <div className="FieldWrapper_wrapper__QcEfS">
                                <div className="InputField_fieldContent__iWttQ"><h3
                                    className="InputField_fieldContentLabel__wJO4a">Email</h3>
                                    <div>
                                        <div className="
                        InputField_fieldContentEdit__KYEiF

                    "><input type="text" name="email" className="InputField_fieldContentInput__lO21W" maxLength="50"
                             placeholder="Eg. hoclaptrinh@f8.edu.vn" disabled="true" value="a"/>
                                            <div className="InputField_description__unJBo"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="InputField_fieldBtn__OG6ZB"></div>
                            </div>
                            <div className="FieldWrapper_wrapper__QcEfS">
                                <div className="InputField_fieldContent__iWttQ"><h3
                                    className="InputField_fieldContentLabel__wJO4a">User Name</h3>
                                    <div>
                                        <div className="
                        InputField_fieldContentEdit__KYEiF

                    "><input type="text" name="username"  className="InputField_fieldContentInput__lO21W" maxLength="50"
                             placeholder="Thêm user name" disabled="true" value={user.username}/>
                                            <Link to={`http://localhost:3000/profile/${user._id}`} className="InputField_description__unJBo"><p><span
                                                className="Setting_url__Q8DAK">URL: </span> https://localhost:3000/profile/{user._id}
                                            </p></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="InputField_fieldBtn__OG6ZB"></div>
                            </div>

                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default EditInfo;
