import { imageValidate } from './validateType.js';
import cloudinary from 'cloudinary';

/** 
 *                       =========  Configuration ============
 *  gets  Account Details from https://cloudinary.com/ 
 * 
 *  @function setCloudinaryConfig(config)  @param {object} config have the following properties:
 *  
 *  @param {string} cloud_name 
 *  @param {string}  api_key 
 *  @param {string} api_secret 
 * 
 *  
 *                      =========  Upload images ============
 * 
 *  @function fileUpload @param {file} image => @returns {Promise}
 * 
 *  @param {file} image => Available types: ['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'] * 
 * 
 * 
 *                      ==========  Error list ============
 * 
 *  @Error {Invalid Image}      =>  image is undefined
 *  @Error {Invalid Image type} =>  image type is not valid
 * 
 * 
 * Oficial documentation page => https://github.com/cloudinary/cloudinary_npm/blob/master/samples/basic/basic.js
 */


export const setCloudinaryConfig = ( config ) => {

    cloudinary.config(config);

}
  
export const fileUpload = ( imagen ) => {  
    
   if(!imagen){

     throw new Error('Invalid Image');
   }
    if(imageValidate(imagen) )
    {
        return cloudinary.uploader.upload(imagen, { tags: 'basic_sample' });
    }else{
        throw new Error('Invalid Image type');
    }
}
 