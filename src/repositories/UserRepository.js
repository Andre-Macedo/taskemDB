
// makes the definition of the interface of the user repository
// so any implementation of the user repository is going to have its methods defined here
module.exports = (implementation) => {
    if (!implementation.register) {
        throw new Error(`The class ${implementation} didnt implement the method register`)
    }

    if (!implementation.filter) {
        throw new Error(`The class ${implementation} didnt implement the method filter`)
    }

    if (!implementation.searchById) {
        throw new Error(`The class ${implementation} didnt implement the method searchById`)
    }

    return implementation;
}