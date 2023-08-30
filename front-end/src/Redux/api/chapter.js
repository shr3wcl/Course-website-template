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

export const detailChapter = async (id) => {
    try {
        const res = await instance.get(`v1/course/chapter/detail/${id}`);
        return res.data.data;
    } catch (err) {
        return {};
    }
}

export const editChapter = async (data) => {
    try {
        const res = await instance.post("v1/course/chapter/edit", data);
        return res.data.message;
    } catch (error) {
        return "Error";
    }
}

export const deleteChapter = async (id) => {
    try {
        const res = await instance.get(`v1/course/chapter/delete/${id}`);
        return res.data.data;
    } catch (err) {
        return "Error";
    }
}