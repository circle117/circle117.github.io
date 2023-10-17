---
title: 4 Objects and Classes
date: 2022-08-22 16:25:00 +0800
categories: [Java, Core Java]
tags: [java]        # lowercase
toc: true
---

## 4.1 Introduction to Object-Oriented Programming

Object = functions + hidden implementation

### Classes and Objects

**Encapsulation**: combing data and behavior in one package and hiding the implementation

* data - **instance fields** - **state**
* behavior - **methods**

* the <u>state</u> of an object can <u>influence</u> its <u>behavior</u>

* Programs should interact with object data <u>only through its methods</u>

**Inheritance**: extend a class

* **Object** class: all classes extend this class

**Identifying class**

1. **Nouns**: identify class
2. **Verbs**: identify methods

### Relationships between classes

**Dependence** ("use-a")

* its methods <u>use or manipulate</u> objects of that class
* minimize the *coupling* between classes (changes to class B do not introduce bug to class A)

**Aggregation** ("has-a")

* object of class A <u>contains</u> object of class B

**Inheritance** ("is-a")

* class A <u>inherits</u> methods from class B but has more capabilities

## 4.2 Using Predefined Class

### Objects and Object Variables

construct them and specify their initial state

* **Constructor**: construct and initialize objects
  * have the same name as the class name
  * combine the constructor with the *new* operator
    * e.g. new Date()


```java
Date deadline;
```

* doesn't actually contain an object

  but <u>refers</u> to an object

* to use it

  * <u>initialize</u> the variable: *deadline = new Date();*
  * refer to an <u>existing</u> object

* the return value of the *new* operator is also a <u>reference</u>

> * All Java objects live on the heap
>
> * The garbage collector takes care of memory management
>
> * Use the clone() method to get a complete copy of an object

### *LocalDate* Class

*Date* class represents a point in time

*LocalDate* class represents  days in the familiar calendar notation

```java
// initial
LocalDate date = LocalDate.now();
date = LocalDate.of(1999,12,31);

// Get
int year = date.getYear();
int month = date.getMonthValue();
int day = date.getDayOfMonth();

// Calculate
LocalDate newDate = date.plusDays(1000);
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

### Dissect the *Employee* Class

**public** any method in any class can call the method

**private** the methods of the class itself can access

* Applying public to data fields <u>ruin</u> the encapsulation
* Classes can contain instance fields of <u>class</u> type

**constructor**

* has the <u>same name</u> as the class
* A class can have <u>more than one</u>
* can take zero, one or more <u>parameters</u>
* has <u>no return</u> value
* is always called with the <u>*new*</u> operator

**CAUTION**: not to introduce local variables with the same name as the instance fields (shadow)

**var**

* can only be used with <u>local</u> variables <u>inside</u> methods

**null**

* if you apply a method to a *null* value, a *NullPointerException* occurs

* method to prevent null value

  1. ```java
     name = Objects.requireNonNullElse(n, "unknow");
     ```

  2. ```java
     Objects.requireNonNull(n, "The name cannot be null");
     name = n;
     ```

**implicit parameter**

* appears <u>before</u> the method name
* e.g. number.raiseSalary(10);

* the keyword *this* refers to the implicit parameter

**explicit parameters**

* <u>inside</u> the parentheses

**field accessors**

* a special case of accessor methods

* get and set the value of an instance field
  1. a private data field
  2. a public field accessor method
  3. a public field mutator method

**Class-Based Access Privileges**: A method can access the private data of all objects of its class

**Private methods**

* useful when you want to <u>break up</u> the code for a computation into separate helper methods

### Final Instance Fields

```java
private final String name;
```

* must be <u>initialized</u> when the object is constructed

  afterwards, the field <u>cannot</u> be changed

* For objects, *final* only makes sure that the <u>address</u> is not changed, but the object still can change.

**CAUTION** Not to write accessor methods that return references to mutable objects, use **clone()**

```java
return (Date)hireDay.clone();
```

## 4.4 Static Fields and Methods

### Static Fields

*static*: there is only one such field *per class*

* belongs to class (exist before an object is declared)
* be present even if there is no object

### Static Constants

```java
public static final double PI = 3.14159126...;
```

* access through *className.fieldName*
* fine to be public, it cannot be changed into other values

### Static Methods

methods that do not operate on objects

```java
Math.pow(a, x);						// use the class name to call the method
```

* has no <u>implicit</u> parameter
* can access a <u>static</u> data field

Use static methods in two situations

1. A method doesn't need to access the object <u>state</u>
2. A method only needs to access the <u>static</u> field of the class

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

Java

* primitive type: cannot modify
* object type: copy the reference
  * can change the state
  * cannot make an object parameter refer to a new object


## 4.6 Object Construction

### Overload

**overload**: several methods have the <u>same name</u> but <u>different parameters</u>

* match the parameter types in the headers of the various methods with the <u>types</u> of the values

### Constructor

assign in the class definition

* ```java
  class Employee
  {
    private String name = "";							// execute before constructors
    private int id = assignId();					// use a method
  }
  ```

constructors

* <u>default</u>: no-argument constructor (when there is no other constructors)

### Parameter Names

```java
public Employee(String name, double salary) {
  this.name = name;
  this.salary = salary
}
```

### Call Another Constructor

use *this*

* ```java
  public Employee(double s)
  {
    this("Employee #"+nextId, s);
    nextId++;
  }
  ```

### Initialization Blocks

executed whenever an object of that class is constructed

* no matter which constructor is used
* runs first, and then the constructor

executing steps

1. If the constructor calls a second constructor, execute the <u>second constructor</u>
2. All data are initialized to their <u>default</u> values
3. All field <u>initializers</u> and initialization <u>blocks</u> are executed in the order in which they occur in the class declaration
4. The body of the <u>constructor</u> is executed

for static field

```java
private static int nextId = 1;

// static initialization blocks
static
{
  ...
}
```

### Object Destruction

Java does **automatic garbage collection**

For resources other than memory, use a **close()** method

## 4.7 Packages

group classes in a collection called a package

### Package Name

An internet domain name written in reverse

* com.le.corejava

### Class Importation

A class can uses all classes from

* its own package
* all public classes from other packages

access the public classes

1. *fully qualified* name

   ```java
   java.time.LocalDate today = java.time.LocalDate.now();
   ```

2. use the *import* statement

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
     var deadline = new java.util.Date();
     ```

### Static Import

you can use the static methods and fields of the System class <u>without the class name prefix</u>

```java
import static java.lang.System.*;
```

### Addition of a Class into a Package

put package name at the <u>top</u> of the source file

```java
package com.le.corejava;
```

* If you don't put a name, the source file belongs to the *unnamed package*
* Place the source file into a subdirectory that matched the full package name

> If you don't specify a access modifier, the class can be accessed by all methods in the same package

### Package Access

public: can be used by <u>any</u> class

private: can be used only by the <u>class</u> that defines them

not specify: can be accessed by all methods in the same <u>package</u>

