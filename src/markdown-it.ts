
import * as MarkdownIt from "markdown-it";

const md = new MarkdownIt();

md.use(require("markdown-it-anchor"));
md.use(require("markdown-it-table-of-contents"));
md.use(require("markdown-it-task-lists"));
md.use(require("markdown-it-imsize"));

md.use(function(md, options) {

  console.log("plug in start");

  md.core.ruler.push("image_export", function(state) {
    console.log("image_export");
  });

});

const defaultImageRenderer = md.renderer.rules["image"];
md.renderer.rules["image"] = function(tokens, idx, optioins, env, self) {
  console.log("image renderer");
  const image_token = tokens[idx];
  return defaultImageRenderer(tokens, idx, optioins, env, self);
};

const defaultHeadingRenderer = md.renderer.rules["heading_open"];
md.renderer.rules["heading_open"] = function(tokens, idx, options, env, self) {
  console.log("heading_open");
  const heading_open = tokens[idx];
  if (defaultHeadingRenderer) {
    return defaultHeadingRenderer(tokens, idx, options, env, self);
  } else {
    return self.renderToken(tokens, idx, options);
  }
};

const out = md.render(`

[[toc]]

# 들어가면서

## 첫 번째 이야기: 테이블

| th 1 | th 2 |
|-     | -    |
| td 1 | td 2 |

## 두 번째 이야기: Images

![image.png](image.png)
![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

`);


console.log(`
output
${out}
`);

export const hi = "hi";
