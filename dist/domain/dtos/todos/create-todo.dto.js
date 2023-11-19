"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoDto = void 0;
class CreateTodoDto {
    constructor(text) {
        this.text = text;
    }
    static create(props) {
        const { text } = props;
        if (!text)
            return ['Text is required', undefined];
        return [undefined, new CreateTodoDto(text)];
    }
}
exports.CreateTodoDto = CreateTodoDto;
//# sourceMappingURL=create-todo.dto.js.map