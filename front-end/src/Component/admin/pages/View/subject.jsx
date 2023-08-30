import { useEffect, useState } from "react";
import { deleteSubject, getSubject } from "../../../../Redux/api/subject";
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumb';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SubjectView = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            setData(await getSubject());
        }
        getData();
    })
    const handleDelete = (id) => {
        deleteSubject(id).then(msg => toast.success("Success")).catch(err => toast.error("Error"));
    }
    return (
        <DefaultLayout>

            <Breadcrumb pageName="View / Subject" />
            <h1 className="font-bold my-4">Subject</h1>
            <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subject name
                                        </th>
                                        <th scope="col" class="relative px-6 py-3">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    {data.map(each => (
                                        <tr key={each._id}>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <div class="ml-4">
                                                        <div class="text-sm font-medium text-gray-900">
                                                            {each.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-evenly">
                                                <Link to={`/admin/edit/subject/${each._id}`} class="cursor-pointer text-indigo-600 mr-2 hover:text-indigo-900">Edit</Link>
                                                <h1 class="cursor-pointer text-red-500 hover:text-red-700" onClick={_=>handleDelete(each?._id)}>Delete</h1>
                                            </td>
                                        </tr>
                                    ))}

                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default SubjectView;