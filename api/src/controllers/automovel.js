const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const automovel = await prisma.automovel.create({
            data: req.body
    });
        res.status(201).json(automovel);
    } catch (error) {
        res.status(500).json({ message: 'Error ao criar o automovel' });
    }
}

const read  = async (req, res) => {
    const automovel = await prisma.automovel.findMany();
return res.json(automovel);
}

const readOne = async (req, res) => {
    try{
        const automovel = await prisma.automovel.findUnique({
            select: {
                placa: true,
                proprietario: true,
                tipo: true,
                modelo: true,
                marca: true,
                cor: true,
                ano: true,

                estadias: { 
                    select: {
                        id: true,
                        entrada: true,
                        saida: true,
                        valorhora: true,
                        valortotal: true,
                    },
                }
            },
            where: {
                placa: req.params.placa
            },
        });
        return res.json(automovel);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { placa } = req.params; 
        const { proprietario, tipo, modelo, marca, cor, ano, telefone } = req.body;

        if (!placa) {
            return res.status(400).json({ message: error.message });
        }

        const automovel = await prisma.automovel.update({
            where: { placa }, 
            data: {
                proprietario,
                tipo,
                modelo,
                marca,
                cor,
                ano,
                telefone
            },
        });

        return res.json(automovel);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await prisma.automovel.delete({
            where: {
                placa: req.params.placa
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    create,
    read,
    readOne,
    update,
    remove
}