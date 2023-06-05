import {instance} from "../../createInstance";

export const addChapter = async (data) => {
    try{
        const res = await instance.post("v1/course/chapter/new", data);
        return res.data.message;
    }catch(err){
        return "Lỗi"
    }
}

export const getChapterByCourseID = async (id) => {
    try {
        const res = await instance.get(`v1/course/chapter/course/${id}`);
        return res.data.data;
    }catch (err){
        return [];
    }
}

export const getAllChapter = async () => {
    try {
        const res = await instance.get(`v1/course/chapter/all`);
        return res.data.data;
    } catch (err) {
        return [];
    }
}