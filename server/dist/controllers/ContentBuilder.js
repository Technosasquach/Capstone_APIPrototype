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
const index_1 = require("./../database/index");
var Answer;
(function (Answer) {
    Answer["A"] = "A";
    Answer["B"] = "B";
    Answer["C"] = "C";
    Answer["D"] = "D";
    Answer["NULL"] = "NULL";
})(Answer || (Answer = {}));
class ContentController {
    static checkInputs(condition, type, data, ids, id) {
        if (condition) {
            if (!this.checkType(ids, type)) {
                return new index_1.Information({
                    nodeId: id,
                    type: type,
                    data: data
                }).save().catch(() => { throw (-1); });
            }
        }
        else {
            if (this.checkType(ids, type)) {
                index_1.Information.findByIdAndDelete(this.getType(ids, type)).then(() => { ids.splice(this.getIndex(ids, type), 1); }).catch(() => { throw (-1); });
            }
        }
    }
    static BuildPage(text, images, ids, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.checkInputs((text !== "" && text !== undefined), "text", text, ids, id);
                yield this.checkInputs((JSON.parse(images).length > 0 && images !== undefined), "images", images, ids, id);
                ids.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield index_1.Information.findByIdAndUpdate(element.id, {
                        id: element.id,
                        type: element.type,
                        data: (element.type === "text" ? text : images)
                    }).catch(() => { throw (-1); });
                }));
            }
            catch (_a) {
                return -1;
            }
        });
    }
    static BuildQuiz(questions, node) {
        return __awaiter(this, void 0, void 0, function* () {
            if (questions.length > 0) {
                const Questions = [];
                const Answer = [];
                const Answers = [];
                for (let i = 0; i < questions.length; i++) {
                    if (!this.checkQuestionValid(questions[i])) {
                        throw (-2);
                    }
                    Questions.push(questions[i].question);
                    Answer.push(questions[i].answer);
                    Answers.push(questions[i].answers);
                }
                return yield new index_1.Quiz({
                    nodeID: node,
                    questions: Questions,
                    answer: Answer,
                    answers: Answers
                }).save().catch(() => { throw (-2); });
            }
        });
    }
    static BuildCourse(coursename, nodes, text, quizzes, images, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const Quizzes = [];
            for (let i = 0; i < nodes.length; i++) {
                const temp = yield this.BuildPage(text[i], images[i], ids[i], nodes[i]);
                if (temp == -1) {
                    return -1;
                }
                try {
                    const quiz = yield this.BuildQuiz(quizzes[i], nodes[i]);
                    if (quiz != null) {
                        Quizzes.push(quiz);
                    }
                }
                catch (_a) {
                    return -2;
                }
            }
            ;
            try {
                return yield new index_1.Course({
                    name: coursename,
                    nodes: nodes,
                    quizzes: Quizzes
                }).save().catch(() => { throw (-3); });
            }
            catch (_b) {
                return -3;
            }
        });
    }
}
exports.ContentController = ContentController;
ContentController.checkType = (types, type) => {
    for (let i = 0; i < types.length; i++) {
        if (types[i].type === type) {
            return true;
        }
    }
    return false;
};
ContentController.getType = (types, type) => {
    for (let i = 0; i < types.length; i++) {
        if (types[i].type === type) {
            return types[i].id;
        }
    }
};
ContentController.getIndex = (types, type) => {
    for (let i = 0; i < types.length; i++) {
        if (types[i].type === type) {
            return i;
        }
    }
};
ContentController.checkQuestionValid = (question) => {
    if (!question.answer) {
        return false;
    }
    if (!question.answer) {
        return false;
    }
    for (let i = 0; i < 4; i++) {
        if (!question.answers[i]) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=ContentBuilder.js.map