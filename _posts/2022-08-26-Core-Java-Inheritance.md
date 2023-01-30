---
title: 5 Inheritance
date: 2022-08-26 11:58:00 +0800
categories: [Java, Core Java]
tags: [java]        # lowercase
toc: true
---

## 5.1 Superclasses and Subclasses

inheritance: "is-a" relationship

### Define

```java
public class Manager extends Employee {
  // Manager - subclass
  // Employee - superclass
}
```

### Override

supply  a new method to override the superclass method

* Methods in subclasses should use the **public methods** to access the **private fields**

  ```java
  public double getSalary()											// override
  {
    double baseSalary = super.getSalary();			// use super to call superclass methods
    return baseSalary+bonus;										// should keep the return type compatible
  }
  ```

* **super** is only a keyword for the superclass keyword

* inheritance is for **adding** things not taking away

### Subclass Construction

```java
public Manager(...)
{
  super(...);										// must be the first statement in the constructor
  bonus = 0;
}
```

* If no super constructor is called, no-argument constructor is used.
* If there is no no-argument constructor, an error is reported.

```java
var staff = new Employee[2];
staff[0] = new Manager(...);
staff[1] = new Employee(...);
```

* The declared type is Employee, but the actual type can be its subclass
* When it refers to Employee, it calls getSalary methods if Employee; for Manager, it calls its methods

### Polymorphism

An object variable can refer to multiple actual type

You cannot

* call subclass methods using superclass object variables
* assign a superclass reference to a subclass object variables

### Understand Method Calls

How compiler works

1. the declared type and methods name

   - the class
   - its super class

2. overload resolution

   report an error

   - cannot find
   - find more than one

3. static binding: private, static, final, constructor

   otherwise, dynamic binding: depend on the actual type

4. If the actual type has the method, it is called

   Otherwise, superclasses' methods are searched

### Prevent Inheritance: Final Classes and Methods

**final** class: cannot be extended(methods are all final, not the fields)

**final** methods: cannot be overrided

### Casting

```java
Manager boss = (Manager) staff[0];
```

**ClassCastException** when you try to cast down the inheritance chain

* use **instanceof** operator

  * belongs to the class or its subclasses

  ```java
  staff[i] instanceof Manager
  ```

When to cast

* use a method that is unique to subclasses

### Abstract Class

```java
public abstract class Person
{
  public abstract String getDescription();					// act as a placeholder
}
```

* A class with one or more abstract methods must be abstract
* Abstract class
  * can have fields and concrete methods
  * can have no abstract methods
  * cannot be instantiated
* its subclass
  * abstract
  * non-abstract
* can still create object variable, but refers to its non-abstract subclasses

> If you don't use abstract methods, you cannot invoke the method with a superclass object variable.

### Protected Access

A subclass cannot access the private fields of its superclass, use **protected** instead of private

* Accessible in the package and all subclasses

> For a subclass not in the same package, it cannot access other superclass objects

## 5.2 Object: The Cosmic Superclass

Every class in Java extends **Object**

### Viariable of Type Object

A variable of Object can refer to any object

* Only primitives are not object
* All array types are objects

### The equals Method

**equals** methods in Object test if two object references are identical

properties

* reflexive
* symmetric
* transitive
* consistent

two distinct scenarios

* If subclasses can have their own notion of equality, use getClass()

  e.g. bonus in Manager

* If the notion of equality is fixed in the superclass, use the **instanceof** and mark it as **final**

  e.g. Id in Employee

steps for writing a **equals** method

1. Name the explicit parameter **otherObject**

2. Test whether this is **identical** to otherObject

   ```java
   if (this==otherObject) return true;
   ```

3. Test whether otherObject is **null**

   ```java
   if (otherObject==null) return false;
   ```

4. Compare the **classes**

   - normal

     ```java
     if (getClass()!=otherObject.getClass()) return false;
     ```

   - If the same semantic holds for all subclasses

     ```java
     if (!otherObject instanceof ClassName) return false;
     ```

5. **Cast** otherObject

   ```java
   ClassName other == (ClassName)otherObject;

6. Compare the **fields**
   - == (primitives)
   - equals (objects)

> for subclass equals, use super.equals() first

### The hashCode Methods

Return an **integer** (negative is ok) based on instance fields

* The Object(default) class: based on **address**

* In String class: base on their **contents**

If you define the equals method, you need to redefine the hashCode method. Definition of equals() and hashCode() must be compatible.

* >If equals() returns true, hashCode() returns the same value.

```java
public int hashCode()
{
  return Object hash(name, salary, hireDay);				// call hashCode for each argument and combine them
  // for Arrays object, use Arrays.hashCode(type[] a)
}
```

### The toString Methods

java.awt.Point[x=10,y=20]

* the name of the class[field values]

For superclass

* ```java
  return getClass.getName()+"[name="+name+...;

For subclass

* ```java
  return super.toString()+...

Called when concatenated by + with a string

> For Arrays, use Arrays.toString();
>
> For multidimensional arrays, use Arrays.deepToString();

## 5.3 Generic Array List

ArrayList class: automatically adjust its capacity

### Declare

```java
ArrayList<type parameter> list = new ArrayList<>();

// if you call add() and the array is full, the Array List create a bigger array and copies the objects to it
list.add(e);

// If you can guess the size, use
list.ensureCapacity(100);
ArrayList <type parameter> list = new ArrayList<>(100);

// length
list.size();

// If you are sure that the array list is at its permanent size
list.trimToSize();
```

### Access ArrayList Element

```java
// set
list.set(index, x);

// get
Employee e = list.get(index);

// When you are done, get an array
var a = new Employee[list.size()];
list.toArray(a);

// insert
list.add(index, e);

// remove
Employee e = list.remove(index);
```

> For large array, use linked list instead
>
> use For each loop

### Compatibility between Type and Raw ArrayList

```java
public class EmployeeDB
{
  public void update(ArrayList list) {...}
  public ArrayList find(String query) {...}
}

ArrayList<employee> staff=...;
employeeDB.update(staff);				// CORRECT without any cast
ArrayList<employee> result = find(query);			// ERROR cannot assign a raw ArrayList to a typed one
```

> For compatibility, the compiler translate all typed array list into raw array list, so cannot do casting

## 5.4 Object Wrappers and Autoboxing

wrapper class: convert a primitive to an object

* Byte, Short, Integer, Long, Float, Double, Character, Boolean

* **Immutable**

* **final**

```java
// get an ArrayList of primitive
var list = new ArrayList<Integer>();			// less efficient

// autoboxing: automatically translated
list.add(3);

// automatically unboxed
int n = list.get(index);

// work with arithmetic expression
Integer n=3;
n++;

// difference between primitive and its wrapper class: identity
Integer a=1000;
Integer b=1000;
if (a==b)						// may fail, use equals
```

autoboxing

* Integer can be null, throw a **NullPointerException**

* In a conditional expression having Integer and Double, Integer is unboxed and boxed into a Double

```java
Integer.parseInt("456");
```

* static method
* conver string to number

> It is impossible to write a method that increments an integer parameter because of passing by value/ wrapper class is immutable
>
> You can use IntHolder class

## 5.8 Design Hints for Inheritance

1. Place common operations and fields in the superclass
2. Don't use protected fields
   - the set of subclasses is unbounded
   - all classes in the same package have access to the fields
3. Use inheritance to model the "is-a" relationship
4. Don't use inheritance unless all inherited methods make sense
5. Don't change the expected behavior when you override a method
6. Use polymorphism, not type information
7. Don't overuse reflection
