import {useEffect, useState} from "react";
import {detailLesson} from "../../Redux/api/course";
import {useParams} from "react-router-dom";
import ReactPlayer from 'react-player';
import moment from 'moment';
const Lesson = () => {
    const {id} = useParams();
    const [data, setData] = useState({});
    useEffect(() => {
        const getData = async () => {
            setData(await detailLesson(id));
        }
        getData();
    })
    const date = moment(data.updatedAt);
    const formattedDate = date.format('[tháng] M [năm] YYYY');
    return (
        <div>
            <div>
                <div className={""}>
                    <ReactPlayer
                        url={data.urlVideo}
                        width="100%"
                        playing={true}
                        controls={true}
                    />
                </div>
                <div className={"px-[10%] py-10"}>
                    <h1 className={"font-bold text-4xl"}>{data.name}</h1>
                    <span className={"mt-12 text-gray-500"}>Cập nhập vào {formattedDate}</span>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Lesson;
