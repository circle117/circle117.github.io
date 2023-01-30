---
title: 4 Objects and Classes
date: 2022-08-22 16:25:00 +0800
categories: [Java, Core Java]
tags: [java]        # lowercase
toc: true
---

## 4.1 Introduction to Object-Oriented Programming

Object

* functions
* hidden implementation

From

* library
* custom-designed

In OOP: Data structure + Algorithms = Programs

### Classes and Objects

**Encapsulation**: combing data and behavior in one package and hiding the implementation

* data - **state**
* behavior - **methods**

* Programs should interact with object data **only through its methods**

**Inheritance**: classes can be built extending other classes

* a cosmic superclass **Object**

**Identifying class**

1. **Nouns**: identify class
2. **Verbs**: identify methods

### Relationships between classes

**Dependence** ("use-a")

* use or manipulate objects of that class
* minimize the coupling between classes (changes to class B do not introduce bug to class A)

**Aggregation** ("has-a")

* object of class A contains object of class B

**Inheritance** ("is-a")

* relationship between a more specific and a more general class

## 4.2 Using Predefined Class

### Objects and Object Variables

**Constructor**: construct and initialize objects

* have the same name as the class name
* e.g. new date()

```java
Date deadline = new date();
// deadline: object variable
// new date(): return an object variable referring to an object

deadline = null;
```

> All Java objects live on the heap.
>
> If you use a uninitialized pointer, the runtime system will generate a runtime error.
>
> The garbage collector takes care of memory management.
>
> Use the clone() method to get a complete copy of an object

### LocalDate Class

Date class - millisecond

LocalDate class - familiar calendar

```java
// initial
LocalDate.now();
LocalDate.of(1999,12,31);

// Get
getYear();
getMonthValue();
getDayOfMonth();

// Calculate
.plusDays();
```

**Accessor** methods: only access objects without modifying it

**Mutator** methods: modify the objects

## 4.3 Defining Your Own Classes

```java
class ClassName {				// Can only have one public class in one source file(.java file)
  field1;								// Can use multiple source files
  field2;
  constructor1;
  constructor2;
  ...
  method1;
  ...
}
```

### Dissect the Employee Class

**public** any method in any class can call the method

**private** the methods of the class itself can access

* Applying **public** to data fields ruin the encapsulation
* Classes can contain instance fields of other class

**constructor**

* has the same name as the class
* A class can have **more than one**
* can take zero, one or more parameters
* has **no return** value
* is always called with the **new** operator

**CAUTION**: not to introduce local variables with the same name as the instance fields (shadow)

**var** can only be used with local variables inside methods

**null** if you apply a method to a null value, a NullPointerException occurs

* ```java
  name = Objects.requireNonNullElse(n, "unknow");

* ```java
  Objects.requireNonNull(n, "The name cannot be null");
  name = n;
  ```

**implicit and explicit parameters**

* implicit parameters: the object of class (**this** refers to)
* explicit parameters: inside the parenthese

**Class-Based Access Privileges**: A method can access the private data of all objects of its class

**Private methods**: When you want to break up the code for a computation into **separate helper methods**, you can set them private

### Final Instance Fields

```java
private final String name;
```

* Must be initialized when the object is constructed(in the constructor). Afterwards, the field cannot be changed

* For objects, **final** only makes sure that the address is not changed, but the object still can change.

### Benefits of Encapsulation

**get and set** the value of instance fields

1. A private data field
2. A public accessor method
3. A public mutator method

**Benefits**

1. change the implementation **without affecting** any code outside the class
2. Mutator methods can perform **error checking**

**CAUTION** Not to write accessor methods that return references to mutable objects, use **clone()**

```java
return (Date)hireDay.clone();
```

## 4.4 Static Fields and Methods

### Static Fields

If a field is defined as static, there is only one such field per class

* belongs to class (exist before an object is declared)
* be present even if there is no object

### Static Constants

```java
public static final double PI = 3.14159126...;
```

* access through Math.PI
* fine to be public, it cannot be changed into other values

### Static Methods

```java
Math.pow(a, x);						// use the class name to call the method
```

* has no implicit parameter
* can access a static data field

Use static methods in two situation

1. A method doesn't need to access the object state
2. A method only needs to access the static field of the class

### Factory Methods

used to construct objects

```java
LocalDate.of();
LocalDate.now();
```

Why doesn't use a constructor

* You can't give names to a constructor
* When use a constructor, you can't vary the return type(like a subclass instead)

> Every class can have a main method which can be used for unit testing

## 4.5 Method Parameters

**call by value** get the value (Java)

**call by reference** get the location

method parameters in Java

* cannot modify a parameter of a primitive type
* can change the state of an object parameter
* cannot make an object parameter refer to a new object (swap example)

## 4.6 Object Construction

### Overload

occurs if several methods have the **same name** but **different parameters**

A **compile-time error** occurs if the computer cannot match the parameters

### Constructor

1. assign in the class definition

   ```java
   class Employee
   {
     private String name = "";							// execute before constructors
     private int id = assignId();					// use a method
   }
   ```

2. constructors

   default constructor: no-argument constructor (when there is no other constructors)

Parameter Names

```java
// single-letter
public Employee(String n, double s) {}
// prefix "a"
public Employee(String aName, double aSalary) {}
// this
public Employee(String name, double salary) {
  this.name = name;
  this.salary = salary
}
```

Call Another Constructor

```java
public Employee(double s)
{
  this("Employee #"+nextId, s);
  nextId++;
}
```

### Initialization Blocks

execute whenever an object of that class is constructed

```java
{
  ...
}

// static initialization blocks
static
{
  ...
}
```

### Object Destruction

Java does **automatic garbage collection**, doesn't support destructors

For resources other than memory, use a **close()** method

## 4.7 Packages

### Package Name

An internet domain name written in reverse

* com.le.corejava

### Class Importation

1. **fully qualified** name

   ```java
   java.time.LocalDate today = java.time.LocalDate.now();
   ```

2. use the **import** statement

   ```java
   import java.time.*;											// has no negative effect on code size
   LocalDate today = LocalDate.now();
   ```

   * package name conflict

     ```java
     import java.util.*;
     import java.sql.*;
     Date today;					// WRONG, both packages have Date class

     // 1. import Date
     import java.sql.Date;

     // 2. specify the Date while using it
     ```

### Static Import

忽略所在类名/接口名

```java
import static java.lang.System.*;
```

### Addition of a class into a package

put package name at the top of the source file

```java
package com.le.corejava;
```

* If you don't put a name, the source file belongs to the **unnamed package**
* Place the source file into a subdirectory that matched the full package name

> If you don't specify a access modifier, the class can be accessed by all methods in the same package

