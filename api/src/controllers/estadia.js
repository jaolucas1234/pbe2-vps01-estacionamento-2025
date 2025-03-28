const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const estadia = await prisma.estadia.create({
            data: req.body  
    });
        res.status(201).json(estadia);
    } catch (error) {
        res.status(500).json({ message: 'Error ao criar o estadia' });
    }
}

const read  = async (req, res) => {
    const estadia = await prisma.estadia.findMany();
return res.json(estadia);
}

const readOne = async (req, res) => {
    try {
        const id = parseInt(req.params.id); 

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido." });
        }

        const estadia = await prisma.estadia.findUnique({
            select: {
                id: true,
                placa: true,
                entrada: true,
                saida: true,
                valorhora: true,
                valortotal: true,
            },
            where: {
                id, 
            },
        });

        if (!estadia) {
            return res.status(404).json({ message: "Estadia não encontrada." });
        }

        return res.json(estadia);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const update = async (req, res) => {
    try {
        const { entrada, saida, valorhora } = req.body;
        
        if (!entrada || !saida || !valorhora) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
        
        const horas = Math.ceil((new Date(saida) - new Date(entrada)) / (1000 * 60 * 60));
        const valortotal = horas * valorhora;

        const estadia = await prisma.estadia.update({
            where: { id: parseInt(req.params.id) },
            data: {
                entrada: new Date(entrada),
                saida: new Date(saida),
                valorhora,
                valortotal
            },
        });

        return res.json(estadia);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido." });
        }

        await prisma.estadia.delete({
            where: { id }
        });

        return res.json({  });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    create,
    read,
    readOne,
    update,
    remove
}