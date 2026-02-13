import { Router } from "express";
import { usersRouter } from "./users-routes";
import { sessionsRouter } from "./sessions-routes";
import { refundsRouter } from "./refunds-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routes = Router();

//rotas publicas
routes.use("/users",usersRouter);  
routes.use("/sessions",sessionsRouter);

//rotas privadas
routes.use(ensureAuthenticated);
routes.use("/refunds", refundsRouter);

export {routes}