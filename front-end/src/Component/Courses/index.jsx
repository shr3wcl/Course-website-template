import "./style.css";
import {useEffect, useState} from "react";
import {addMyCourse, getCourse, increaseStudent} from "../../Redux/api/course";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Course = (props) => {
    const user = useSelector(state => state.auth.login.currentUser);
    const id = props.id;
    const [data, setData] = useState([]);
    useEffect( () => {
        async function getData(){
            setData(await getCourse(id));
        }
        getData();
    }, []);

    const handleClick = (id) => {
        if(user._id){
            increaseStudent(id);
            const form = {
                idUser: user._id,
                idCourse: id
            }
            addMyCourse(form);
        }
    }
    return (
            <div>
                {data.length ? (
                    <div className={"flex flex-wrap flex-row w-f"}>
                        {data?.map(each => (
                            <section key={each._id}
                                     className="index-module_col__2EQm9 index-module_c-12__u7UXF index-module_m-4__30Uoi index-module_l-3__MjWvb">
                                <div className="CommonItem_wrapper__1FbHi Home_courseItem__aIeZ4"><a
                                    className="CommonItem_thumb__ew8Jj CommonItem_has-link__VLLrX " title={each.title}
                                    target="_self" href={'/chapters/'+each._id}
                                    style={{background: `url("http://localhost:8000/${each.img}")`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                                    <button className="Button_btn__RW1e2 CommonItem_cta-btn__OK+oX" onClick={_ => handleClick(each._id)}>Xem khoá học</button>
                                </a><h3 className="CommonItem_title__EpYrE font-semibold mt-2">
                                    <a target="_self" className="hover:text-gray-500"
                                       href={'/chapters/'+each._id}>{each.title}</a>
                                </h3>
                                    <div className="CourseItem_students-count__92kIg">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users"
                                             className="svg-inline--fa fa-users w-4 h-4 inline-block" role="img"
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 640 512">
                                            <path fill="currentColor"
                                                  d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z"></path>
                                        </svg>
                                        <span className={"text-sm"}>{each.students}</span></div>
                                </div>
                            </section>
                        ))}
                    </div>
                ) : (
                    <h1>This course is being updated...</h1>
                )}
            </div>
    )
}

export default Course;
