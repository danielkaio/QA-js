import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import db from '../models/task'

chai.use(chaiHttp)

const app = require('../app')
const request = chai.request.agent(app)


describe('post', () => {

    context("quando cadastro uma nova tarefa", () => {

        let tasks = { title: ' ir ao cinema', owner: 'dani.ajala@yahoo.com', done: true }

        it("entao deve retornar 200", (done) => {
            request
                .post('/task')
                .send(tasks)
                .end((err, res) => {
                    expect(res).to.has.status(200)
                    expect(res.body.data.title).to.be.an('string')
                    done()
                })



        })


    })


    context("quando nao informo o titulo", () => {
        let tasks = { title: '', owner: 'dani.ajala@yahoo.com', done: true }

        it("deve retornar 400", (done) => {
            request
                .post('/task')
                .send(tasks)
                .end((err, res) => {
                    expect(res).to.has.status(400)
                    expect(res.body.errors.title.message).to.eql('Oops! Title is required.')
                    done()

                })


        })


    })



    context("quando nao informo o dono da tarefa", () => {
        let tasks = { title: 'nova tarefa', owner: '', done: true }

        it("deve retornar 400", (done) => {
            request
                .post('/task')
                .send(tasks)
                .end((err, res) => {
                    expect(res).to.has.status(400)
                    expect(res.body.errors.owner.message).to.eql('Oops! Owner is required.')
                    done()

                })


            })


        })


    
    
    

    
                })
    
    
     
    


