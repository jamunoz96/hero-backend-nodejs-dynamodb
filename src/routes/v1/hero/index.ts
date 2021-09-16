import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import { BadRequestError } from '../../../core/ApiError';
import asyncHandler from '../../../utils/asyncHandler';
import HeroRepository from '../../../domain/repository/Hero';
import { Hero } from '../../../domain/model/Hero';
import { exportPdf, exportExcel } from './service';
import validator, { ValidationSource } from '../../../utils/validator';
import scheme from './scheme';

const router = express.Router();

router.post('/',
  validator(scheme.create),
  asyncHandler(async (req, res) => {
    const hero = await HeroRepository.create(req.body as Hero);
    if (!hero) throw new BadRequestError('No se pudo crear el heroe');
    new SuccessResponse('success', hero).send(res);
  }),
);

router.get('/id/:id',
validator(scheme.get, ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
    const hero = await HeroRepository.find(req.params.id);
    if (!hero) throw new BadRequestError('No se pudo encontrar el heroe');
    new SuccessResponse('success', hero).send(res);
  }),
);

router.put('/',
  validator(scheme.update),
  asyncHandler(async (req, res) => {
    const hero = await HeroRepository.update(req.body as Hero);
    if (!hero) throw new BadRequestError('No se pudo actualizar el heroe');
    return new SuccessResponse('success', hero).send(res);
  }),
);

router.delete('/id/:id',
  validator(scheme.delete, ValidationSource.PARAM),
  asyncHandler(async (req, res) => {
    const hero = await HeroRepository.delete(req.params.id);
    if (!hero) throw new BadRequestError('No se pudo eliminar el heroe');
    new SuccessResponse('success', hero).send(res);
  }),
);

router.get('/',
  asyncHandler(async (req, res) => {
    const heroes = await HeroRepository.get();
    if (!heroes) throw new BadRequestError('No se pudo consultar la información');
    return new SuccessResponse('success', heroes).send(res);
  }),
);

router.get('/export-pdf',
  asyncHandler(async (req, res) => {
    const heroes = await HeroRepository.get();
    if (!heroes) throw new BadRequestError('No se pudo exportar la información');
    return exportPdf(heroes, res);
  }),
);

router.get('/export-excel',
  asyncHandler(async (req, res) => {
    const heroes = await HeroRepository.get();
    if (!heroes) throw new BadRequestError('No se pudo exportar la información');
    return exportExcel(heroes, res);
  }),
);

export default router;
