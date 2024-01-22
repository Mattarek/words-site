import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import { hash, compare } from "bcryptjs";