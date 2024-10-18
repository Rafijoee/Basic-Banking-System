const express = require('express');
const bodyParser = require('body-parser');
const {PrismaClient}  = require('@prisma/client');


const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

