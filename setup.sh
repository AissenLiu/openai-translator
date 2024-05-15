#!/bin/bash

# 检查openai-translator-main.zip文件是否存在
if [ ! -f openai-translator-main.zip ]; then
    echo "文件openai-translator-main.zip不存在"
    exit 1
fi

# 停止并删除名为openai-translator-web的容器（如果存在）
docker rm -f openai-translator-web

# 删除名称为openai-translator-web的镜像
docker rmi openai-translator-web

# 删除名为openai-translator-main的目录（如果存在）
if [ -d "openai-translator-main" ]; then
    rm -rf openai-translator-main
fi

# 检查openai-translator-main.zip文件是否存在
if [ -f openai-translator-main.zip ]; then
    # 解压文件
    unzip openai-translator-main.zip

    # 删除zip文件
    rm openai-translator-main.zip
else
    echo "文件openai-translator-main.zip不存在"
    exit 1
fi

# 进入解压后的目录
cd openai-translator-main || exit

# 构建Docker镜像
docker build -t openai-translator-web .

# 运行Docker容器
docker run -d -p 3000:8888 --name openai-translator-web openai-translator-web