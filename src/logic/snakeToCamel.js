// requires minimum one character on either side of an underscore
export function isSnakeCase(str) {
    return /^[a-z_]*[a-z][a-z_]*_+[a-z_]*[a-z][a-z_]*$/i.test(str);
}

// Capitalise any letter preceded by an underscore and remove the underscore
export function snakeToCamel(str) {
    if(!isSnakeCase(str)) {
        return str;
    }
    return str.toLowerCase().replace(/_[a-z]/g, val => val.substring(1).toUpperCase());
}

// shorthand 
function reduceKeys(obj, fn) {
    return Object.keys(obj).reduce(fn, {})
}

// recursive function converting all nested object keys
export function formatObjectCamelCase (obj) {
    if(typeof obj === "object") {
        if(Array.isArray(obj)) {
            return obj.map(val => formatObjectCamelCase(val));
        }
        return reduceKeys(obj, (acc, key) => ({
            ...acc,
            [snakeToCamel(key)]: formatObjectCamelCase(obj[key]),
        }));
    }
    return obj;
}