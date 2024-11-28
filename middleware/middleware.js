import cors from 'cors';
import express from 'express';

const configureMiddleware = (app) => {
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
};

export default configureMiddleware;