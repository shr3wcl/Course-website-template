import Breadcrumb from "../../components/Breadcrumb";
import { Card, Typography } from "@material-tailwind/react";
import DefaultLayout from "../../layout/DefaultLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { detailChapter, editChapter } from "../../../../Redux/api/chapter";
import { getIDCourse } from "../../../../Redux/api/course";
import { toast } from "react-toastify";
const ChapterEdit = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [courseIDs, setCourseIDs] = useState([]);
    const [courseID, setCourseID] = useState('');
    const [name, setName] = useState('');
    const [quanLesson, setQuanLesson] = useState(0);
    useEffect(() => {
        const getData = async () => {
            const chapter = await detailChapter(id);
            const data = await getIDCourse();
            setCourseIDs(data);
            setData(chapter);
            setCourseID(chapter?.courseID);
            setName(chapter?.name);
            setQuanLesson(chapter?.quanLesson);
        }
        getData();
    }, [id]);
    const handleChangeSelect = (e) => {
        setCourseID(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id, name, courseID, quanLesson
        }
        editChapter(formData).then(msg => toast.success(msg)).catch(err => toast.error("Error"));
    }
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit / Chapter" />
            <Card color="transparent" className={"flex items-center"} shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Chapter
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    New Chapter
                </Typography>
                <form onSubmit={handleSubmit} >
                    <div className={"w-80"}>
                        <label htmlFor="courseID" className="block mb-2 text-sm font-medium text-gray-900 ">ID Course</label>
                        <select id="courseID" name={"courseID"} onChange={handleChangeSelect}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                            {courseIDs.map(each => (
                                <option key={each._id} value={each._id}>{each.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"w-80"}>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Tiêu đề</label>
                        <input type="text" id="name" name={"name"} value={name} onChange={e=>setName(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <button type="submit"
                        className="mt-4 self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit
                    </button>
                </form>
            </Card>
        </DefaultLayout>
    )
}

export default ChapterEdit;