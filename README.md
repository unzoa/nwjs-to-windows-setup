# 打包windows安装程序

> 应用插件 [innosetup-compiler](https://www.npmjs.com/package/innosetup-compiler)
> 本项目中部分代码针对是 NW.js sdk程序

## 首先

```bash
npm i iconv-lite@^0.4.15 innosetup-compiler@^5.5.9 -D # 此版本为了兼容win32
```

## 使用

**注意：以下内容中${name} ${version} 是package.json中配置信息。**

### 操作步骤

1. 将绿色包放在 /releases/${version}/yourAppFolderName
2. 运行命令

```bash
npm run build yourAppFolderName,yourAppFolderName-2
```

**第2步说明：yourAppFolderName可以是以英文逗号相隔的多个绿色包名称, 输出 /yourAppFolderName-setup/${name}-${version}.exe**

### 目录说明

```
/build
|-/setup_resources [打包资源]
|-/setup.iss [innosetup打包配置文件]
|-/copy-nw-and-p.nw.js [将绿色包内nw.exe和开发包组装成执行exe]
|-/win.js [打包运行程序]
/releases [版本存储空间]
|-/1.0.0 [版本1.0.0，对应着package.json的version]
|-|-/yourAppFolderName [计划打包的绿色包]
|-|-|-/${name}.exe [程序启动文件]
|-|-/yourAppFolderName-setup [安装包输出文件夹]
|-|-|-/${name}-${version}.exe [程序启动文件]
/package.json [相关打包后文件配置]
```

### 文件说明

#### ${name}.exe程序启动文件

[nwjs的sdk程序打包和发布](https://nwjs.readthedocs.io/en/latest/For%20Users/Package%20and%20Distribute/)


```bash
# 用到windows下命令将程序文件与启动文件nw.exe相加
# 在win.js中使用了copy-nw-and-p.nw.js, 执行了以下windows上功能
copy /b nw.exe+package.nw ${name}.exe
```

#### package.json 相关打包后文件配置

```json
{
  "name": "build-win-setup",
  "appName": "应用的中文别名",
  "version": "1.0.0",
  ...
}
```

#### win.js 主执行程序

```js
const platforms = [计划打包的绿色包文件夹名称, 接收npm run build yourAppFolderName,yourAppFolderName-2]

// copy-nw-and-p.nw.js 遍历platforms，打包程序启动文件
```
