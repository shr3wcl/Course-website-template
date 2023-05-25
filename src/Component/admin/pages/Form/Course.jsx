import Breadcrumb from "../../components/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import {Card, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {addCourse} from "../../../../Redux/api/course";
import {toast} from "react-toastify";
import { Select, Option } from "@material-tailwind/react";
import {getAllIdSubject} from "../../../../Redux/api/subject";
const Course = () => {
    const [subjectID, setSubjectID] = useState([]);
    const [formData, setFormData] = useState({
        subjectID: null,
        title: null,
        desc: null,
        price: null,
        lecture: null,
        students: 0,
        status: true,
        image: null,
    });
    useEffect(() => {
        async function getData(){
            setSubjectID(await getAllIdSubject());
        }
        getData();
        setFormData({...formData, subjectID: subjectID[0].id});
    }, []);
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFormData({ ...formData, image: file });
    };
    const handleRadioChange = () => {
        setFormData({...formData, status: !formData.status});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addCourse(formData).then(msg => toast.success(msg)).catch(err => toast.error("Có lỗi"));
    }

    const handleChangeSelect = (e) => {
        setFormData({...formData, subjectID: e.target.value})
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
                        <label htmlFor="subjectID" className="block mb-2 text-sm font-medium text-gray-900 ">ID của chủ đề khoá học</label>
                        <select id="subjectID" name={"subjectID"} onChange={handleChangeSelect}
                               className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 ">
                            {subjectID.map(each => (
                                <option key={each.id} value={each.id}>{each.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={"w-80"}>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Tiêu đề</label>
                        <input type="text" id="name" name={"title"} value={formData.title} onChange={handleInputChange}
                               className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "/>
                    </div>
                    <div className={"w-80 mt-2"}>
                        <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">Miêu tả</label>
                        <input type="text" id="desc" name={"desc"} onChange={handleInputChange}
                               className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "/>
                    </div>
                    <div className={"w-80 mt-2"}>
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">Ảnh</label>
                        <input type="file" id="image" name={"image"} onChange={handleImageChange}
                               className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "/>
                    </div>
                    <div className={"w-80 mt-2"}>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Giá khoá học</label>
                        <input type="text" id="price" name={"price"} onChange={handleInputChange}
                               className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "/>
                    </div>
                    <div className={"w-80 mt-2"}>
                        <label htmlFor="lecture" className="block mb-2 text-sm font-medium text-gray-900 ">Giảng viên</label>
                        <input type="text" id="lecture" name={"lecture"} onChange={handleInputChange}
                               className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "/>
                    </div>
                    <div className={" w-80 mt-5 justify-around"}>
                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 ">Trạng thái</label>
                        <div className="flex items-center mb-4">
                            <input id="default-radio-1" type="radio" checked={formData.status===true} value="" name="status" onChange={handleRadioChange}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900">Công khai</label>
                        </div>
                        <div className="flex items-center">
                            <input  id="default-radio-2" type="radio" value="" name="status" checked={formData.status===false} onChange={handleRadioChange}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 ">Ẩn đi</label>
                        </div>
                    </div>
                    <button type="submit"
                            className="mt-4 self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thêm
                    </button>
                </form>
            </Card>
        </DefaultLayout>
    )
}

export default Course;
