import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import { hash, compare } from 'bcrypt';

expressAsyncHandler(async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    res.status(400).json({
      errors: validationErrors.array(),
    });
  } else {
    const hashedPassword = await hash(req.body.password, 15);

    await User.create({
      fullname: req.body.fullname,
      username: req.body.username,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "You have successfully signed up",
    });
  }
}),
];