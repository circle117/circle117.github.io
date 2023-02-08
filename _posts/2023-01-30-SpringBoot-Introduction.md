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

## 底层注解

### @Configuration

```java
@Configuartion
public class ClassA {
  
  @Bean
  public User user1() {
    return new User();
  }
}
```

* @Configuration：配置类（=配置文件）

  * 配置类本身也是组件

* @Bean：给容器中添加组件，默认单实例

  * 返回类型 -> 组件类型
  * 方法名 -> id *或* @Bean("id")
  * 返回值 -> 实例

* proxyBeanMethods（代理bean的方法）参数值默认为true

  * 现象：外部对配置类中的组件方法调用多少次获取的都是注册容器中的单实例对象

  * 原因：参数为true

    ```java
    ConfigurableApplicationContext run = SpringApplication.run(MainApplication.class, args);
    MyConfig config = run.getBean(MyConfig.class);
    
    // user与user2指向同一个对象
    User user = config.user1();
    User user2 = config.user1();
    ```

    获取到的是MyConfig的代理对象，使用代理对象调用方法，检查容器中是否有该方法返回的组件（保持单实例）

    若为false，则指向不同对象

  * 解决组件依赖：一个组件创建时会调用另一个组件

    * 若参数为true，则调用的是容器中的组件
    * 若参数为false，则再创建一个新的调用

  * 若有组件依赖，proxyBeanMethods = true；否则，proxyBeanMethods = false以加速容器启动过程，减少判断

### @Bean, @Component, @Controller, @Service, @Repository

### @ComponentScan

### @Import

给容器中导入指定类型的组件，自动调用其无参构造，默认组件名字为全类名（可以标在任何组件类上）

### @Conditional

条件装配：满足特定的条件，则进行组件注入（可以标在方法上或类上）

@ConditionalOnBean

* 条件定义在前

* ```java
  @ConditionalOnBean(name="user2")
  @Bean
  public User user1() {
      return new User("joy", 18);
  }
  ```

@ConditionalOnMissingBean

@ConditionalOnClass

...

### @ImportResource

导入使用xml配置的bean

```java
@Configuration
@ImportResource("classpath: beans.xml")
public Class MyConfig {}
```

### 配置绑定

读取properties文件中的内容，封装到Java bean中

#### @Component + @ConfigurationProperties

```java
@Component
@ConfigurationProperties(prefix="myuser")
public Class User {}
```

#### @EnableConfigurationProperties + @ConfigurationProperties

1. 开启配置绑定功能
2. 自动注入到容器中

```java
@Configuration
@EnableConfigurationProperties(User.class)
public Class MyConfig {}

@ConfigurationProperties(prefix="myuser")
public Class User {}
```

## 自动配置原理

@SpringBootApplication 主要由以下三个组成

1. @SpringBootConfiguration
2. @EnbaleAutoConfiguration
3. @ComponentScan

### @SpringBootConfiguration

代表当前是一个配置类

### @EnableAutoConfiguration

```java
@AutoConfigurationPackage
@Import({AutoConfigurationImportSelector.class})
public @interface EnableAutoConfiguration {}
```

@AutoConfigurationPackage

* ```java
	@Import({AutoConfigurationPackages.Registrar.class})
	public @interface AutoConfigurationPackage {}
	```

* 利用Registrar给容器中批量<u>导入组件</u>（指定包下的所有组件，MainApplication所在包下）

@Import({AutoConfigurationImportSelector.class})

* 给容器中批量导入组件
* 默认扫描当前系统内所有META-INF/spring.factories位置的文件，文件中规定了Spring Boot已启动就要加载的组件（共127个）
* 按照条件装配规则，按需配置

### @ComponentScan

指定扫描哪些包，是Spring注解

### 修改默认配置

（对于使用@Bean标签标注的方法传入的对象参数，参数会从容器中找对应的参数类型）

自动配置了DispatcherServlet、HttpEncoding

1. SpringBoot先加载所有的自动配置类
2. 每个自动配置类按照条件进行生效，默认绑定配置文件xxxxProperties制定的值
3. 生效的配置类就会给容器装配组件
4. 只要容器中有这些组件，就有对应的功能
5. 若用户自己配置，以用户为先
   - 用户自己@Bean替换底层组件
   - 在application.properties修改对应配置名字的值
