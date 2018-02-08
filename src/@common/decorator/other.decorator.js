export const Readonly = (...arg) => {
    if (arg.length == 1) {
        return (target, name, descriptor) => {
            arg = arg[0];
            descriptor.writable = typeof arg == 'boolean' ? arg : false;
            descriptor.configurable = false;
            return descriptor;
        }
    } else if (arg.length == 3) {
        let descriptor = arg[2];
        descriptor.writable = false;
        descriptor.configurable = false;
        return descriptor
    }
}

export const Enumerable = (...arg) => {
    if (arg.length == 1) {
        return (target, name, descriptor) => {
            arg = arg[0];
            descriptor.enumerable = typeof arg == 'boolean' ? arg : false;
            return descriptor;
        }
    } else if (arg.length == 3) {
        let descriptor = arg[2];
        descriptor.enumerable = false;
        return descriptor
    }
}