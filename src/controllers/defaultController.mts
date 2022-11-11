import express, { Request, Response } from "express";
import { Counter } from '../services/index.mjs'

export class DefaultController {

    private static readonly DEFAULT_TITLE = "Views";

    constructor(
        private counter: Counter) {
    }

    async get(request: Request, response: Response) {
        const views = await this.counter.increment();
        const title = process.env.VIEW_TITLE ?? DefaultController.DEFAULT_TITLE;
        response.send(`<h1>${title}</h1>
        Number of times the page was viewed: ${views}`);
    }

    async reset(request: Request, response: Response) {
        await this.counter.reset();
        response.redirect('/');
    }
}
