import {Course, Information, Quiz, IQuizModel, IInformationModel} from './../database/index';

interface idtype {
    id: string;
    type: string;
}

enum Answer {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    NULL = "NULL"
}

interface IQuestion {
    question: string;
    answer: Answer;
    answers: string[];
    removeable: boolean;
}

export class ContentController {
    private static checkType = (types: idtype[], type: string) => {
        for(let i = 0; i < types.length; i++) {
            if(types[i].type === type) {
                return true;
            }
        }
        return false;
    }
    
    private static getType = (types: idtype[], type: string) => {
        for(let i = 0; i < types.length; i++) {
            if(types[i].type === type) {
                return types[i].id;
            }
        }
    }
    
    private static getIndex = (types: idtype[], type: string) => {
        for(let i = 0; i < types.length; i++) {
            if(types[i].type === type) {
                return i;
            }
        }
    }

    private static checkInputs(condition: boolean, type: string, data: string, ids: idtype[], id: string) {
        if(condition) {
            if(!this.checkType(ids, type)) {
                return new Information({
                    nodeId: id,
                    type: type,
                    data: data
                }).save().catch(() => {throw(-1)});
            }
        } else {
            if(this.checkType(ids, type)) {
                Information.findByIdAndDelete(this.getType(ids, type)).then(() => {ids.splice(this.getIndex(ids, type), 1);}).catch(() => {throw(-1)});
            }
        }
    }

    public static async BuildPage(text: string, images: string, ids: idtype[], id: string) {
        try {
            await this.checkInputs((text !== "" && text !== undefined), "text", text, ids, id);
            await this.checkInputs((JSON.parse(images).length > 0 && images !== undefined), "images", images, ids, id);
            ids.forEach(async (element: idtype) => {
                await Information.findByIdAndUpdate(element.id, {
                    id: element.id,
                    type: element.type,
                    data: (element.type === "text" ? text : images)
                }).catch(() => {throw(-1)});
            });
        } catch {
            return -1;
        }
    }

    private static checkQuestionValid = (question: IQuestion) => {
        if (!question.answer) {
            return false;
        }
        if (!question.answer) {
            return false;
        }
        for(let i = 0; i < 4; i++) {
            if (!question.answers[i]) {
                return false;
            }
        }
        return true;
    }

    public static async BuildQuiz(questions: IQuestion[], node: string) {
        if(questions.length > 0) {
            const Questions = [] as any[];
            const Answer = [] as any[];
            const Answers = [] as any[][];
            for(let i = 0; i < questions.length; i++) {
                if(!this.checkQuestionValid(questions[i])) {
                    throw(-2);
                }
                Questions.push(questions[i].question);
                Answer.push(questions[i].answer);
                Answers.push(questions[i].answers);
            }
            return await new Quiz({
                nodeID: node,
                questions: Questions,
                answer: Answer,
                answers: Answers
            }).save().catch(() => {throw(-2)});
        }
    }

    public static async BuildCourse(coursename: string, nodes: string[], text: string[], quizzes: IQuestion[][], images: string[], ids: idtype[][]) {
        const Quizzes = [];
        for(let i = 0; i < nodes.length; i++) {
            const temp = await this.BuildPage(text[i], images[i], ids[i], nodes[i]);
            if (temp == -1) {
                return -1;
            }
            try {
                const quiz = await this.BuildQuiz(quizzes[i], nodes[i]);
                if(quiz != null) {
                    Quizzes.push(quiz);
                }
            } catch {
                return -2;
            }
        };
    
        try {
            return await new Course({
                name: coursename,
                nodes: nodes,
                quizzes: Quizzes
            }).save().catch(() => {throw(-3)});
        } catch {
            return -3;
        }
    }
}
