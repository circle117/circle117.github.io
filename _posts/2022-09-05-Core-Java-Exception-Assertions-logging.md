---
title: 7 Exception, Assertions and Logging
date: 2022-09-05 15:14:00 +0800
categories: [Core Java]
tags: [java]        # lowercase
toc: true
---

# 7 Exception, Assertions and Logging

## 7.1 Dealing with Errors

Transfer control from where the error occurs to **an error handler**

* Return to **a safe state** and execute other commands
* Allow users to **save the work and terminate** the program safely

Problem types

* User input error
* Device errors (hardware)
* Physical limitation (out of available memory)
* Code errors

Methods

1. Traditional reaction to an error in a method: return a special error code (-1, null)
2. Throw an object that encapsulate the error information search for an exception handler to deal with

### Classification

**Throwable**: an exception object belongs to

* **Error**: internal errors and resource exhaustion inside the Java Runtime System (rare)
* **Exception**
  * **RuntimeException**: A programming error is made
    * case, out-of-bound array, null pointer
  * **IOException**: A bad thing (I/O error)
    * read past the end of the file, open a file that doesn't exist

Errors

* unchecked
  * Error
  * RuntimeException
* checked: otherwise

### Declaring Checked Exceptions

A java method can **throw an exception in the header** if it encounters a situation it cannot handle

```java
public FileInputStream(String name) throws FileNotFoundException
```

An exception is thrown when

1. You call a method that throws a checked exception
2. You detect an error and throw a checked exception with the throw statement
3. make a programming error (unchecked exception)
4. An internal error

Two ways

1. **declare** the checked exception in the method that it might throw
   - throw an exception of that class or its subclass
2. **catch** it

> The checked exception that the subclass method declares cannot be more general than those of the subclass

### How to Throw an Exception

EOFException: Signals that an EOF has been reached unexpectedly during input

```java
String readData(Scanner in) throws EOFException
{
  ...;
  while (...)
  {
    if (!in.hasNext())
    {
      if (n<len)
        throw new EOFException;
      	// throw new EOFException(String s) describe the situation
    }
    ...
  }
  return s;
}
```

If one of the existing exception classes works

1. find an appropriate exception class
2. make an object of that class
3. throw it (doesn't return to its caller)

Or create exception class

1. derive your own exception class from Exception or its child class

   ```java
   class FileFormatException extends IOException
   {
     public FileFormatException{}
     public FileFormatException(String gripe)
     {
       super(gripe);
     }
   }
   ```

## 7.2 Catching Exception

### Catch an Exception

set up a try/catch block

```java
try
{
  code;
}
catch (Exception e)
{
  handler;
}
```

If any code inside the try block throws an exception of the class specified in the catch clause

1. **skips the remainder** of the code in the try block
2. **execute the handler** code inside the catch clause

(If the error is not specified, the methods exit immediately)

A rule for when to catch: Catch those exceptions that you know how to handle and propagate those that you do not with the throw statement

* If you override a superclass method that throws no exception, you must catch every exceptions

### Catching Multiple Exceptions

Method 1

```java
try
{
  code;
}
catch (FileNotFoundException e)
{
  emergency action;
}
catch (UnknownHostException e)
{
  emergency action;
}
catch (IOException e)
{
  emergency action;
}
```

Method 2

```java
try
{
  code;
}
catch (FileNotFoundException | UnknownHostException e)
{
  emergency action;
}
catch (IOException e)
{
  emergency action;
}
```

Exception object

* e.getMessage() get the detailed error message
* e.getClass().getName() get the actual type of the exception object

### Rethrowing and Chaining Exception

1. Throw an exception in a catch clause usually when **changing** the exception type

```java
try
{
  access the database;
}
catch (SQLException original)
{
  var e = new ServletException("database error");
  e.initCause(original);				// use getCause() to get
  throw e;
}
```

2. Throw it **without changing**

```java
try
{
  access the database;
}
catch (Exception e)
{
  logger.log(level, message e);				// to log it
  throw e;
}
```

### The finally Clause

can help you clean up the local resources (the foundation of try-with-resources statement)

Method 1

```java
var in = new FileInputStream(...);
try
{
  // 1
  code that might throw exception;			// 1.Throw no exception: 1,2,5,6
  // 2																	// 2.IOException: 1,3,4,5,6
}																				// 3.Other Exception: 1,5
catch (IOException e)
{
  // 3
  show error message;
  // 4
}
finally
{
  // 5
  in.close();
}
// 6
```

Method 2

```java
InputStream in = ...;
// outer: errors are reported
try
{
  // inner: make sure it is closed
  try
  {
    code that might throw exception;
  }
  finally
  {
    in.close();
  }
}
catch (IOException e)
{
  show error message;
}
```

* More clearer and functional : Errors in the finally clause are reported

> Don't put statements that change the control flow (return, throw, break, continue) inside a finally clause

### The try-with-resource Statement

If the resource belongs to a class that implements the AutoCloseable interface

```java
try (Resource res = ...)				// the res.close() is automatically called
{
  work with res;
}

// example, You can specify multiple resources
try (var in = new Scanner(
		new FileInputStream("path"), StandardCharsets.UTF_8);
    var out = new PrintWriter("path", StandardCharsets.UTF_8))
{
  while (in.hasNext())
    out.println(in.next().toUpperCase());
}
```

As of Java 9, you can provide previously declared effectively final variables

If both try clause and close() throw an exception

* The original exception is rethrown
* The exception by close method is suppressed
  * addSuppressed()
  * getSuppressed()

### Analyzing Stack Trace Elements

Stack trace is displayed whenever a Java program terminates with an uncaught exception

## 7.3 Tips for Using Exception

1. Exception handling is not supposed to replace a simple test (isEmpty)
2. Do not micromanage exceptions
3. Make good use of the exception hierarchy (Find an appropriate subclass or your own)
4. Do not squelch exceptions (don't shut it up easily) (catch{})
5. When you detect an error, "tough love" works better than indulgence (throwing an exception is better)
6. Propagating exception is not a sign of shame

## 7.4 Using Assertions

For defensive programming

### The assertion Concept

Lots of checks may make the program run quite a bit slower

Assertion Concept allows you to **put checks during testing** and to have them **automatically removed in the production code**

* assert condition
* assert condition: expression;
  * expression is passed to the constructor of the AssertionError object and turned into a **message string**

### Assertion Enabling and Disabling

By default, assertions are disabled, use **java -enableassertions MyApp** to enable

* do not have to recompile

* specify classes or entire packages

  java -ea:Myclass -ea:com.mycompany.mylib MyApp

* -da for disable

* -esa for system class

### Using Assertion for Parameter Checking

three mechanisms for system failures

* throw an exception
* logging
* use assertions

When to use assertion

* fatal, unrecoverable errors
* only during development and testing
* (local internal program errors)

e.g. @param a the array to be sorted (must not be null)

​		then assert a!=null;

## 7.5 Logging

Advantages

* easy to suppress and easy to turn them back on
* suppressed logs are very cheap
* Log records can be directed to different handlers (console, file, ...)
* Filter records
* be formatted in different ways(plain text, XML)
* use multiple loggers
* Configuration is controlled by a configuration file

### Basic Logging

global logger and call its info method

```java
Logger.getGlobal().info("File->Open menu item selected");
```

All logging is suppressed: **Level.OFF**

```java
Logger.getGlobal().setLevel(Level.OFF);
```

### Advanced Logging

Call the **getLogger()** method to create or retrieve a logger

```java
private static final Logger myLogger = Logger.getLogger("com.mycompany.myapp");
// without static, it will be garbage-collected
```

Logger names are **hierarchical**

* Logger parents and children share certain properties
* level
  * SEVERE
  * WARNING
  * INFO
  * CONFIG
  * FINE
  * FINER
  * FINEST

By default, the top three levels are actually logged. You can set

```java
logger.setLevel(Level.FINE);						// FINE and above are logged
																				// Level.ALL, Level.OFF
logger.warning(message);
logger.fine(message);
logger.log(Level.FINE, message);
```

The default log record shows the name of the class and method.

Use the **logp** method to give the precise location.

**Trace execution flow**

```java
// FINER
void entering(String className, String methodName);
void entering(String className, String methodName, Object param);
void entering(String className, String methodName, Object[] params);
void exiting(String className, String methodName);
void exiting(String className, String methodName, Object result);
```

**Log unexpected exception**

```java
// FINER
void throwing(String className, String methodName, Throwable t);
void log(Level l, String message, Throwable t);

// example
if（...)
{
  var e = new IOException("...");
  logger.throwing("com.mycompany.mylib.Reader", "read", e);
  throw e;
}
try
{
  ...;
}
catch (IOException e)
{
  Logger.getLogger("com.mycompany.myapp").log(Level.WARNING, "Read image", e);
}
```

### Changing the Log Manager Configuration

The default **configuration file** is located at jdk/conf/logging.properties

* change the logging level: the logger name**.level = FINE**
* the handler to send the messages to the console: **java.util.logging.ConsoleHandler.level=FINE**
* The logger manager is initialized during VM setup, before main executes

**Customize logging properties in the program**

1. ```java
   System.setProperty("java.util.logging.config.file", file);
   LogManager.getLogManager().readConfiguration();		// reinitialize	the log manager
   ```

2. ```java
   LogManager.getLogManager().updateConfiguration(mapper);
   // merge the old and new configurations
   ```

### Localization

localize logging messages: use different languages in different countries

need to contain locale-specific information in **resource bundles**

* a set of mappings for various locales

* has a name like "com.mycompany.logmessages"
  * com.mycompany.logmessages_en.properties
* plain text
  * readingFile=Achtung! Datei wird engelesen
  * renamingFile=Datei wird umbenannt

Specify a resource bundle

```java
Logger logger = Logger.getLogger(loggerName, "com.mycompany.logmessages");
```

Specify the resource bundle key

```java
logger.info("readingFile");
```

A message may contain placeholders

```java
logger.log(Level.FINE, "Reading file {0}", name);
```

### Handlers

By default, Loggers send records to a **ConsoleHandler** that prints them to the System.err stream

* has a logging level

* For a record, its level must above both the logger and the handler

* how to set the configuration

  * configuration file

  * install your own

    ```java
    Logger logger=Logger.getLogger("com.le.logging");
    logger.setLevel(Level.FINE);
    logger.setUseParentHandlers(false);
    var handler = new ConsoleHandler();				// text
    handler.setLevel(Level.FINE);
    logger.addHandler(handler);
    ```

    * By default, a logger sends record both to its own handlers and to the handlers of the parent. Our logger is a child of the primordial logger(with name "") that sends the record with level INFO and above to the console. Set false to not see them twice.
    * send log records elsewhere
      * SocketHandler: a specified host and port
      * FileHandler: file (XML)

Setting for Handler

* %g: file rotation .0, .1, .2, ...
* .append: use the same log file

Define your own handler

* extend the Handler or the StreamHandler class

### Filters

By default, records are filtered according to their logging level, have an optional filter to perform additional filtering

Implement the **Filter** interface and define the method

```java
boolean loggable(LogRecord record)
```

* return true for should be included
* call the setFilter method
* one filter at a time

### Formatters

Extend the **Formatter** class and override the method

```java
String format(LogRecord record);
```

substitute parameters and apply localization

```java
String formatMessage(LogRecord record);
```

a head and tail parts that surround the formatted records

```java
String getHead(Handler h);
String getTail(Handler h);
```

install

```java
setFormatter();
```

### A Logging Recipe

1. For simple application, give the logger the same name as your main application package

   get the logger by call

   ```java
   Logger logger = logger.getLogger("com.le.logging");
   ```

   Add static fields to classes with a lot of logging activity

   ```java
   private static final Logger = logger.getLogger("com.le.logging");
   ```

2. ```java
   if (System.getProperty("java.util.logging.config.class")==null
      && System.getProperty("java.util.logging.config.file")==null)
   {
     try
     {
       Logger.getLogger("").setLevel(Level.ALL);
       final int LOG_ROTATION_COUNT = 10;
       var handler = new FileHandler("path", 0, LOG_ROTATION_COUNT);
       Logger.getLogger("").addHandler(handler);
     }
     catch (IOException e)
     {
       logger.log(Level.SEVERE, "Can't create log file handler", e);
     }
   }

3. The level FINE is a good idea
