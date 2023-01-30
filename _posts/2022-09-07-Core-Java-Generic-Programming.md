---
title: 8 Generic Programming
date: 2022-09-07 14:16:00 +0800
categories: [Java, Core Java]
tags: [java]        # lowercase
toc: true
---

an expressive type system that allow designers to describe in detail how types of variables and methods should vary

## 8.1 Why Generic Programming

writing codes that can be reused for objects of many different types

### Advantages of Type Parameters

Use Object calss

* A cast is necessary
* No error checking (Int, Double can be put together)

Type parameters

* easy to read
* know the type (safer)

### Who wants to be a Generic Programmer?

Can anticipate all the potential future uses of your class

Code that traditionally involved lots of casts from very general type will benefit

Help with troubleshooting

## 8.2 Defining a Simple Generic Class

```java
public class Pair<T, U>
```

A general class can have more than one type variables which is used for

* method return type
* type of fields and local variables

instantiate

```java
Pair<Sting, String>
```

> Like a factory for ordinary classes

## 8.3 Generic Methods

**define** a single method with type parameters

```java
class ArrayAlg
{
  public static <T> T getMiddle(T...a)		// after the modifiers, before the return type
  {

  }
}
```

call

```java
String middle = ArrayAlg.<String>getMiddle("...", ...);
// <String> can be omitted, if can be inferred
```

## 8.4 Bounds for Type Variables

place restrictions on type variables

```java
public static <T extends Comparable> T min(T[] a)...
```

* restrict T to a class that implements the Comparable interface
* \<T extends BondingType\>
  * BondingType can be class or interfaces
* T extends Comparable **&** Serializable
  * at most one of the BondingType can be class and should be put first

## 8.5 Generic Code and the Virtual Machine

### Type Erasure

The type variables are erased and replaced by the first Bonding Type (if no, Object is used)

* different kinds of Pair are **turned** into raw Pair types (erased and replaced)
* **insert** casts to other Bonding Type if necessary

### Translate Generic Expressions

```java
Pair<Employee> buddies = ...;
Employee buddy = buddies.getFirst();
```

2 virtual machine instructions

1. A call to the **raw method** Pair.getFirst()
2. A **cast** of the returned Object to the type Employee

### Translate Generic Methods

```java
public static <T extends Comparable> T min(T[] a);
```

After erasure, only a single method is left

Problem: the type erasure interferes with **polymorphism**

Solution: **bridge method**

```java
public void setSecond(Object second) {setSecond((LocalDate) second);}
```

* No generic in the virtual machine, only ordinary classes and methods

### Call Legacy Code

## 8.6 Restriction and Limitation

1. Type parameters cannot be instantiated with Primitive types, use their wrapper class instead

2. Runtime Type inquiry only works with Raw Type

   ```java
   if (a instanceof Pair<String>)			// a is a pair of any type

   Pair<String> p = (Pair<String>) a;	// warning

   stringPair.getClass()==employeePair.getClass();		// true
   ```

3. You cannot create arrays of parameterized types

   ```java
   var table = new Pair<String>[10];
   ```

4. Varargs Warnings

   ```java
   public static <T> void addAll(Collection<T> coll, T... ts)
   {
     for (T t:ts) coll.add(t);
   }

   Collection<Pair<String>> table = ...;
   Pair<String> pair1 = ...;
   Pair<String> pair2 = ...;
   addAll(table, pair1, pair2);			// ignore
   ```

   use @safeVarargs to ignore

   only for static, final, private method

5. You cannot instantiate type variables

   ```java
   new T(...);					// ERROR
   ```

6. You cannot construct a generic array

   ```java
   new T[2];						// ERROR
   ```

   array carries a type and the type is erased

7. Type variables are not valid in Static contexts

   ```java
   public class Singleton<T>
   {
     private static T singleInstance;			// ERROR
     public static T getSingeInstance()		// ERROR
   }
   ```

8. You cannot throw or catch instances of a generic class

   cannot be used in a catch clase

   ```java
   catch (T e)					// ERROR
   {
   }

   catch (...)
   {
     t. ... 						// is OK
   }
   ```

9. You don't need to provide a handler for all checked exception

   ```java
   // contained in an interface Task
   @SuppressWarnings("unchecked")
   static <T extends Throwable> void throwAs(Throwable t) throws T
   {
     throw (T) t;
   }

   Task.<RunTimeException>throwAs(e);			// turn checked into unchecked
   ```

10. Beware of clashed after Erasure

    There are two equals in Pair\<String>

    ```java
    boolean equals(Object);			// inherited

    boolean equals(String);			// defined
    boolean equals(Object);			// after erasure, should be erased

	```

	```java
	// ERROR
	class Employee implements Comparable<Employee>{...}
	class Manager extends Employee implements Comparable<Manager>{...}

	// Legal
	class Employee implements Comparable {...}
	class Manager extends Employee implements Comparable{...}
	```

## 8.7 Inheritance Rules for Generic Types

1. There is **no relationship** between Pair\<S> and Pair\<T>, even for superclass and subclass

2. You can always convert a parameterized type to a raw type

   ```java
   var managerBuddies = new Pair<Manager>(ceo, cfo);
   Pair rawBuddies = namagerBuddies;
   ```

3. Generic classes can **extend or implement other generic classes**

   e.g. ArrayList\<T> implements List\<T>

   ​       ArrayList\<Integer> can be converted to List\<Integer>

## 8.8 Wildcard Types

### The Wildcard Concept

A type parameter is allowed to **vary**

Pair<**?** extends Employee>

* denotes any generic Pair type whose types parameters is a **subclass** of Employee

* ```java
  public static void printBuddies(Pair<? extends Employee> p)
  ```

* ```java
  void setFirst(? extends Employee);				// ERROR
  // the compiler doesn't know which type

  ? extends Employee getFirst();						// OK
  ```

### Supertype Bounds for Wildcards

? super Manager

* all **supertypes** of Manager

* ```java
  void setFirst(? super Manager);				// Manager or sub
  ? super Manager getFirst();						// ERROR

* super: write to a generic object

  extends: read a generic object

* ```java
  public static <T extends Comparable<T>> Pair<T> minmax(T[] a);
  public static <T extends Comparable<? super T>> Pair<T> minmax(T[] a);

### Unbounded Wildcards

Pair<?>

```java
? getFirst();									// to object
void setFirst(?);							// ERROR
```

```java
public static boolean hasNull(Pair<?> p)
{
  return p.getFirst()==null || p.getSecond()==null;
}
// =
public static <T> boolean hasNulls(Pair<T> p)
```

### Wildcard Capture

We can't write code that uses ? as a type

```java
? t = p.getFirst();							// ERROR
p.setFirst(p.getSecond());
p.setSecond(t);
```

Write a helper method

```java
public static <T> void swapHelper(Pair<T> p)
{
  T t = p.getFirst();
  p.setFirst(p.getSecond());
  p.setSecond(t);
}
```

Call

```java
public static void swap(Pair<?> p) {swapHelper(p);}
```

