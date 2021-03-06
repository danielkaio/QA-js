import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import db from '../models/task'

chai.use(chaiHttp)

const app = require('../app')
const request = chai.request.agent(app)

describe("get", () => {

    before((done) => {
        db.deleteMany({})
        done()
    })


    before((done) => {
        let tasks = [

            { title: 'Estudar python', owner: 'dani.ajala@yahoo.com', done: false },
            { title: 'Estudar ruby', owner: 'dani.ajala@yahoo.com', done: false },
            { title: 'ler livros', owner: 'dani.ajala@yahoo.com', done: false }

        ]

        db.insertMany(tasks)
        done()
    })


    context("quando tenho tarefas cadastradas", () => {

        it("deve retornar uma lista", (done) => {
            request
                .get('/task')
                .end((err, res) => {
                    expect(res).to.has.status(200)
                    expect(res.body.data).to.be.an('array')
                    done();
                })
        })

        it("deve filtrar por palavra chave", (done) => {

            request
                .get('/task')
                .query({ title: "Estudar" })
                .end((err, res) => {
                    expect(res).to.has.status(200)

                    done();

                })


        })


    })




  

    context("quando id nao existe", () => {

        it("deve retornar 404", (done) => {
            let id = require('mongoose').Types.ObjectId()
            request
                .get('/task/'+ id)
                .end((err, res) => {
                    expect(res).to.has.status(404)
                    expect(res.body).to.eql({})
                  
                    done();
                })
        })

      

        })


    })





























































