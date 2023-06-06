import Breadcrumb from "../../components/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { addCourse, detailCourse, editCourse } from "../../../../Redux/api/course";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getAllIdSubject } from "../../../../Redux/api/subject";
const CourseEdit = () => {
    const { id } = useParams();
    const [subjectIDs, setSubjectIDs] = useState([]);
    const [data, setData] = useState({});
    const [file, setFile] = useState();
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(true);
    const [subjectID, setSubjectID] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [lecture, setLecture] = useState('');
    useEffect(() => {
        async function getData() {
            const data = await detailCourse(id);
            const subject = await getAllIdSubject();
            setSubjectIDs(subject);
            setData(data);
            setStatus(data?.status);
            setTitle(data?.title);
            setSubjectID(data?.subjectID);
            setDescription(data?.desc);
            setPrice(data?.price);
            setLecture(data?.lecture);
        }
        getData();
    }, [id]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };
    const handleRadioChange = () => {
        setStatus(!status);
    }

    const handleChangeSelect = (e) => {
        setSubjectID(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id, subjectID, title, desc: description, price, lecture, status, linkImg: data?.img, image: file
        }
        editCourse(formData).then(msg => toast.success(msg)).catch(err => toast.error("Error"));
    }
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit / Course" />
            <Card color="transparent" className={"flex items-center"} shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Khoá học
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Thêm khoá học
                </Typography>
                <form onSubmit={handleSubmit} >
                    <div className={"w-80"}>
                        <label htmlFor="subjectID" className="block mb-2 text-sm font-medium text-gray-900 ">Subject ID</label>
                        <select id="subjectID" name={"subjectID"} value={subjectID} onChange={handleChangeSelect}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                            {subjectIDs.map(each => (
                                <option key={each.id} value={each.id}>{each.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"w-80"}>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                        <input type="text" id="name" name={"title"} value={title} onChange={e=>setTitle(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div className={"w-80 mt-2"}>
                        <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                        <input type="text" id="desc" name={"desc"} value={description} onChange={e=>setDescription(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div className={"w-80 mt-2"}>
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                        <img src={`http://localhost:8000/${data?.img}`} alt="" />
                        <input type="file" id="image" name={"image"} onChange={handleImageChange}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div className={"w-80 mt-2"}>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                        <input type="text" id="price" name={"price"} value={price} onChange={e=>setPrice(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div className={"w-80 mt-2"}>
                        <label htmlFor="lecture" className="block mb-2 text-sm font-medium text-gray-900 ">Lecture</label>
                        <input type="text" id="lecture" name={"lecture"} value={lecture} onChange={e=>setLecture(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div className={" w-80 mt-5 justify-around"}>
                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 ">Status</label>
                        <div className="flex items-center mb-4">
                            <input id="default-radio-1" type="radio" checked={status === true} name="status" onChange={handleRadioChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900">Public</label>
                        </div>
                        <div className="flex items-center">
                            <input id="default-radio-2" type="radio" name="status" checked={status === false} onChange={handleRadioChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 ">Private</label>
                        </div>
                    </div>
                    <button type="submit"
                        className="mt-4 self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit
                    </button>
                </form>
            </Card>
        </DefaultLayout>
    )
}

export default CourseEdit;