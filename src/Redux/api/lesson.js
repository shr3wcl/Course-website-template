import {instance} from "../../createInstance";

export const addLesson = async (data) => {
    try{
        const res = await instance.post("v1/course/lesson/new", data);
        return res.data.message;
    }catch(err){
        return "Có lỗi";
    }
}

export const getAllLesson = async () => {
    try {
        const res = await instance.get("v1/course/lesson/all");
        return res.data.data;
    } catch (err) {
        return "Có lỗi";
    }
}