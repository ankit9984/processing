import slugify from 'slugify';

const generateSlug = (name) => {
    return slugify(name, {lower: true, strict: true})
};

export default generateSlug;