---
title: 6 Interfaces, Lambda Expressions and Inner Class
date: 2022-09-02 15:12:00 +0800
categories: [Java, Core Java]
tags: [java]        # lowercase
toc: true
---

## 6.1 Interfaces

### Concept

a set of requirements

> If your class conforms to a particular interface, I'll perform the service

```java
public interface Comparable<T>
{
  int compareTo(T other);						// automatically public
}
```

* Any class that implements the Comparable interface is required to have a compareTo method
* Interfaces never has instance fields

2 steps for making a class implement an interface

* **declare**
* supply definition for all **methods** in the interface

```java
// If you want to use Array.sort to sort array of Employee, implement the Comparable interface
class Employee implements Comparable<Employee>
{
  public int compareTo(Employee other)
  {
    return Double.compare(salary, other.salary);
  }
}
```

Comparable for superclasses and subclasses

* subclass.compareTo(superclass) exist **cast problem**

* Thus, if subclasses have different notions of comparison, you should **outlaw** comparison of objects from different classes

  ```java
  if (getClass()!=otherObject.getClass()) throw new ClassCastException();
  ```

* If they have the same notion, **implement it in the superclass** and declare it as **final**

### Properties of Interface

1. never use new to instantiate

   can declare interface variables referring to an object of a class that implements the interface

   ```java
   Comparable x=new Employee(...);
   ```

2. use **instanceof** to check

   ```java
   if (Employee instanceof Comparable){...}

3. can **extend** interfaces

   can supply **constants** in it (public static final)

   * A class can automatically inherit the constants

4. Classes can implement **multiple** interfaces

   * interface cloneable - clone method

     class Employee implements Comparable, Cloneable

> Why not abstract classes
>
> * A class can only extend a class
> * Avoid complexity and inefficiencies

### Static and Private Methods

allowed

### Default Methods

supply a **default** implementation for interface method

```java
public interface Collection
{
  int size();
  default boolean isEmpty(){return size()==0;}		// don't need to implement it
}
```

Good for interface evolution when a new method is added to the interface

* Adding a nondefault method to an interface is not source-compatible
  * don't compile the class
  * load old one, an AbstractMethodError occurs
* If use a default method
  * can compile
  * use the default

### Resolve Default Methods Conflict

rules in Java

1. Superclass wins. ("class wins" rules)

   ```java
   class Student extends Person implements Named {...}
   // two getName() methods
   // Person wins over Named
   ```

2. Interfaces clash: resolve the conflict by overriding that method

   ```java
   public String getName() {return Person.super.getName();}
   ```

### Interfaces and Callbacks

**callback**: specify the action that should occur whenever a particular event happens

* example: tell the timer what it should do when a second passes

How

1. pass an object
2. call one of the methods on that object

The timer requires the class implements an interface ActionListener from java.awt.event

```java
public interface ActionListener
{
  void actionPerformed(ActionEvent event);			// timer calls it
}
```

### The Comparator Interface

We can't have the String class implement the compareTo method in two ways

Array.sort(array, comparator);

```java
public interface Comparator<T>
{
  int compare(T first, T second);
}
class LengthComparator implements Comparator<String>
{
  public int compare(String first, String second)
  {
    return first.length() - second.length();
  }
}

Arrays.sort(friends, new LengthComparator());
```

### Object Cloning

**shallow copy** (ok for immutable subobjects like string)

**deep copy** clones the subobjects as well

For every class, decide whether

1. Default clone method is good enough
2. The default clone method can be modified by calling clone on the mutable subobject
3. Clone shouldn't be attempted

For 1/2

1. Implement the Cloneable interface
   - tagging interface: has no methods
   - allow the use of instanceof
2. Redefine the clone method with public
   - necessary even if the default is adequate

```java
class Employee implements Cloneable
{
  public Employee clone() throws CloneNotSupportedException				// shallow copy
  {
    return (Employee) super.clone();
  }
  public Employee clone() throws CloneNotSupportedexception				// deep copy
  {
    Employee clones=(Employeee)super.clone();
    cloned.hireDay=(Date)hireDay.clone();
    return cloned;
  }
}
```

Subclass may have fields that require a deep copy

* primitive is ok
* other objects may need to override the clone()

## 6.2 Lambda Expression

define blocks of code with a concise syntax

* actionPerform for timer
* compare for sort

### Syntax

how to produce lambda expression

```java
(String first, String second)							// (parameters)
	-> first.length() - second.length();		// expression

// enclosed in {} with explicit return
(String first, String second)
{
  if (first.length()<second.length())
    return -1;
  else if (first.length()>second.length())
    return 1;
  else return 0;
}

// no parameters
() -> {for (int i=100;i>=0;i00) System.out.println(i);}

//Type can be omitted if parameters can be inferred
Comparator<String> comp = (first, second) -> ...;

//parenthese can be omitted, if a single parameter with inferred type,
ActionListener listener = event -> {...};				// (AutoEvent event)
```

### Functional Interfaces

An object of an interface with a single abstract method is expected

Lambda expression in Java is like a **function**

Java API defines a number of generic functional interfaces in the java.util.function package

1. BiFunction<T,U,R>: T,U - parameters, R - return type

   - you can let its variable refer to the comp for sort
   - but cannot directly use it for Arrays.sort, because you need to keep the purpose for the lambda expression

2. Predicate\<T\>

   ```java
   public interface Predicate<T>
   {
     boolean test(T t);
   }
   ```

   a parameter in ArrayList's removeIf()

   ```java
   list.removeIf(e -> e==null);

3. Supplier\<T\>

   ```java
   public interface Supplier<T>
   {
     T get();
   }

   LocalDate hireDay = Objects.requireNonNullElseGet(day,
   	() -> LocalDay(1970,1,1));						// construct the default when necessary
   ```

### Method References

When the code of a lambda expression only involves a single method, like

```java
event -> System.out.println(event);
```

You can use method reference

```java
System.out::println
```

* direct the compiler to produce an instance of a functional interface

Sort strings regardless of letter case

```java
Arrays.sort(strings, String::compareToIgnoreCase)
```

the :: operator

1. object::instanceMethod

   ```java
   System.out::println;

   x -> System.out.println(x);

2. Class::instanceMethod

   ```java
   String::compareToIgnoreCase;

   (x, y) -> x.compareToIgnorecase(y);

3. Class::staticMethod

   ```java
   Math::pow;

   (x, y) -> Math.pow(x, y);
   ```

4. this/super::instanceMethod is allowed

> If separator is null
>
> separator::equals	immediately throw an error
>
> x->separator.equals(x)      when it is invoked

### Constructor Reference

like method reference, method name is **new**

```java
ArrayList<String> names = ...;
Stream<Person> stream = names.stream().map(Person::new);
List<Person> people = stream.collect(Collectors.toList());
// call the Person(string) constructor for each list element
```

form constructor references with array types (solve the problem of construct generic type array)

```java
// int[]: new 等价于 x -> new int[x]
Person[] people = stream.toArray(Person[]::new);		// get an array of references to Person
```

### Variable scope

access variables from an enclosing method or class in a lambda expression

```java
public static void repeatMessage(String text, int delay)
{
  ActionListener listener = event ->
  {
    System.out.println(text);						// text isn't defined in the lambda expression
    Toolkit.getDefaultToolkit().beep();
  }

  new Timer(delay, listener).start();
}
```

Three ingredients in lambda expression

1. A block of code
2. Parameters
3. Values of free variables (not parameters, not inside)

> Lambda expressions are closures

Lambda expressions can capture the value of a variable in the enclosing scope

* Variable must be **effectively final**
* the same scope as a nested block
* has name conflict and shadowing apply

```java
public class Application
{
  public void init()
  {
    ActionListener listener = event=>
    {
      System.out.println(this.toString());// this refers to Applicaion, belongs to init()
      ...
    }
  }
}
```

### Processing Lambda Expression

write methods that can consume lambda expressions

Why use lambda expression - **deferred execution**

1. Running the code in a separate thread
2. Running the code multiple times
3. Running the code at the right point in an algorithm (the comparison operation in sorting)
4. Running the code when something happens (a button)
5. Running the code only when necessary

Pick a functional interface to accept the lambda (like a media)

1. Runnable

   ```java
   public static void repeart(int n, Runnable action)
   {
     for(int i=0;i<n;i++) action.run();			// execute the body
   }
   ```

2. An int parameter and a void return

   ```java
   public interface IntConsumer
   {
     void accept(int value);
   }

   public static void repeat(int n, IntConsumer, action)
   {
     for (int i=0;i<n;i++) action.accept(i);
   }
   ```

### More about comparators

map a type to a comparable type, comparison is made on the returned key

```java
Arrays.sort(people, Comparator::comparing(Person::getName));

Arrays.sort(people, Comparator::comparing(Person::getFirstName)
           .thenComparing(Person::getLastName));
```

comparing and thenComparing avoid boxing of int, long, double

```java
Arrays.sort(people, Comparator.comparing(Person::getName,
                                       (s,t)->Integer.compare(s.length(), t.length())));

Arrays.sort(people, Comparator.comparingInt(p->p.getName().length()));
```

**nullFirst** and **nullLast** for null

```java
Comparator.comparing(Person::getName, Comparator(nulls.First(naturalOrder())));
Comparator.comparing(Person::getName, Comparator(nulls.First(naturalOrder().reverse())));
```

## 6.3 Inner Class

Defined under another class

Reasons

1. **hidden** from other classes in the same package
2. **access the data** from the scope where they are defined (private data)
3. (useful for structuring your code)

### Use of an Inner Class to Access Object State

The inner class

* doesn't mean every class has an inner class instance field
* access both its own data fields and those of the outer object (get an implicit reference to the outer object)
* no need to provide access that are of interest only to one other class

### Special Syntax Rules for Inner Class

**OuterClass.this** denotes the outer class reference in the inner class

```java
if (talkClock.this.beep) Toolkit.getDefaultToolkit().beep();
```

**outerObject.new InnerClass(parameters** for inner object construction

```java
ActionListener listener = this.new TimePrinter();
```

**OuterClass.InnerClass** refers to an inner class when it occurs outside the scope of the outer class

Useful

* Inner class is a phenomenon of the compile

  Inner class is translated into regular class fields with $ connecting the outer and inner class name

* Can access the private data of the outer class

  * access$ is built by the compiler to access the private data

Security: It is possible to access that data field through other classes added to the package of the outer class but need skills

### Local Inner Class

Only **need the name** of the inner class **once**(in one method) in the outer class

```java
public void start()
{
  class TimePrinter implements ActionListener
  {
    public void actionPerformer(ActionEvent event)
    {
      System.out.println("At the tone, the time is "
                        + Instant.ofEpochMilli(event.getWhen()));
      if (beep) Toolkit.getDefaultToolkit().beep();
    }
  }

  var listener = new TimePrinter();
  var timer = new Timer(interval, listener);
  timer.start();
}
```

Advantages

1. completely **hidden** from the outside world
2. access both **the fields of the class** and the **local** effectively final variables

### Anonymous Inner Class

Make only a single object of the class

```java
public void start(int interval, boolean beep)
{
  var listener = new ActionListener()										// new SuperType (parameters)
    {																										// {
      public void actionPerformer(ActionEvent event)		// 		inner class methods and data
      {
        System.out.println("At the tone, the time is "	// }
                          + Instant.ofEpochMilli(event.getWhen()));
        if (beep) Toolkit.getDefaultToolkit().beep();
      }
    }

  var timer = new Timer(interval, listener);
  timer.start();
}
```

SuperType (anonymous inner class has no constructor)

* interface: no parameters
* class: parameters given to the superclass constructor

Usually used for event listeners and other callbacks

Now better use a lambda expression

```java
public void start(int interval, boolean beep)
{
  var timer = new Timer(interval, event -> {
    System.out.println("At the tone, the time is "
                      + Instant.ofEpochMilli(event.getWhen()));
    if (beep) Toolkit.getDefaultToolkit().beep();
  });
  timer.start();
}
```

Double brace initialization: use an array list once

```java
invite(new ArrayList<Sting>() {{add("Harry"); add("potter");}});
// anonymous inner class + object initialization block
```

Anonymous inner class will fail the getClass() test in the equals() method

A static method has no this, use new Object(){}.getClass().getEnclosingClass() (an anonymous object of an anonymous subclass of object)

### Static Inner Class

don't need the inner class to have a reference to the outer class

Advantages: need a class and solve the potential name clash

```java
class ArrayAlg
{
  public static class Pair			// only inner class can be declared static
  {
    ...
  }
}
```

* can have static fields and methods
* Inner classes that are declared in the interface are automatically static an public
