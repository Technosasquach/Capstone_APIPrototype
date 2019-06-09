import { expect } from 'chai';
//import * as tester from './../controllers/query';
import { Node, INodeModel} from "./../database";
import * as mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/synlern");
mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});

//Test Synengcos supplied data with mongodb
describe('Test database', function() {
    this.timeout(5000);
    it('Check data is returned from database', (done) => {
        Node.find({depth: 0}).then((e: INodeModel[]) => {
            expect(e[0].name).to.equal('OEPISRV');    
            done();
        });
    });

    it('Check Field search', (done) => {
        Node.find({name: {$regex: "field", $options: 'i'}}).then((e: INodeModel[]) => {
            expect(e.length).to.equal(2);   
            expect(e[0].name).to.equal("Field1");    
            expect(e[1].name).to.equal("Field2");   
            done();
        });
    });

    it('Check empty search', (done) => {
        Node.countDocuments({}).then(count => {          
            Node.find({name: {$regex: "", $options: 'i'}}).then((e: INodeModel[]) => {
                expect(e.length).to.equal(count);   
                done();
            });
        })

    });
  });

import * as query from "./../controllers/query";

//Test controller functionallity
describe('Test controller functions', function() {
    this.timeout(10000);
    it('Check Complete Query', (done) => {
        query.beginQuery.then(unused => {
            expect(query.queryAll[0]['name']).to.equal('OEPISRV');
            done();
        });
    });

    it('Check Field search', (done) => {
        query.beginSearch("field").then(search => {
            expect(search.length).to.equal(2);
            expect(search[0]['name']).to.equal('Field1');
            expect(search[1]['name']).to.equal('Field2');
            done();
        });
    });

    it('Check empty search', (done) => {
        Node.countDocuments({}).then(count => {          
            query.beginSearch("").then(search => {
                expect(search.length).to.equal(count);
                done();
            });
        });
    });

    it('Check extreme search', (done) => {
        query.beginSearch("\n\n\n\n").then(search => {
            expect(search.length).to.equal(0);
            done();
        });
    });
  });