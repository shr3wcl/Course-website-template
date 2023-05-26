import {instance} from "../../createInstance";

export const getInfo = async (id) => {
    try{
        const res = await instance.get(`v1/user/getInfo/${id}`);
        return res.data.data;
    }catch(err){
        return {};
    }
}

export const changePassword = async (data) => {
    try{
        const res = await instance.post("v1/user/password/change", data);
        return res.data.message;
    }catch(err){
        return "Có lỗi";
    }
}

export const changeName = async (data) => {
    try{
        const res = await instance.post("v1/user/name/change", data);
        return res.data.message;
    }catch(err){
        return "Có lỗi";
    }
}

export const changeAvatar = async (data) => {
    try{
        const res = await instance.post("v1/user/avatar/change", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data.message;
    }catch(err){
        return "Có lỗi";

    }
}
