Gatsby基于React的静态网站生成器

[step by step](https://www.gatsbyjs.org/tutorial/)

## 入门
### gatsby-cli
```shell
# 全局安装
npm install --global gatsby-cli
# 创建项目（默认项目，当然你也可以选择官网和社区提供的starters加快你的开发）
gatsby new gatsby-site
gatsby new [SITE_DIRECTORY] [URL_OF_STARTER_GITHUB_REPO]
# 开发模式-热更新
gatsby develop
# 编译
gatsby build
# 本地测试编译后战旗
gatsby serve
```

### 发布站点
发布的站点，你可以有丰富的原则，这里主要学习发布到 GitHub Pages。

安装 gh-pages，并添加 npm script。
```shell
npm install gh-pages --save-dev
"scripts": {
  # --prefix-paths 配合 gatsby-config.js pathPrefix 使用
  "deploy": "gatsby build --prefix-paths && gh-pages -d public",
}
```

在 gatsby-config.js 配置文件中添加 pathPrefix，值为你 github 上项目的名称。如果不设置，你网站根目录可以访问，但是链接跳转时会 404，因为没有将项目名称加入路径。

通过 git 托管你的站点，git init & git remote add origin git@github.com:username/project-name.git

运行 npm run deploy 发布项目，正常的话，运行 https://username.github.io/project-name/ 此时可以访问你的站点了，而且你可以在你的 settings > GitHub Pages 中查看你的 Github 站点链接。但我尝试中碰到问题
* npm run deploy 报错 A branch named 'gh-pages' already exists，需要运行 rm -rf node_modules/gh-pages/.cache 清除缓存
* 一开始访问出现404，后面突然好了，可能是 github 今天访问速度不佳的原因

运行 npm run deploy 之后，public 目录下所有的内容会被移到你仓库的 gh-pages 分支

希望直接通过 username.github.io 访问，而不需要添加 reponame，又称发布用户/组织站点，不同于项目，站点必须发布在 master 分支。此时我们不需要设置 prefix。
```shell
"deploy": "gatsby build && gh-pages -d public -b master",
```

如果你希望使用自己的域名与 user.github.io 链接，你需要在根目录层 static 文件下 cname 文件写入你的域名，同时也不需要设置 pathPrefix，因为它会打破你站点的导航。pathPrefix 只有在站点不是在域名的根目录下才需要

## 核心概念

### 组件化开发
为什么选择 React 组件，React 通过模块化，可重用和抽象性，简化了大型站点的开发，React 拥有大型开源组件生态，教程和工具都可以无缝的在 Gatsby 中使用。

### 生命周期
Gatsby 提供了丰富的生命周期API来钩住 Gatsby 的启动过程。

Gatsby 设计原则
* 约定 > 代码
* 提取逻辑和配置到插件是被鼓励的
* 插件很容易被开源和重用

### 插件系统
插件是实现了 Gatsby API 的 Node 包。他们使得你可以轻松解决站点构建常见问题。比如设置Sass，添加markdown支持，处理图像等。

Gatsby 有着丰富的插件系统，你可以在[插件库](https://www.gatsbyjs.org/packages/)中查找浏览官方或社区的插件和文档。

插件的使用
1. 安装
2. gatsby-config.js中配置

### PRPL模式
Gatsby 遵循 REPL 模式，PRPL 是谷歌开发的用来构建站点的架构，针对不可靠的网络连接。
* Push critical resources for the initial URL route using `<link preload>` and http/2.
* Render initial route.
* Pre-cache remaining routes.
* Lazy-load and create remaining routes on demand.

### GraphQL
在 React 组件中有很多方式加载数据，GraphQL 就是其中很流行的一种。

GraphQL 是 Facebook 发明，来帮助工程师拉取需要的数据。它是一门查询语言，和 SQL 非常类似。

为什么选择 GraphQL
* 消除前端数据样板
* 推动前端查询的复杂性
* 对于现代应用复杂/嵌套的数据依赖而言是非常完美的数据查询语言
* 通过删除数据膨胀来改善性能，GraphQL 是为什么 Gatsby 为何如此之快的很大一部分原因，因为它允许延迟加载特定的数据在特定的页面。

在组件中使用 GraphQL，查询的数据结构会自动插入你组件的 data 属性

> 查询只会在 Page 和 Layout 组件中指定，对于其他组件，你需要使用 GraphQL fragments

GraphQL 和 Gatsby 如何一起工作的

大部分人们在服务器使用 GraphQL 去动态响应来自客户端的数据请求。你需要为你的 GraphQL 定义 scheme，GraphQL 解析来源数据库或其他 API 的数据。

Gatsby 在编译期使用 GraphQL，这是独一无二的，这意味着你不需要运行额外的服务（比如数据库或 node 服务）

Gatsby 的 GraphQL scheme 来自哪里？

大多数 GraphQL 的用法都是手动创建 GraphQL scheme。在 Gatsby 中，我们使用插件去拉取不同来源的数据，我们通过使用数据去自动推断出 GraphQL schema。

强大的数据转换

GraphQL 给予了 Gatsby 特别的特性。使得你可以控制数据转换
* 格式化日期
* Markdown，需要安装 gatsby-transformer-remark
* 图像处理 ，需要安装 gatsby-transformer-sharp，你还可以使用 gatsby-image 组件

GraphQL Fragment：由一组可重用的字段查询组成

## 引导
### 添加图片，字体和文件
使用 webpack 我们可以在 JS 模块中引入文件，不同于 CSS imports，引入文件给你一个 string 值，这个值是你可以在代码中引用的最终路径。比如图片的src属性和按标签的href属性。

为了减少服务器请求，对于图片小于10kb的文件，返回一个 data URL 而不是路径。

在 GraphQL 中查询文件，使用 gatsby-source-filesystem 插件

使用 static 文件夹

添加非模块系统的静态资源

提示：我们通常推荐你在 JS 文件中 import 资源，这种机制提供以下几个好处
* script 和 stylesheets 会被压缩和打包，以此来减少额外的网络请求
* 丢失文件会导致编译错误，而不是对于的用户展示404错误
* 文件名称是内容的 hash，你不用担心浏览器缓存他们的老版本

如果你将文件放在 static 文件夹中，他将不会被 webpack 处理，他将不受改变的拷贝到 public 文件夹下，因为在 static 文件下的资源，你需要 `import { withPrefix } from 'gatsby-link'`，而且你需要确保在 gatsby-config.js 中设置 pathPrefix 参数。

何时使用 static 文件夹，static 文件夹作为一个变通方案，在少数情况下很有用
* 你需要具有特定名称的文件
* 你有上千的图片，而且需要动态引用他们
* 你需要在打包代码外引用小段脚本
* 一些库可能和 webpack 不相容

### Building Apps with Gatsby
Hybrid app pages

Client-only routes & user authentication

gatsby-plugin-create-client-paths.

### 缓存
创建一个快速的网站，很重要的部分就是设置适当的 HTTP 缓存。

不同类似的资源被不一样的缓存，那么不一样的文件该如何被缓存呢
* HTML，HTML文件应从不被缓存，当你重新编译你的站点时，你经常会更新HTML文件的内容，浏览器会检查每个请求，是否需要下载更新的HTML文件
```shell
cache-control: public, max-age=0, must-revalidate
```
* static文件，`public/static/`下所有文件应该被永久缓存。这里文档怎么说。路径会直接和文件内容挂钩，如果内容改变，则路径就会改变，当我们请求路径时，会得到同样的文件，因此可以永久缓存。
```shell
cache-control: public,max-age=31536000,immutable
```
* JavaScript，和版本有关，Gatsby v1 基于 webpack1，路径不能和内容挂钩，Gatsby v2 将会基于webpack3，将会使得永久缓存 JS 文件成为可能。

gatsby-plugin-netlify：自动为 Gatsby 站点创建缓存头。

### 创建和修改页面
页面可以使用下面三种方式创建
* 在 gatsby-node.js 中实现 API createPages
* Gatsby 自动将 src/pages 下 React 组件转成页面
* 插件

选择页面布局

默认所有页面会使用`/layouts/index.js`布局。你可能需要为特定页面选择特定布局，你可以在使用 createPage 创建页面时选择布局组件，当使用 onCreatePage API 时，通过添加为page对象添加layout key来实现，所有在 `/layouts/` 文件夹下的组件都是自动可用的。

### 创建数据插件
有两种类型的插件在 Gatsby 的数据系统中工作，source 和 tansformer。

到这里有点理解不了，容我稍后再来。

### 定制 webpack config
在 gatsby-node.js 中 export 一个 modifyWebpackConfig 方法即可。

### 本地HTTPS
```shell
gatsby develop --https
```

### 插件开发
插件通常可以
* 添加额外的数据或内容
* 数据转换
* 添加第三方服务
* 任何你能想到的

插件命名规范
* gatsby-source-*：加载数据插件
* gatsby-transformer-*：数据转换插件
* gatsby-[plugin-name]-*：为其他插件服务的插件
* gatsby-plugin-*：最常用的插件类型，不符合上述三种命名，则采用这种

插件文件
* package.json
* gatsby-browser.js
* gatsby-node.js
* gatsby-ssr.js

本地插件

如果插件只和特定使用情况相关，或你在开发一个插件，将插件代码放置在你项目根目录下plugins文件夹：
```shell
plugins
└── my-own-plugin
    └── package.json
```

NOTE：你需要在gatsby-config.js加入插件，对于本地插件不会自动检测，对于所有的gatsby-*文件不会被babel进行处理，如果你需要使用的JS语法不被当前的node支持，你可以将文件放在src子文件夹下， 将它们编译到plugin文件夹。

### proxy
方式一：gatsby-config.js 中添加proxy属性。

方式二：gatsby-config.js 中通过 developMiddleware 为 express 应用增加中间件

### SEO
SEO：Search Engine Optimization

### CSS-in-JS
优势：解决命名冲突问题

CSS-in-JS的社区实现库
* Glamor
* Styled Components

### Markdown 页面
Gatsby 可以通过 markdown 文件创建页面。
1. 通过 filesystem 去读文件
2. 将 markdown 转成 html 且格式化成数据
3. 为 markdown 页面创建页面组件
4. 使用 createPage API 创建页面

在 gatsby 中使用 gatsby-source-filesystem 读取文件。使用 gatsby-transformer-remark 将 markdown 转 HTML。

在书写 markdown 时，需要在文件的开头，增加如下块，你可以有不同的k-v对，这些块将被 gatsby-transformer-remark 解析为 frontmatter（前面事项），GraphQL API 将会在 React 中提供这些数据。
```
---
path: "/blog/my-first-post"
date: "2017-11-07"
title: "My first blog post"
---
```

使用 Gatsby 的 Node API 创建静态页面

Gatsby 在编译期间运行 createPages API，并且注入参数 boundActionCreators 和 graphql，使用 graphql 查询 markdown 文件数据，再使用 createPage action creator 为每个 markdown 文件使用指定的模版文件去创建页面。

### 增加标签和类别
本质步骤
1. 在 markdown 文件中增加标签
2. 查询所有文章中所有标签
3. 创建标签页模版
4. 修改 gatsby-node.js，使用模版渲染页面
5. 创建一个 tags 首页，用来渲染所有的 tags
6. 在博客文章中内联标签

### 增加搜索
增加搜索需要3个必要的组件
* index
* engine
* UI

### 图片处理
图片优化对任何站点而言都是一个挑战，在不同的设备上具有最佳实践，你需要多种大小和分辨率的图片，gatsby 提供有用的插件帮我们处理图片。

被推荐的方式是使用 GraphQL queries 去得到图片最理想的尺寸和分辨率，然后使用 gatsby-image 组件展示他们。

使用 GraphQL 查询图片，你需要一下插件
* gatsby-source-filesystem：允许 GraphQL 查询文件
* gatsby-plugin-sharp：提供连接 Shape 和 Gatsby 能力
* gatsby-transformer-sharp：允许创建多种大小和分辨率的图片