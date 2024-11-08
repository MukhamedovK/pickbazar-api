import { config } from "dotenv";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./shop/services/user/user.resolver";
import { ProductResolver } from "./shop/services/product/product.resolver";
import { PaymentResolver } from "./shop/services/payment/payment.resolver";
import { OrderResolver } from "./shop/services/order/order.resolver";
import { CouponResolver } from "./shop/services/coupon/coupon.resolver";
import { CategoryResolver } from "./shop/services/category/category.resolver";
const app = express();
config();
const path = "/shop/graphql";
const PORT = 4000;
const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ProductResolver,
      PaymentResolver,
      OrderResolver,
      CouponResolver,
      CategoryResolver,
    ],
  });
  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    tracing: true,
  });
  apolloServer.applyMiddleware({ app, path });

  app.listen(PORT, () => {
    console.log(`🚀 started http://localhost:${PORT}${path}`);
  });
};

main();
