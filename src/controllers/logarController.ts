import { Request, Response } from "express";
import { User } from '../models/user';

const bcrypt = require("bcrypt");

export const home = (req: Request, res: Response) => {
    res.render('pages/index');
}

export const login = async (req: Request, res: Response) => {
    let user: string = req.body.name;
    let password: string = req.body.password;

    let verify = await User.findOne({
        where: {name: user}
    });


    if(verify) {
        let passConsult = JSON.stringify(verify['password']).replace(/"/g, '');
        if(await bcrypt.compare(password, passConsult)){
           res.redirect('/naopago');
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
}