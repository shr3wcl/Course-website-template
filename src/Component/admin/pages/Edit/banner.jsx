import Breadcrumb from '../../components/Breadcrumb';
import { Button, Card, Checkbox, Input, Typography } from "@material-tailwind/react";
import DefaultLayout from '../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { editBanner, getDetailBanner } from '../../../../Redux/api/banner';
import { toast } from 'react-toastify';
const BannerEdit = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [extenalLink, setLink] = useState('');
    const [status, setStatus] = useState(true);
    const [name, setName] = useState('');
    const [file, setFile] = useState();
    const [img, setImg] = useState('');

    useEffect(() => {
        const getData = async () => {
            const banner = await getDetailBanner(id);
            setData(banner);
            setName(banner?.name);
            setStatus(banner?.status);
            setLink(banner?.extenalLink);
            setImg(banner?.urlImg);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id, name, status, extenalLink, image: file, linkImg: img
        }
        editBanner(formData).then(msg => toast.success(msg)).catch(err => toast.error("Error"));
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Banner" />

            <Card color="transparent" className={"flex items-center"} shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Banner
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Thêm banner
                </Typography>
                <form onSubmit={handleSubmit} >
                    <div className={"w-80"}>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Tiêu đề</label>
                        <input type="text" id="name" name={"name"} value={name} onChange={e => setName(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div className={"w-80 mt-2"}>
                        <label htmlFor="extenalLink" className="block mb-2 text-sm font-medium text-gray-900 ">Đường dẫn</label>
                        <input type="text" id="extenalLink" name={"extenalLink"} value={data?.extenalLink} onChange={e=>setLink(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div className={"w-80 mt-2"}>
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">Ảnh</label>
                        <img src={`http://localhost:8000/${data?.urlImg}`} alt="" />
                        <input type="file" id="image" name={"image"} onChange={handleImageChange}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div className={" w-80 mt-5 justify-around"}>
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 ">Trạng thái</label>
                        <div className="flex items-center mb-4">
                            <input id="default-radio-1" type="radio" checked={status === true} value="" name="status" onChange={handleRadioChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900">Công khai</label>
                        </div>
                        <div className="flex items-center">
                            <input id="default-radio-2" type="radio" value="" name="status" checked={status === false} onChange={handleRadioChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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

export default BannerEdit;