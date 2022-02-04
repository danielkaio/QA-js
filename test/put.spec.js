import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import db from '../models/task'

chai.use(chaiHttp)

const app = require('../app')
const request = chai.request.agent(app)



describe('put',()=>{

    context("quanto atualizo uma tarefa",()=>{

        let task = { 
        _id : require('mongoose').Types.ObjectId(),
        title: 'compras',
        owner:'dani.ajala@yahoo.com',
        done: true 
    }

    before((done)=>{
        db.insertMany(task)
        done()
    })

        it ("entao deve retornar 200",(done)=>{
           
            task.title = "margarina "
            task.done = false
            request.put('/task/' + task._id)
            .send(task)
            .end((err,res)=>{
                expect(res).to.have.status(200)
                expect(res.body).to.eql({})
                done()
            })

      })


        it ("entao deve atualizar as tarefas",(done)=>{

            request.get('/task/' + task._id)
            .end((err,res)=>{
                expect(res).to.have.status(200)
                expect(res.body.data.title).to.eql(task.title)
                done()
                
            })

          
        })

    })
})