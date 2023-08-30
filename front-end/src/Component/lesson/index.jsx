import {useEffect, useState} from "react";
import {detailLesson} from "../../Redux/api/course";
import {useParams} from "react-router-dom";
import ReactPlayer from 'react-player';
import moment from 'moment';
import {getChapterByCourseID} from "../../Redux/api/chapter";
import LessonList from "../LessonList";

const Lesson = () => {
    const {id} = useParams();
    let index = 1;
    const [data, setData] = useState({});
    const [chapter, setChapter] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const data = await detailLesson(id);
            setData(data);
            const res = await getChapterByCourseID(data.courseID);
            setChapter(res);
        }
        getData();
    }, []);
    const date = moment(data.updatedAt);
    const formattedDate = date.format('[tháng] M [năm] YYYY');
    return (
        <div className={"flex"}>
            <div className={"md:w-9/12 w-full"}>
                <div className={""}>
                    <ReactPlayer
                        url={data.urlVideo}
                        width="100%"
                        height={"500px"}
                        playing={true}
                        controls={true}
                    />
                </div>
                <div className={"px-[10%] py-10"}>
                    <h1 className={"font-bold text-4xl"}>{data.name}</h1>
                    <span className={"mt-12 text-gray-500"}>Cập nhập vào {formattedDate}</span>
                </div>
            </div>
            <div className={"flex flex-col md:w-3/12 w-0 ml-1 border-l-2"}>
                <h1 className={"px-4 py-4 w-full font-bold"}>Danh sách bài học</h1>
                <hr/>
                <ul>
                    {chapter.map(each => (
                        <div>
                            <li className={"px-4 py-2"}><span className={"font-semibold"}>Chương {index++}:</span> {each.name}</li>
                            <ul className={"px-2"}>
                                <LessonList id={each._id}/>
                            </ul>
                            <hr/>
                        </div>

                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Lesson;
