import { Router } from "express";
import { usersRouter } from "./users-routes";
import { sessionsRouter } from "./sessions-routes";
import { refundsRouter } from "./refunds-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { uploadsRoutes } from "./uploads-routes";

const routes = Router();

//rotas publicas
routes.use("/users",usersRouter);  
routes.use("/sessions",sessionsRouter);

//rotas privadas
routes.use(ensureAuthenticated);
routes.use("/refunds", refundsRouter);
routes.use("/uploads", uploadsRoutes);

export {routes}