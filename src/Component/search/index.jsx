import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { search } from "../../Redux/api/course";

const Search = () => {
    const { key } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            setData(await search(key));
        }
        getData();
    }, [key]);

    return (
        <div className="my-8 mx-8">
            <h1 className="font-bold text-[18px] my-8">Result search of "{ key }"</h1>
            <div className="grid grid-cols-3 mx-8">
                <div className="border-r-2 min-h-[60px]">
                    <h1 className="text-center font-semibold text-[18px] border-b-2 w-full py-2">Course</h1>
                    {data.course?.length ? (
                        <ul className="mx-3">
                            {
                                data.course?.map(each =>
                                (
                                    <Link class="pb-3 sm:pb-4 mx-2" key={each._id} to={`/chapters/${each._id}`}>
                                        <div class="flex items-center space-x-4">
                                            <div class="flex-shrink-0">
                                                <img class="w-8 h-8 rounded-full"
                                                    src={`http://localhost:8000/${each.img}`} alt="Neil image" />
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium">
                                                    {each.title}
                                                </p>
                                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    Lecture: {each.lecture}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                    </ul>

                    ) : (
                            <h1 className="mx-3 text-center mt-4">Empty</h1>
                        )}
                </div>
                <div className="border-r-2 min-h-[60px]">
                    <h1 className="text-center font-semibold text-[18px] border-b-2 py-2">Lesson</h1>
                    {data.lesson?.length ? (
                        <ul className="mx-3">
                            {data.lesson?.map(each =>
                            (
                                <Link class="pb-3 sm:pb-4 mx-2 my-1" key={each._id} to={`/lesson/${each._id}`}>
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full"
                                                src={`http://localhost:8000/${each.courseID.img}`} alt="Neil image" />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium">
                                                {each.name}
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                Course: {each.courseID.title}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </ul>
                    ) : (
                        <h1 className="mx-3 text-center mt-4">Empty</h1>
                    )}
                </div>
                <div className="">
                    <h1 className="text-center font-semibold text-[18px] border-b-2 py-2">User</h1>
                    {data.user?.length ? (
                        <ul className="mx-3">
                            {data.user?.map(each =>
                            (
                                <Link class="pb-3 sm:pb-4 mx-2 my-1" key={each._id} to={`/profile/${each._id}`}>
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full"
                                                src={`http://localhost:8000/${each.avatar}`} alt="Neil image" />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium">
                                                {each.name}
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {/* Course: {each.courseID.title} */}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </ul>
                    ) : (
                        <h1 className="mx-3 text-center mt-4">Empty</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Search;