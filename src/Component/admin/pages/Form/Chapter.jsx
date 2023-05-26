import Breadcrumb from "../../components/Breadcrumb";
import {Card, Typography} from "@material-tailwind/react";
import DefaultLayout from "../../layout/DefaultLayout";
import {useEffect, useState} from "react";
import {addCourse, getIDCourse} from "../../../../Redux/api/course";
import {toast} from "react-toastify";
import {addChapter} from "../../../../Redux/api/chapter";

const Chapter = () => {
    const [courseIDs, setCourseIDs] = useState([]);
    const [formData, setFormData] = useState({
        name: null,
        courseID: null,
        quanLesson: 0
    });
    useEffect(() => {
        async function getData(){
            const data = await getIDCourse();
            setCourseIDs(data);
            setFormData({...formData, courseID: data[0]?._id})

        }
        getData();

    },[])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleChangeSelect = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        addChapter(formData).then(msg => toast.success(msg)).catch(err => toast.error("Có lỗi"));
    }

    return(
        <DefaultLayout>
            <Breadcrumb pageName="Banner" />
            <Card color="transparent" className={"flex items-center"} shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Khoá học
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Thêm khoá học
                </Typography>
                <form onSubmit={handleSubmit} >
                    <div className={"w-80"}>
                        <label htmlFor="courseID" className="block mb-2 text-sm font-medium text-gray-900 ">ID của khoá học</label>
                        <select id="courseID" name={"courseID"} onChange={handleChangeSelect}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                            {courseIDs.map(each => (
                                <option key={each._id} value={each._id}>{each.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"w-80"}>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Tiêu đề</label>
                        <input type="text" id="name" name={"name"} value={formData.name} onChange={handleInputChange}
                               className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "/>
                    </div>
                    <button type="submit"
                            className="mt-4 self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thêm
                    </button>
                </form>
            </Card>
        </DefaultLayout>
    )
}

export default Chapter;
