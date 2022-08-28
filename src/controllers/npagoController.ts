import { Request, Response } from "express";
import { ClientRequest } from "http";
import { Client } from '../models/client';
import { io } from '../server';
import { Op, where } from 'sequelize';
const extenso = require('extenso');

export const npago = async (req: Request, res: Response) => {
    io.on('connection', (socket: any) => {
        socket.on('pagoN', async (idUser: number) => {

            await Client.update(
                {debt: 1},{
                    where: {
                        id: idUser
                    }
                }
            ); 

            const user = await Client.findAll({
                where: {debt: 0}
            });
            socket.emit('npagoN', user);
        });  
    });
    const user = await Client.findAll({
        where: {debt: 0}
    });
    let quant: number = user.length;
    res.render('pages/npago', {
        user: user,
        length: quant
    });
};

export const pago = async (req: Request, res: Response) => {
    io.on('connection', (socket: any) => {
        socket.on('pago', async (idUser: number) => {
            console.log(idUser);
            await Client.update(
                {debt: 0},{
                    where: {
                        id: idUser
                    }
                }
            ); 

            const user = await Client.findAll({
                where: {debt: 1}
            });

            socket.emit('npago', user);
        });  
    });

    const user = await Client.findAll({
        where: {debt: 1}
    });
    let quant: number = user.length;
    res.render('pages/pago', {
        user: user,
        length: quant
    })
} 


export const cadastrar = async (req: Request, res: Response) => {
    let father: string = req.query.father as string;
    let mother: string = req.query.mother as string;
    let child: string = req.query.child as string;
    let school: string = req.query.school as string;
    let fone: string = req.query.fone as string;
    let value: number = parseFloat(req.query.value as string);
    if(father && mother && child && school && fone && fone){
        const user = Client.build({
            father: father,
            mother: mother,
            child: child,
            school: school,
            fone: fone,
            value: value
        });
        await user.save();
        res.redirect('/cadastrar');
    }
    res.render('pages/cadastrar');
};

export const editar = async (req: Request, res: Response) => {
    const user = await Client.findAll();
    res.render('pages/editar', {
        user: user
    })  
    io.on('connection', (socket:any) => {
        socket.on('enviar-busca', async(busca:string)=> {
            const search:any = await Client.findAll({
                where: {
                    child: {
                        [Op.like]: `%${busca}%`
                    }
                }
            });
            socket.emit('reenviar-busca', search);
        });
        
        socket.on('enviar-id', async (idUser:string) =>{

        const searchUser = await Client.findOne({
            where: {id: idUser}
        });

        socket.emit('enviar-dados', searchUser);
        });

        socket.on('editar-user', async (dados: any) => {

            await Client.update(
                {father: dados.pai, mother: dados.mae, child: dados.filho, school: dados.escola, fone: dados.fone, value: parseInt(dados.valor)},
                {
                    where: {
                        id: parseInt(dados.id)
                    }
                }
            );

            const user = await Client.findAll();

            socket.emit('reenviar-editavel', user);
        });

        socket.on('excluir-user', async (idUser: any) => {

            await Client.destroy({
                where: {id: idUser}
            });

            const user = await Client.findAll();

            socket.emit('reenviar-excluido', user);
        });
    });
    
}

export const dados = async (req: Request, res: Response) => {
    let total = await Client.findAll({
        raw: true,
        attributes: ['value']
    });
    let valorTotal: number = 0;
    for(var i:number = 0; i < total.length; i++){
        valorTotal += total[i].value;
    } 
    

    res.render('pages/dados', {
        valorTotal,
        quant: total.length
    })
}

export const gerar = async(req: Request, res: Response) => {
    let list:any = [];
    let date = new Date();
    let moth: any = date.getMonth();
    let day: any = (date.getDate());
    let year: any = date.getFullYear();
    let getDay = req.query.dia as String;
    let getMoth = req.query.mes as String;
    let getYear = req.query.ano as String;
    let fano = req.query.fano as String;
    let texto1 = '';
    let texto2 = '';
    let resultMoth;

    if(fano == '1'){
        texto1 = ", referente 50% do valor da mensalidade para garantir"; 
        texto2 = "a vaga em ";
    }

    if(getDay){
        day = getDay;
    } 
    if(getMoth){
        moth = getMoth;
    }
    if(getYear){
        year = getYear;
    }
    const dados = await Client.findAll({
        raw: true,
        attributes: {exclude: ['father', 'mother', 'school', 'fone', 'debt'] }
    });

    moth = moth - 1;
    switch (moth){
        case 0 : resultMoth = "Janeiro";
            break;
        case 1 : resultMoth = "Fevereiro";
            break;
        case 2 : resultMoth = "Março";
            break;
        case 3 : resultMoth = "Abril";
            break;
        case 4 : resultMoth = "Maio";
            break;
        case 5 : resultMoth= "Junho";
            break;
        case 6 : resultMoth = "Julho";
            break;
        case 7 : resultMoth = "Agosto";
            break;
        case 8 : resultMoth = "Setembro";
            break;
        case 9 : resultMoth = "Outubto";
            break;
        case 10 : resultMoth = "Novembro";
            break;
        case 11 : resultMoth = "Dezembro";
            break;
        default : resultMoth = "Error !!";
    }

    for(var i = 0; i < dados.length; i++){
        list[i] = {
            name: dados[i].child,
            value: dados[i].value,
            exte: extenso(dados[i].value.toString()),
            moth: resultMoth,
            day: day,
            year: year,
            text1: texto1,
            text2: texto2
        }
    }    

        res.render('pages/recibo', {
            list
    });
}



