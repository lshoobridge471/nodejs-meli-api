import { Request, Response } from 'express';

const Route404 = async (req: Request, res: Response): Promise<void> => {
    res.status(404);
    res.send({ message: 'URL not found!' });
};

export default Route404;