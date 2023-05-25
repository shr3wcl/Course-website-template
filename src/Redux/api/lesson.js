import {instance} from "../../createInstance";

export const addLesson = async (data) => {
    try{
        const res = await instance.post("v1/course/lesson/new", data);
        return res.data.message;
    }catch(err){
        return "Có lỗi";
    }
}
