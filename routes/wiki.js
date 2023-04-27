const express = require("express");
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");
const { wikiPage } = require("../views");
const { main } = require("../views");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  // Get the title and content from req.body
  const { title, content } = req.body;

  try {
    const page = await Page.create({
      title: title,
      content: content,
    });

    // Redirect to the created page
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    res.send(wikiPage(page));
  } catch (error) {
    next(error);
  }
});
