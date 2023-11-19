"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const postgresql_1 = require("../../data/postgresql");
const dtos_1 = require("../../domain/dtos");
class TodosController {
    //* DI
    constructor() {
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const todos = yield postgresql_1.prisma.todo.findMany();
            return res.json(todos);
        });
        this.getTodoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: 'Id must be a number' });
            const todo = yield postgresql_1.prisma.todo.findFirst({ where: { id } });
            (todo)
                ? res.json(todo)
                : res.status(404).json({ error: `Todo with id ${id} not found` });
        });
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, createTodoDto] = dtos_1.CreateTodoDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const todo = yield postgresql_1.prisma.todo.create({
                data: createTodoDto
            });
            res.json(todo);
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            const [error, updateTodoDto] = dtos_1.UpdateTodoDto.create(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const todo = yield postgresql_1.prisma.todo.findUnique({ where: { id } });
            if (!todo)
                return res.status(404).json({ error: `Todo with id ${id} not found` });
            const updatedTodo = yield postgresql_1.prisma.todo.update({
                where: { id },
                data: updateTodoDto.values
            });
            res.json(updatedTodo);
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: 'Id must be a number' });
            const todo = yield postgresql_1.prisma.todo.findUnique({ where: { id } });
            if (!todo)
                return res.status(404).json({ error: `Todo with id ${id} not found` });
            const deleted = yield postgresql_1.prisma.todo.delete({
                where: { id }
            });
            (deleted)
                ? res.json(deleted)
                : res.status(400).json({ error: `Todo with id ${id} not exist` });
            res.json({ todo, deleted });
        });
    }
}
exports.TodosController = TodosController;
//# sourceMappingURL=controller.js.map