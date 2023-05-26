import {useParams} from "react-router-dom";
import "./style.css";
import {useEffect, useState} from "react";
import {getInfo} from "../../Redux/api/user";
import moment from "moment";
import {useSelector} from "react-redux";
import {getAllMyCourse} from "../../Redux/api/course";
const Profile = () => {
    const user = useSelector(state => state.auth.login.currentUser);
    const {id} = useParams();
    const [userInfo, setInfo] = useState({});
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData(){
            setInfo(await getInfo(id));
            setData(await getAllMyCourse(user._id));
        }
        getData();
    },[])

    return (
        <div className={"flex flex-col items-center"}>
            <div className={"relative"}>

                <img src={"https://fullstack.edu.vn/static/media/cover-profile.3fb9fed576da4b28386a.png"}/>
                <div className={"absolute bottom-[-70px] left-10 w-40 h-40 bg-white rounded-[50%] flex"}>
                    <img className={"rounded-[50%] p-1"} src={`http://localhost:8000/${user.avatar}`}/>
                </div>
                <h1 className={"absolute left-[220px] text-3xl bottom-[-50px] font-semibold"}>{userInfo.name}</h1>
            </div>
            <div className={"mt-20 mx-32 "}>
                <section className="w-fit flex">
                    <section
                        className="index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-5__2UHWy">
                        <div className="content-left">
                            <div className="Box_wrapper__uAKHJ"><h4 className="Box_title__kFB9-">Giới thiệu</h4>
                                <div>
                                    <div className="Profile_participation__SqLYV">
                                        <div className="Profile_participation-icon__ZkxuE">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                                 data-icon="user-group" className="svg-inline--fa fa-user-group "
                                                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                                <path fill="currentColor"
                                                      d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"></path>
                                            </svg>
                                        </div>
                                        <span>Thành viên của <span className="Profile_highlight__356rX">Coursera</span> từ <span className="Profile_highlight__356rX">{moment(userInfo.createdAt).format('DD/MM/YYYY')}</span></span>
                                    </div>
                                </div>
                            </div>
                            <div className="Box_wrapper__uAKHJ"><h4 className="Box_title__kFB9-">Hoạt động gần đây</h4>
                                <div>
                                    <div className="Profile_no-result__O7P-W">Chưa có hoạt động gần đây</div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section
                        className="index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-12__2CxUL index-module_l-7__kRbS-">
                        <div className="Box_wrapper__uAKHJ"><h4 className="Box_title__kFB9-">Các khóa học đã tham
                            gia</h4>
                            {data.length ? (
                                <div>
                                    {data.map(each => (
                                        <div key={each._id} className="Profile_inner__EK7zA"><a className="Profile_thumb__dY3wD"
                                                                                                href={`/chapters/${each.idCourse._id}`}><img
                                            src={`http://localhost:8000/${each.idCourse.img}`}
                                            className="Profile_thumb-image__vz1Iq" alt={each.idCourse.title}/></a>
                                            <div className="info"><h3 className="Profile_info-title__nwecV"><a
                                                href={`/chapters/${each.idCourse._id}`}>{each.idCourse.title}</a></h3><p
                                                className="Profile_info-desc__JTJYr">{each.idCourse.desc}</p></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    <h1>Chưa tham gia khoá học nào</h1>
                                </div>
                            )}
                        </div>
                    </section>
                </section>
            </div>
        </div>
    )
}

export default Profile;
