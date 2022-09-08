const Task = require("../../models/Task");
const TaskRepository = require("../TaskRepository");
const StatusTask = require("../../enum/StatusTask");

const transformTask = (taskDB) => {
    return {
        id: taskDB._doc._id,
        name: taskDB._doc.name,
        scheduledDate: taskDB._doc.scheduledDate,
        endDate: taskDB._doc.endDate,
        userId: taskDB._doc.userId
    }
}

class MongoDBUTaskRepository {
    static register(data) {
        return Task.create(data);
    };

    static edit(id, data) {
        return Task.findByIdAndUpdate(id, data)
    };

    static delete(id) {
        return Task.findByIdAndDelete(id);
    };

    static async filterByUserPeriodAndStatus({
        periodStart,
        periodEnd,
        status,
        userId
    }) {
        const query = {
            userId
        }

        if (periodStart && periodStart.trim()) {
            //converts the period start as a param to a javascript Date
            const datePeriodStart = new Date(periodStart);
            query.scheduledDate = {
                // >=
                $gte: datePeriodStart
            }

        }

        if (periodEnd && periodEnd.trim()) {
            //converts the period end as a param to a javascript Date
            const datePeriodEnd = new Date(periodEnd);
            if (!query.scheduledDate) {
                query.scheduledDate = {}
            }

            // applies filter to <= datePeriodEnd
            query.scheduledDate.$lte = datePeriodEnd;

        }

        if (status && status.trim()) {
            const statusInt = parseInt(status);
            if (statusInt === StatusTask.RUNNING) {
                query.endDate = null;
            } else if (statusInt === StatusTask.FINISHED) {
                query.endDate = {
                    $ne: null
                }
            }
        }

        const tasks = await Task.find(query);
        if (tasks) {
            //transforms the list to a model expected in the app
            return tasks.map(t => transformTask(t));
        }

        return [];
    }

    static async searchById(taskId) {
        const taskDB = await Task.findById(taskId);
        if (taskDB) {
            return transformTask(taskDB);
        }

        return null
    }

}

module.exports = TaskRepository(MongoDBUTaskRepository);