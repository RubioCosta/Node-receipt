import { Request, Response } from "express";
import { Client } from '../models/client';

export const npago = async (req: Request, res: Response) => {
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
    
    res.render('pages/editar');
}

