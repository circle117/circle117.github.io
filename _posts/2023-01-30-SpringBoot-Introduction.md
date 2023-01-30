---
title: 1 Introduction
date: 2023-01-30 16:26:00 +0800
categories: [Java, SpringBoot]
tags: [java, springboot]        # lowercase
toc: true
---

## 优缺点

优点

1. 可以创建独立Spring应用
2. 内嵌web服务器（无需安装Tomcat）
3. 提供starter依赖，简化build配置
4. 自动配置Spring及第三方功能（如MySQL）
5. 提供生产级别的监控、健康检查及外部化配置
6. 无代码生成、无需编写xml

缺点

1. 迭代更新快
2. 封装深，内部原理复杂

## 背景

微服务

* 一种架构风格
* 一个应用拆分为一组小型服务
* 每个服务运行在自己的进程内，可以独立部署和升级
* 服务之间使用轻量级HTTP交互
* 服务围绕业务功能拆分
* 可以由全自动部署机制独立部署
* 去中心化，服务自治（可以使用不同的语言与技术）

分布式

云原生

## Hello World

1. <u>Create the POM</u>

   Settings -> Build, Execution, Deployment -> Build Tools -> Maven

   * User setting file
   * Local repository

   ```xml
   <parent>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-parent</artifactId>
       <version>3.0.2</version>
   </parent>
   ```

2. <u>Adding Classpath Dependencies</u>

   ```xml
   <dependencies>
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-web</artifactId>
       </dependency>
   </dependencies>
   ```

3. <u>编写主程序类</u>

   ```java
   @SpringBootApplication
   public class MainApplication {
       public static void main(String[] args) {
           SpringApplication.run(MainApplication.class, args);
       }
   }

4. <u>编写Controller</u>

   ```java
   @RestController
   public class HelloController {

       @RequestMapping("/hello")
       public String hello() {
           return "Hello, Springboot2";
       }
   }
   ```

5. <u>运行MainApplication</u>

6. <u>简化配置</u>

   在[application.properties](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#appendix.application-properties)中修改配置

7. <u>简化部署create an executable jar</u>

   ```
   <build>
       <plugins>
           <plugin>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-maven-plugin</artifactId>
           </plugin>
       </plugins>
   </build>
   ```

   maven -> Lifecycle -> clean

   maven -> Lifecycle -> package

## 特点

依赖管理

* <u>父项目 (parent) 依赖管理</u>：声明了很多常用的依赖的版本号

  * 只需要添加依赖，不用写版本号

  * 修改版本号：在当前项目中重写，修改properties

    ```xml
    <properties>
      <mysql.version>xxxxx</mysql.version>
    </properties>
    ```

* <u>starter场景启动器</u> spring-boot-starter-*

  * 引入starter会自动引入该场景常规需要的依赖
  * 可自定义starter，一般命名规则为*-spring-boot-starter
  * 所有starter底层依赖为spring-boot-starter

* 无需关注版本号，自动版本仲裁

  * 引入非版本仲裁的jar，需要写版本号

自动配置

* 自动配好Tomcat：引入并配置
* 自动配好SpringMVC：配置好所有web开发常见场景
* 默认的包结构：主程序所在包及其所有子包里面的组件会被默认扫描
  * scanBasePackages参数设置默认包路径
* 配置有默认值：默认配置最终会映射到MultipartProperties，配置文件的值会绑定到每个类上（类在容器中创建）
* 按需加载所有自动配置项
