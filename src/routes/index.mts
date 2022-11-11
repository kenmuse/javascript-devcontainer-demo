import express, { Router, RequestHandler } from 'express';
import { DefaultController } from '../controllers/defaultController.mjs';
import { CounterFactory } from '../services/index.mjs';

export async function configureRoutes() {
    const router = express.Router();

    // Services
    const counter = await CounterFactory.create();

    // Controllers
    const defaultController = new DefaultController(counter);
    router.get('/', (request, response) => defaultController.get(request, response));
    router.get('/reset', (request, response) => defaultController.reset(request, response));

    // Catch-all
    router.use((request, response, next) => {
        response.statusCode = 404;
        response.send("The requested path was not found.");
    });

    return router;
}
