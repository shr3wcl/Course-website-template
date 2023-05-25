import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {detailCourse, getChapter} from "../../Redux/api/course";
import LessonList from "../LessonList";

const Chapters = () => {
    const {id} = useParams();
    let index = 1;
    const [data,setData] = useState([]);
    const [infoCourse, setCourse] = useState({});
    useEffect(() => {
        async function getData(){
            setData(await getChapter(id));
            setCourse(await detailCourse(id));
        }
        getData();
    }, []);
    return (
        <div className={"px-[30px] my-24"}>
            <div className={"flex flex-row justify-between px-2"}>
                <div className={"mb-12 inline-block flex flex-col justify-center"}>
                    <h1 className={"font-bold text-[30px]"}>{infoCourse.title}</h1>
                    <span className={" mb-4"}>Giảng viên: {infoCourse.lecture}</span>
                    <span className={""}>{infoCourse.desc}</span>
                </div>
                <div className={""}>
                    <img className={"md:block hidden min-w-[360px] h-60 rounded-2xl"} src={"http://localhost:8000/"+infoCourse.img}/>
                </div>
            </div>
            <div>
                <h1 className={"font-bold text-[20px] mb-4"}>Nội dung bài học</h1>
                {data.length ? (
                    <div>
                        {data.map(each => (
                            <div className="bg-white rounded-lg shadow" key={each._id}>
                                <div className="flex items-center justify-between p-4 bg-gray-200 rounded-t-lg">
                                    <h5 className="font-bold uppercase">{index++ + ". " + each.name}</h5>
                                    <span className="text-sm">{each.quanLesson} bài học</span>
                                </div>
                                <div className="p-4">
                                    <LessonList id={each._id}/>
                                </div>
                            </div>
                        ))}
                    </div>
                ):(
                    <div className={"mt-16"}>
                        <h1 className={"text-center font-bold"}>Hiện chưa có video của khoá học này</h1>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Chapters;
