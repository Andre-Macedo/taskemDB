const HttpController = require("./HttpController");
const TaskService = require("../services/TaskService")

class TaskController extends HttpController {
    configRoutes(basePath) {
        this.express.get(`${basePath}/task`, this.list.bind(this));
        this.express.post(`${basePath}/task`, this.register.bind(this));
        this.express.put(`${basePath}/task/:id`, this.edit.bind(this));
        this.express.delete(`${basePath}/task/:id`, this.delete.bind(this));
    }

    async list(req, res) {
        try {
            const service = new TaskService(req.user.id);
            const tasks = await service.list(req.query);
            res.json(tasks)

        } catch (e) {
            req.logger.error("failure to proccess task listing request", `error=` + e.message);
            res.status(500).json({
                status: 500,
                error: "Not possible to list the tasks, try again later"
            })
        }
    }

    async register(req, res) {
        try {
            const service = new TaskService(req.user.id);
            const result = await service.register(req.body);

            if (result.errors) {
                return res
                    .status(400)
                    .json({
                        status: 400,
                        error: result.errors
                    })
            }

            return res.json({
                msg: "Task registered succesfully"
            })

        } catch (e) {
            req.logger.error("failure to proccess task register request", `error=` + e.message);
            res.status(500).json({
                status: 500,
                error: "Not possible to register the task, try again later"
            })
        }
    }

    async edit(req, res) {
        try {
            const service = new TaskService(req.user.id);
            const response = await service.edit(req.params.id, req.body)
            if (response.errors) {
                return res
                    .status(400)
                    .json({
                        status: 400,
                        error: response.errors
                    })
            }

            res.json({
                msg: "Task edited sucessfully"
            })

        } catch (e) {
            req.logger.error("failure to edit task  request", `error=` + e.message);
            res.status(500).json({
                status: 500,
                error: "Not possible to edit the task, try again later"
            })
        }
    }

    async delete(req, res) {
        try {
            const service = new TaskService(req.user.id);
            const response = await service.delete(req.params.id);
            if (response.errors) {
                return res
                    .status(400)
                    .json({
                        status: 400,
                        error: response.errors
                    })
            }

            res.json({
                msg: "Task deleted sucessfully"
            })
        } catch (e) {
            req.logger.error("failure to delete task  request", `error=` + e.message);
            res.status(500).json({
                status: 500,
                error: "Not possible to delete the task, try again later"
            })
        }

    }

}

module.exports = TaskController;