import {instance} from "../../createInstance";

export const getCourse = async () => {
    try{
        const data = await instance.get("v1/course/public");
        return data.data.data;
    }catch(err){
        return [];
    }
}

export const detailCourse = async (id) => {
    try{
        const data = await instance.get(`v1/course/${id}`);
        return data.data.data;
    }catch(err){
        return {};
    }
}

export const getChapter = async (id) => {
    try{
        const data = await instance.get(`v1/course/chapter/all/${id}`);
        return data.data.data;
    }catch(err){
        return [];
    }
}

export const getAllLessonOfChapter = async (id) => {
    try{
        const data = await instance.get(`v1/course/lesson/all/${id}`);
        return data.data.data;
    }catch(err){
        return [];
    }
}

export const detailLesson = async (id) => {
    try{
        const data= await instance(`v1/course/lesson/detail/${id}`);
        return data.data.data;
    }catch(err){
        return {};
    }
}
