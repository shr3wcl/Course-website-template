import {instance} from "../../createInstance";

export const getBanner = async (req, res) => {
    try{
        const data = await instance.get("v1/course/banner/public");
        return data.data.data;
    }catch(err){
        console.log(err)
    }
}
