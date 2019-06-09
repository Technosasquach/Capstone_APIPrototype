import { Node , INodeModel} from "./../database";

export interface recursiveNames {
    name: string;
    children: recursiveNames[];
}
class DatabaseQuery {

    private static recursiveData(children: recursiveNames[], key: string): any[] {
        if (children.length == 0) {
            return [];
        }
        
        var data = [];
        for(var i = 0; i < children.length; i++){
            data.push({
                key: key + "-" + i,
                name: children[i].name,
                children: this.recursiveData(children[i].children, key + "-" + i)
            })
        }
        return data;
    }

    public static TableCreate(database: recursiveNames[], depth: number): any[] {
        var data = [];
        
        for(var i = 0; i < database.length; i++){
            data.push({
                key: "" + depth + "-" + i,
                name: database[i].name,
                children: this.recursiveData(database[i].children, "" + depth + "-" + i)
            })
        }
        return data;
    }

    public static async QueryAll(): Promise<recursiveNames[]> {
        var data = [] as recursiveNames[];
        var temp = [] as INodeModel[];
        await Node.find({depth: 0}).then(e => {
            temp = e;
        }).catch(e => {
            console.log(e)
        });

        if(temp != undefined) {
            for(var i = 0; i < temp.length; i++) {
                data[i] = {name: temp[i].name, children: await DatabaseQuery.recursiveQuery(0, temp[i])};
            }
        }

        return data;
    }

    private static async recursiveQuery(depth: number, database: INodeModel): Promise<recursiveNames[]> {
        var data = [] as recursiveNames[];
        const newDepth = depth+1;

        if(depth > 5) {
            return data;
        }

        for(var i = 0; i < database.children.length; i++){
            await Node.findById(database.children[i]).then(async function(e) {
                if(e != undefined){
                    data.push({name: e.name, children: await DatabaseQuery.recursiveQuery(newDepth, e)});
                }
            });
        }
        return data;
    }

    private static createSearchTable(regex: recursiveNames[]) {
        var data = [] as any[];
        for(var i = 0; i < regex.length; i++){
            data.push({
                name: regex[i].name,
                key: "" + i,
                children: this.TableCreate(regex[i].children, i),
            });
        }
        return data;
    }

    public static async searchDatabase(search: string) {
        var data = [] as recursiveNames[];
        var temp = [] as INodeModel[];
        await Node.find({name: {$regex: search, $options: 'i'}}).then(e => {
            temp = e;
        }).catch(e => {
            console.log(e)
        });
        
        if(temp != undefined) {
            for(var i = 0; i < temp.length; i++) {
                data.push({name: temp[i].name, children: await DatabaseQuery.recursiveQuery(0, temp[i])});
            }
        }

        return this.createSearchTable(data);
    }

}

export var queryAll = [] as any[];

export var beginQuery = DatabaseQuery.QueryAll().then(e => {
    queryAll = DatabaseQuery.TableCreate(e, 0);
});

export var beginSearch = (e: string) => DatabaseQuery.searchDatabase(e);

