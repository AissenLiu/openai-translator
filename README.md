![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

# OpenAI 翻译器

一个使用 OpenAI GPT-3 进行语言翻译的应用程序。这是一个可以安装在您的手机或桌面上的 PWA。

https://translator.lance.moe/

支持 ChatGPT 引擎（GPT 3.5）。

<img width="970" alt="image" src="https://user-images.githubusercontent.com/18505474/222828200-948eef23-bf59-43af-ac27-1484c2bcd406.png">

<img width="1336" alt="image" src="https://user-images.githubusercontent.com/18505474/222924658-012a1089-11f1-474a-99c1-c799aa73d793.png">
## 技术栈

- OpenAI API
- React 18
- Vite 4
- Tailwind CSS 3
- DaisyUI 2
- Axios
- React Router 6
- React Query 4
- PWA
- Cloudflare Pages

我认为这个项目将帮助你学习这些技术。

如果你喜欢这个项目，请不要忘记给这个项目一个星标，谢谢。

## 本地开发

### 1. 安装 pnpm

确保你的计算机上已经安装了 pnpm。如果尚未安装，你可以通过以下链接安装它：

https://pnpm.io/installation

### 2. 下载项目依赖

导航到项目的根目录并运行以下命令以下载项目依赖：

```bash
pnpm install
```

### 3. 启动本地服务器

运行以下命令以启动本地开发服务器：

```bash
pnpm dev
```

### 4. 打开应用程序

Vite 应该会自动打开你的浏览器。

## 构建项目

### Docker 构建

#### 1. 运行 docker 构建

在命令行界面中导航到项目的根目录并运行以下命令以构建 Docker 镜像：

```bash
docker build -t openai-translator-web .
```

这里 `openai-translator-web` 是你想要给镜像命名的名称，末尾的 `.` 表示当前目录。

#### 2. 启动容器

运行以下命令以启动容器并将端口映射到你的本地机器：

```bash
docker run -p 3000:80 openai-translator-web
```

这里 3000 表示你想要映射到容器的 80 端口的本地端口。你可以将其更改为你喜欢的任何其他端口。

#### 3. 打开应用程序

在你的浏览器中，输入以下 URL 以访问应用程序：

http://localhost:3000/

### 本地构建

#### 1. 安装 pnpm

确保你的计算机上已经安装了 pnpm。如果尚未安装，你可以通过以下链接安装它：

https://pnpm.io/installation

#### 2. 下载项目依赖

导航到项目的根目录并运行以下命令以下载项目依赖：

```bash
pnpm install
```

#### 3. 构建

运行以下命令以构建你的项目：

```bash
pnpm build
```

编译后的文件将放置在 `dist` 文件夹中。

#### 4. 部署

现在你可以将 `dist` 文件夹中的文件视为静态网站，并在服务器上部署它。

## 致谢

- 灵感来源于 https://github.com/yetone/bob-plugin-openai-translator

### 服务器docker一键部署

#### 1. 下载zip

下载zip后放置在服务器上

#### 2. 调整setup.sh目录

单独将setup.sh放置到zip同层级目录下

#### 3. 为避免在windows上调整setup.sh后无法在linux上执行，需要执行以下命令（非必须）

```bash
sed -i -e 's/\r$//' setup.sh
```

#### 4. 授权执行

```bash
chmod +x setup.sh
```

#### 5. 执行脚本

```bash
./setup.sh
```
