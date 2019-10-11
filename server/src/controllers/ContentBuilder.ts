import {Course, Information} from './../database/index';

interface idtype {
    id: string;
    type: string;
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
                new Information({
                    nodeId: id,
                    type: type,
                    data: data
                }).save();
            }
        } else {
            if(this.checkType(ids, type)) {
                Information.findByIdAndDelete(this.getType(ids, type)).catch(res => console.log(res));
                ids.splice(this.getIndex(ids, type), 1);
            }
        }
    }

    public static BuildPage(text: string, images: string, ids: idtype[], id: string) {
        this.checkInputs((text !== "" && text !== undefined), "text", text, ids, id);
        this.checkInputs((JSON.parse(images).length > 0 && images !== undefined), "images", images, ids, id);
        ids.forEach((element: idtype) => {
            Information.findByIdAndUpdate(element.id, {
                id: element.id,
                type: element.type,
                data: (element.type === "text" ? text : images)
            }).catch(res => console.log(res));
        });
    }

    public static BuildCourse(coursename: string, nodes: string[], text: string[], images: string[], ids: idtype[][]) {
        for(let i = 0; i < nodes.length; i++) {
            this.BuildPage(text[i], images[i], ids[i], nodes[i]);
        }
        return new Course({
            name: coursename,
            nodes: nodes
        }).save().then(res => {
            return res;
        });
    }
}
