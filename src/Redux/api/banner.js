import {instance} from "../../createInstance";
import {toast} from "react-toastify";

export const getBanner = async () => {
    try{
        const data = await instance.get("v1/course/banner/public");
        return data.data.data;
    }catch(err){
        console.log(err)
    }
}
export const getAllBanner = async () => {
    try {
        const data = await instance.get("v1/course/banner/all");
        return data.data.data;
    } catch (err) {
        console.log(err)
    }
}
export const addBanner = async (data) => {
    try{
        const res = await instance.post("v1/course/banner/add", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data.message;
    }catch(err){
        console.log(err);
    }
}

export const getDetailBanner = async (id) => {
    try {
        const res = await instance.get(`v1/course/banner/detail/${id}`);
        return res.data.data;
    } catch (error) {
        return {};
    }
}

export const editBanner = async (data) => {
    try {
        const res = await instance.post("v1/course/banner/edit", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data.message;
    } catch (error) {
        return "Có lỗi";
    }
}