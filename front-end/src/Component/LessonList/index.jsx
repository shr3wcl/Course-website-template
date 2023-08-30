import {useEffect, useState} from "react";
import {getAllLessonOfChapter} from "../../Redux/api/course";

const LessonList = (props) => {
    const [data, setData] = useState([]);
    let index = 1;
    useEffect(()=>{
        async function getData(){
            setData(await getAllLessonOfChapter(props.id));
        }
        getData();
    }, [])
    return (
        <div>
            {data.length ? (
                <div className="flex flex-col">
                    {data.map(each => (
                        <a href={`/lesson/${each._id}`} key={each._id} className="flex items-center py-2">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="circle-play"
                                className="w-4 h-4 mr-2 text-gray-600"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z"
                                ></path>
                            </svg>
                            <div className="font-semibold">{index++}. {each.name}</div>
                            <span className="ml-auto text-sm">{each.time}</span>
                        </a>
                    ))}
                </div>
            ) : (
                <div>
                    <h1>Hiện chưa có video cho chương học này</h1>
                </div>
            )}
        </div>
    )
}

export default LessonList;
