import {useEffect, useState} from "react";
import {getSubject} from "../../Redux/api/subject";
import Course from "../Courses";
import moment from "moment";

const Subject = () => {
    const now = new Date();
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            setData(await getSubject());
        }
        getData();
    }, [])

    return (
        <div className={"px-20 mt-10"}>
            {data.map(each =>  (
                <div key={each._id}>
                    <div className={"my-5"}>
                        <h2 className={"font-bold text-2xl inline-block mr-4"}>{each.name}</h2>
                        {(now.getTime() / 1000 - (new Date('2023-05-25T15:12:33.922+00:00')).getTime() / 1000 ) <= 610800 ? (
                            <span className="ScrollList_label__aulkb">Mới</span>
                        ) : (
                            <></>
                            )}
                    </div>
                    <Course id={each._id}/>
                </div>
            ))}
        </div>
    )
}

export default Subject;
