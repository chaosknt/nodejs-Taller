import { validateMIMEType } from "validate-image-type";

export const imageValidate = (image) => {

    const result = validateMIMEType(image, {
        allowMimeTypes: ['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml']
    });

    if (!result.ok) return false;
        
    return true;
}
