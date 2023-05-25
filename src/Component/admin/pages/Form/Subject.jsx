import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import {Card, Typography} from "@material-tailwind/react";
import {useState} from "react";
import {addSubject} from "../../../../Redux/api/subject";
import {toast} from "react-toastify";

const Subject = () =>  {
    const [name, setName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name
        };
        addSubject(data).then(msg => toast.success(msg)).catch(err => toast.warn("Có lỗi"));
    }
    return(
        <DefaultLayout>
            <Breadcrumb pageName="Banner"/>
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

export default Subject;
