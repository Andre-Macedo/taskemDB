
// makes the definition of the interface of the task repository
// so any implementation of the task repository is going to have its methods defined here
module.exports = (implementation) => {
    if (!implementation.register) {
        throw new Error(`The class ${implementation} didnt implement the method register`)
    }

    if (!implementation.edit) {
        throw new Error(`The class ${implementation} didnt implement the method filter`)
    }

    if (!implementation.delete) {
        throw new Error(`The class ${implementation} didnt implement the method delete`)
    }

    if (!implementation.filterByUserPeriodAndStatus) {
        throw new Error(`The class ${implementation} didnt implement the method filterByUserPeriodAndStatus`)

    }

    if (!implementation.searchById) {
        throw new Error(`The class ${implementation} didnt implement the method searchById`)
    }

    return implementation;
}