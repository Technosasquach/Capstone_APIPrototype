"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./../database");
class DatabaseQuery {
    static recursiveData(children, key) {
        if (children.length == 0) {
            return [];
        }
        var data = [];
        for (var i = 0; i < children.length; i++) {
            data.push({
                key: key + "-" + i,
                name: children[i].name,
                children: this.recursiveData(children[i].children, key + "-" + i)
            });
        }
        return data;
    }
    static TableCreate(database, depth) {
        var data = [];
        for (var i = 0; i < database.length; i++) {
            data.push({
                key: "" + depth + "-" + i,
                name: database[i].name,
                children: this.recursiveData(database[i].children, "" + depth + "-" + i)
            });
        }
        return data;
    }
    static QueryAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var data = [];
            var temp = [];
            yield database_1.Node.find({ depth: 0 }).then(e => {
                temp = e;
            }).catch(e => {
                console.log(e);
            });
            if (temp != undefined) {
                for (var i = 0; i < temp.length; i++) {
                    data[i] = { name: temp[i].name, children: yield DatabaseQuery.recursiveQuery(0, temp[i]) };
                }
            }
            return data;
        });
    }
    static recursiveQuery(depth, database) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = [];
            const newDepth = depth + 1;
            if (depth > 5) {
                return data;
            }
            for (var i = 0; i < database.children.length; i++) {
                yield database_1.Node.findById(database.children[i]).then(function (e) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (e != undefined) {
                            data.push({ name: e.name, children: yield DatabaseQuery.recursiveQuery(newDepth, e) });
                        }
                    });
                });
            }
            return data;
        });
    }
    static createSearchTable(regex) {
        var data = [];
        for (var i = 0; i < regex.length; i++) {
            data.push({
                name: regex[i].name,
                key: "" + i,
                children: this.TableCreate(regex[i].children, i),
            });
        }
        return data;
    }
    static searchDatabase(search) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = [];
            var temp = [];
            yield database_1.Node.find({ name: { $regex: search, $options: 'i' } }).then(e => {
                temp = e;
            }).catch(e => {
                console.log(e);
            });
            if (temp != undefined) {
                for (var i = 0; i < temp.length; i++) {
                    data.push({ name: temp[i].name, children: yield DatabaseQuery.recursiveQuery(0, temp[i]) });
                }
            }
            return this.createSearchTable(data);
        });
    }
}
exports.queryAll = [];
exports.beginQuery = DatabaseQuery.QueryAll().then(e => {
    exports.queryAll = DatabaseQuery.TableCreate(e, 0);
});
exports.beginSearch = (e) => DatabaseQuery.searchDatabase(e);
//# sourceMappingURL=query.js.map