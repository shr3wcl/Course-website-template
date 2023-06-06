import {instance} from "../../createInstance";

export const getSubject = async () => {
    try{
        const data = await instance.get("v1/course/subject/all");
        return data.data.data;
    }catch(err){
        return [];
    }
}

export const addSubject = async (data) => {
    try{
        const res = await instance.post("v1/course/subject/add", data);
        return res.data.message;
    }catch(err){
    }
}

export const getAllIdSubject = async () => {
    try{
        const res = await instance.get("v1/course/subject/all");
        const data = res.data.data;
        const result = [];
        data.forEach(each => result.push({name: each.name, id: each._id}));
        return result;
    }catch(err){
        return [];
    }
}
export const detailSubject = async (id) => {
    try{
        const res = await instance.get(`v1/course/subject/detail/${id}`);
        return res.data.data;
    } catch (err) {
        return {};
    }
}
export const editSubject = async (data) => {
    try {
        const res = await instance.post("v1/course/subject/edit", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data.message;
    } catch (error) {
        return "Error";
    }
}