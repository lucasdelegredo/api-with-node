import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
app.use(express.json());

app.post('/usuarios', async (req, res) => { //precisa ser async devido ao await

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)

})

app.get('/usuarios', async (req, res) => { //precisa ser async devido ao await
    let users = []
    //console.log(req)
    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
});

app.put('/usuarios/:id', async (req, res) => { //precisa ser async devido ao await // colocamos o :id para pegar o id em forma de variável
    console.log(req)
    await prisma.user.update({
        where: {
            id: req.params.id //parametro
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)

})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({ //propriedade delete
        where: {
            id: req.params.id
        } // nao mandamos dados, apenas mandamos a informações do id
    })

    res.status(200).json({ message: "Usuário deletado com Sucesso!" })
})


app.listen(3000) // porta do computador que vai rodar

/*
    CRIAR A NOSSA API DE Usuários

        -Criar um usuário
        -Listar todos os usuários
        -Editar um usuário
        -Delegar um usuário
*/

