import {instance} from "../../createInstance";

export const addLesson = async (data) => {
    try{
        const res = await instance.post("v1/course/lesson/new", data);
        return res.data.message;
    }catch(err){
        return "Error";
    }
}

export const getAllLesson = async () => {
    try {
        const res = await instance.get("v1/course/lesson/all");
        return res.data.data;
    } catch (err) {
        return "Error";
    }
}

export const editLesson = async (data) => {
    try {
        const res = await instance.post("v1/course/lesson/edit", data);
        return res.data.message;
    } catch (error) {
        return "Error";
    }
}

export const deleteLesson = async (id) => {
    try {
        const res = await instance.delete(`v1/course/lesson/delete/${id}`);
        return res.data.message;
    } catch (error) {
        return "Error";
    }
}