export const isNotEmpty = () => {
    return (target, name, descriptor) => {
        console.log('###isNotEmpty')
        console.log(descriptor.value);
        return descriptor;
    }
}