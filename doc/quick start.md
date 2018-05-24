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
  "deploy": "gatsby build --prefix-paths && gh-pages -d public",
}
```

在 gatsby-config.js 配置文件中添加 pathPrefix，值为你 github 上项目的名称。如果不设置，你网站根目录可以访问，但是链接跳转时会 404，因为没有将项目名称加入路径。

通过 git 托管你的站点，git init & git remote add origin git@github.com:username/project-name.git

运行 npm run deploy 发布项目，正常的话，运行 https://username.github.io/project-name/ 此时可以访问你的站点了，而且你可以在你的 settings > GitHub Pages 中查看你的 Github 站点链接。但我尝试中碰到问题
* npm run deploy 报错 A branch named 'gh-pages' already exists，需要运行 rm -rf node_modules/gh-pages/.cache 清除缓存
* 一开始访问出现404，后面突然好了，可能是 github 今天访问速度不佳的原因

发布用户/组织站点，不同于项目，站点必须发布在 master 分支。此时我们不需要设置 prefix。

如果你希望使用自己的域名与 user.github.io 链接，你需要在根目录层 static 文件下 cname 文件写入你的域名