import {instance} from "../../createInstance";

export const getCourse = async (id) => {
    try{
        const data = await instance.get(`v1/course/public/${id}`);
        return data.data.data;
    }catch(err){
        return [];
    }
}

export const getIDCourse = async () => {
    try{
        const res = await instance.get("v1/course/all");
        return res.data.data;
    }catch(err){
        return [];
    }
}
export const addCourse = async (data) => {
    try{
        const res = await instance.post("v1/course/storage", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data.message;
    }catch(err){
        return "Error";
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

export const getCourseBySubjectID = async (id) => {
    try{
        const res = await instance.get(`v1/course/subject/course/${id}`);
        return res.data.data;
    }catch(err){
        return [];
    }
}

export const increaseStudent = async (id) => {
    try{
        const res = await instance.get(`v1/course/student/increase/${id}`);
    }catch(err){
    }
}

export const addMyCourse = async (data) => {
    try{
        const res = await instance.post("v1/course/my-course/add", data);
        return res.data.message;
    }catch(err){
        return "Error";
    }
}

export const getAllMyCourse = async (id) => {
    try{
        const res = await instance.get(`v1/course/my-course/all/${id}`);
        return res.data.data;
    }catch(err){
        return "Error";
    }
}

export const search = async (key) => {
    try {
        const res = await instance.get(`v1/course/search/${key}`);
        return res.data.data;
    } catch (error) {
        return [];
    }
}