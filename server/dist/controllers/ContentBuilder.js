"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../database/index");
class ContentController {
    static checkInputs(condition, type, data, ids, id) {
        if (condition) {
            if (!this.checkType(ids, type)) {
                new index_1.Information({
                    nodeId: id,
                    type: type,
                    data: data
                }).save();
            }
        }
        else {
            if (this.checkType(ids, type)) {
                index_1.Information.findByIdAndDelete(this.getType(ids, type)).catch(res => console.log(res));
                ids.splice(this.getIndex(ids, type), 1);
            }
        }
    }
    static BuildPage(text, images, ids, id) {
        this.checkInputs((text !== "" && text !== undefined), "text", text, ids, id);
        this.checkInputs((JSON.parse(images).length > 0 && images !== undefined), "images", images, ids, id);
        ids.forEach((element) => {
            index_1.Information.findByIdAndUpdate(element.id, {
                id: element.id,
                type: element.type,
                data: (element.type === "text" ? text : images)
            }).catch(res => console.log(res));
        });
    }
    static BuildCourse(coursename, nodes, text, images, ids) {
        for (let i = 0; i < nodes.length; i++) {
            this.BuildPage(text[i], images[i], ids[i], nodes[i]);
        }
        return new index_1.Course({
            name: coursename,
            nodes: nodes
        }).save().then(res => {
            return res;
        });
    }
}
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
exports.ContentController = ContentController;
//# sourceMappingURL=ContentBuilder.js.map