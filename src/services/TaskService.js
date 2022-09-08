const TaskRepository = require("../repositories/impl/MongoDBTaskRepository")

class TaskService {
    constructor(userId) {
        this.userId = userId;
    }

    async list(filtro = {}) {
        filtro.userId = this.userId
        return TaskRepository.filterByUserPeriodAndStatus(filtro)
    }

    async register(data) {
        const errors = [];
        if (!data) {
            errors.push("Please send data to register the task")
        } else {
            if (!data.name || !data.name.trim()) {
                errors.push("Task name obligatory")
            } else if (data.name.length < 4) {
                errors.push("Task name needs atleast 4 characters")
            }

            if (!data.scheduledDate || !data.scheduledDate.trim()) {
                errors.push("Scheduled date is obligatory")
            }
        }

        const response = { errors: null, task: null };
        if (errors.length) {
            response.errors = errors;
        } else {
            const scheduledDate = new Date(data.scheduledDate)
            const endDate = data.endDate ? new Date(data.endDate) : null;

            const task = {
                name: data.name,
                scheduledDate,
                endDate,
                userId: this.userId
            }

            response.task = await TaskRepository.register(task);
        }

        return response
    }

    async edit(id, data) {
        const errors = []
        if (!id) {
            errors.push("Task ID is obligatory");
        } else {
            const taskDB = await TaskRepository.searchById(id);
            // if task doesnt exist in the database or it belongs to another user
            if (!taskDB || taskDB.userId !== this.userId) {
                errors.push("Task not found")
            }

            if (data.name && data.name.trim() && data.name.trim().length < 4) {
                errors.push("Name must have atleast 4 characters");
            }
        }

        if (errors.length) {
            return {
                errors
            }
        }

        const dataRefresh = {};
        if (data.name && data.name.trim()) {
            dataRefresh.name = data.name
        }

        if (data.scheduledDate && data.scheduledDate.trim()) {
            dataRefresh.scheduledDate = new Date(data.scheduledDate);
        }

        if (data.endDate && data.endDate.trim()) {
            dataRefresh.endDate = new Date(data.endDate);
        }

        const taskEdited = await TaskRepository.edit(id, dataRefresh)

        return taskEdited;
    }

    async delete(id) {
        const errors = []
        if (!id) {
            errors.push("Task ID is obligatory");
        } else {
            const taskDB = await TaskRepository.searchById(id);
            // if task doesnt exist in the database or it belongs to another user
            if (!taskDB || taskDB.userId !== this.userId) {
                errors.push("Task not found")
            }
        }

        const response = { errors: null }
        if (errors.length) {
            response.errors = errors
        } else {
            await TaskRepository.delete(id);
        }

        return response
    }
}

module.exports = TaskService;