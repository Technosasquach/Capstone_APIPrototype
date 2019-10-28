import {Course, Information, Quiz, IQuizModel, IInformationModel} from './../database/index';

/**
 * idtype
 * interface to indentify content type with it's index
 * 
 * @interface idtype
 */
interface idtype {
    id: string;
    type: string;
}

/**
 * Answer
 * enum to indentify answer of a quiz question
 * 
 * @enum Answer
 */
enum Answer {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    NULL = "NULL"
}

/**
 * IQuestion
 * Interface for a quiz question
 * 
 * @interface IQuestion
 */
interface IQuestion {
    question: string;
    answer: Answer;
    answers: string[];
    removeable: boolean;
}


/**
 * ContentController
 *
 * @export
 * @class ContentController
 */
export class ContentController {

    /**
     * checkType()
     * checks type of information
     *
     * @static
     * @param {idtype[]} types
     * @param {string} type
     * @returns {boolean} Is valid or not
     * @memberof ContentController
     */
    private static checkType = (types: idtype[], type: string) => {
        for(let i = 0; i < types.length; i++) {
            if(types[i].type === type) {
                return true;
            }
        }
        return false;
    }

    /**
     * checkType()
     * Returns the id for a document of information
     *
     * @static
     * @param {idtype[]} types
     * @param {string} type
     * @returns {string} id for information document
     * @memberof ContentController
     */
    private static getType = (types: idtype[], type: string) => {
        for(let i = 0; i < types.length; i++) {
            if(types[i].type === type) {
                return types[i].id;
            }
        }
    }
    
    /**
     * getIndex()
     * Returns the index for a matched type
     *
     * @static
     * @param {idtype[]} types
     * @param {string} type
     * @returns {string} index for a information that matches type
     * @memberof ContentController
     */
    private static getIndex = (types: idtype[], type: string) => {
        for(let i = 0; i < types.length; i++) {
            if(types[i].type === type) {
                return i;
            }
        }
    }

    /**
     * checkInputs()
     * Checks pre-existing information documents for a node and updates/deletes if they match the condition set
     *
     * @static
     * @param {boolean} condition
     * @param {string} type
     * @param {string} data
     * @param {idtype[]} ids
     * @param {string} id
     * @memberof ContentController
     */
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

    /**
     * BuildPage()
     * Builds the information documents for a node, will update previous information documents if they exist instead.
     *
     * @static
     * @param {string} text
     * @param {string} images
     * @param {idtype[]} ids
     * @param {string} id
     * @memberof ContentController
     */
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

    /**
     * checkQuestionValid()
     * Checks that a question has valid inputs for a quiz
     *
     * @static
     * @param {IQuestion} question
     * @memberof ContentController
     */
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

    /**
     * BuildQuiz()
     * Builds a quiz for a specfic node
     *
     * @static
     * @param {IQuestion[]} questions
     * @param {string} node
     * @memberof ContentController
     */
    public static async BuildQuiz(questions: IQuestion[], node: string) {
        if(questions.length > 0) {
            const Questions = [] as any[];
            const Answer = [] as any[];
            const Answers = [] as any[][];
            for(let i = 0; i < questions.length; i++) {
                if(!this.checkQuestionValid(questions[i])) {
                    console.log("Invalid Questions")
                    throw(-2);
                }
                Questions.push(questions[i].question);
                Answer.push(questions[i].answer);
                Answers.push(questions[i].answers);
            }
            console.log(node);
            return await new Quiz({
                nodeID: node,
                questions: Questions,
                answer: Answer,
                answers: Answers
            }).save().catch((err) => {
                console.log(err);
                throw(-2);
            });
        }
    }

    /**
     * BuildCourse()
     * Builds a course from the course builder section of the application
     *
     * @static
     * @param {string} coursename
     * @param {string[]} nodes
     * @param {string[]} text
     * @param {IQuestion[][]} quizzes
     * @param {string[]} images
     * @param {idtype[][]} ids
     * @memberof ContentController
     */
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
