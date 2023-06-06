import Breadcrumb from "../../components/Breadcrumb";
import { Card, Typography } from "@material-tailwind/react";
import DefaultLayout from "../../layout/DefaultLayout";
import { detailLesson, getCourseBySubjectID } from "../../../../Redux/api/course";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllIdSubject } from "../../../../Redux/api/subject";
import { getChapterByCourseID } from "../../../../Redux/api/chapter";
import { editLesson } from "../../../../Redux/api/lesson";
import { toast } from "react-toastify";
const LessonEdit = () => {
    const { id } = useParams();
    const [subjectID, setSubjectID] = useState([]);
    const [courseIDs, setCourseIDs] = useState([]);
    const [chapterIDs, setChapterIDs] = useState([]);
    const [courseID, setCourseID] = useState('');
    
    const [chapterID, setChapterID] = useState('');

    const [name, setName] = useState('');
    const [urlVideo, setUrl] = useState('');
    const [time, setTime] = useState('');
    useEffect(() => {
        async function getData() {
            const course = await detailLesson(id);
            setChapterID(course?.chapterID);
            setCourseID(course?.courseID);
            setName(course?.name);
            setUrl(course?.urlVideo);
            setTime(course?.time)
            const data = await getAllIdSubject();
            setSubjectID(data);
            const res = await getCourseBySubjectID(data[0]?.id);
            setCourseIDs(res);
            const ress = await getChapterByCourseID(res[0]?._id);
            setChapterIDs(ress);
        }
        getData();
    }, []);

    const handleSubjectChange = (e) => {
        async function getData() {
            const data = await getCourseBySubjectID(e.target.value);
            setCourseIDs(data);
            setCourseID(data[0]?._id);
            const res = await getChapterByCourseID(data[0]?._id);
            setChapterIDs(res);
            setChapterID(res[0]?._id);
        }
        getData();

    }

    const handleCourseChange = (e) => {
        async function getData() {
            const data = await getChapterByCourseID(e.target.value);
            setChapterIDs(data);
            setChapterID(data[0]?._id);
            setCourseID(e.target.value);
        }
        getData();
    }
    const handleChangeSelect = (e) => {
        setChapterID(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id,
            name,
            urlVideo,
            time,
            chapterID,
            courseID
        }
        editLesson(data).then(msg => toast.success(msg)).catch(err => toast.error("Có lỗi"));
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit / Lesson" />
            <Card color="transparent" className={"flex items-center"} shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Bài học
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Thêm bài học
                </Typography>
                <form onSubmit={handleSubmit} >
                    <div className={"w-80"}>
                        <label htmlFor="subjectID" className="block mb-2 text-sm font-medium text-gray-900 ">Subject</label>
                        <select id="subjectID" name={"subjectID"} onChange={handleSubjectChange}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                            {subjectID.map(each => (
                                <option key={each.id} value={each.id}>{each.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"w-80"}>
                        <label htmlFor="courseID" className="block mb-2 text-sm font-medium text-gray-900 ">Khoá học</label>
                        <select id="courseID" name={"courseID"} onChange={handleCourseChange}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                            {courseIDs.map(each => (
                                <option key={each._id} value={each._id}>{each.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"w-80"}>
                        <label htmlFor="chapterID" className="block mb-2 text-sm font-medium text-gray-900 ">Chương</label>
                        <select id="chapterID" name={"chapterID"} onChange={handleChangeSelect}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                            {chapterIDs.map(each => (
                                <option key={each._id} value={each._id}>{each.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"w-80"}>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Tiêu đề</label>
                        <input type="text" id="name" name={"name"} value={name} onChange={e => setName(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div className={"w-80 mt-2"}>
                        <label htmlFor="urlVideo" className="block mb-2 text-sm font-medium text-gray-900 ">Đường dẫn video</label>
                        <input type="text" id="urlVideo" name={"urlVideo"} value={urlVideo} onChange={e => setUrl(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div className={"w-80 mt-2"}>
                        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 ">Thời lượng</label>
                        <input type="text" id="time" name={"time"} value={time} onChange={e => setTime(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <button type="submit"
                        className="mt-4 self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thêm
                    </button>
                </form>
            </Card>
        </DefaultLayout>
    )
}

export default LessonEdit;