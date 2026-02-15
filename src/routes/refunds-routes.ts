import { Router } from "express";
import { RefundsController } from "../controllers/refunds-controller";
import { verifyUserAuthorization } from "../middlewares/verify-user-authorization";

const refundsRouter = Router();
const refundsController = new RefundsController();

refundsRouter.post('/', verifyUserAuthorization(['employee']), refundsController.create);
refundsRouter.get('/', verifyUserAuthorization(['manager']), refundsController.index);
refundsRouter.get('/:id', verifyUserAuthorization(['manager']), refundsController.show);

export { refundsRouter };