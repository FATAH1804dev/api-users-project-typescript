import { web } from "./application/web.ts";
import { logger } from "./application/logging.ts";

web.listen(3000, () => {
  logger.info("running the app");
});
