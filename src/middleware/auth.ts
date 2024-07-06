import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { verify } from 'jsonwebtoken';

interface DecodedToken {
  id: string; 
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }
    const token = authorizationHeader.replace('Bearer', '');
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as DecodedToken;
      (req as Request & { user: DecodedToken }).user = decoded;
      next();
    } catch (error) {
      console.error('Error verifying token:', error); // Registra o erro para depuração
      res.status(401).json({ message: 'Invalid token' }); // Mensagem de erro genérica por motivos de segurança
    }
  
};

export default auth;