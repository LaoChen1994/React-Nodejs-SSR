const router = require("koa-router")();
const { getResponse } = require("../utils.js");

router.get("/user", async (ctx, next) => {
  await ctx.render("User.html");
});

router.get("/cartList", async ctx => {
  const { userId } = ctx.query;

  const content = { userId, start: 1, pageSize: 5 };

  const data = await getResponse(
    "127.0.0.1",
    8000,
    "/campus/api/getCartList",
    content
  );

  console.log(data);

  ctx.body = data;
});

router.get("/", async (ctx, next) => {
  await ctx.render("Entry.html");
});

module.exports = router;
