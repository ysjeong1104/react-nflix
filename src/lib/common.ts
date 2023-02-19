import { IMAGE_BASE_URL } from "../config/config";

const makeImgPath=(id : string, format? : string) =>{
    return `${IMAGE_BASE_URL}/${format? format : "original"}${id}`;
}

export {makeImgPath};