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
