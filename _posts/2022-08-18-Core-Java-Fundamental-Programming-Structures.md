---
title: 3 Fundamental Programming Structures in Java
date: 2022-08-18 11:37:00 +0800
categories: [Java, Core Java]
tags: [java]        # lowercase
toc: true
---

## 3.1 A Simple Java Program

```java
/* public: access modifier
   class: every Java must be inside a class
   case sensitive */
public class FirstSample
{
	public static void main(String[] args)
	{
		System.out.println("Hello world!");
		// object.method(parameters)
	}
}
```

Steps

1. Write the code in **FirstSample.java** (the same as the public class name)
2. Get the bytecode file **FirstSample.class** from compiler
3. Launch the program using **java FirstSample**
4. Java virtual machine execute the code in **main** method

## 3.3 Data Types

> Java is a strongly typed language

### Integer

> Without fractional parts

| Type name | Length | Comments                |
| --------- | ------ | ----------------------- |
| long      | 8      | suffix L/l              |
| int       | 4      | most practical          |
| short     | 2      | specialized application |
| byte      | 1      | specialized application |

* Hexa-decimal: prefix 0x/0X
* Binary: prefix 0b/0B

### Floating-Point

| Type name | Length | Comments   |
| --------- | ------ | ---------- |
| double    | 8      |            |
| float     | 4      | suffix F/f |

* Not suitable for financial calculation (no precise binary presentation)
* Values
  * positive infinity
  * negative infinity
  * NaN

### Char

> Enclosed in single quotes

* Java use unicode characters
* Usually use String

### Boolean

> False or true

* Cannot be converted into integer values

## 3.4 Variables and Constants

### Declare

```java
int i;
int i, j;
```

### Initialize

```Java
int i;
i = 30;

int i=30;

var i=30;					// can be inferred in Java 10
```

### Constants

```java
final double CM_PER_INCH=2.54;
```

* Use keyword **final**

* Assign to the variable once

* Named in all uppercase

* class constants

  * ```java
    class myClass {
      public static final double CM_PER_INCH = 2.54;
    }
    ```

  * Methods of other classes can use it as **className.constantName**

### Enumerated Types

> A finite number of named values

```java
enum Size {SMALL, MEDIUM, LARGE};
Size s = Size.MEDIUM;
```

* Size holds one of the values listed or **null**

## 3.5 Operators

### Arithmetic Operators

* +
* -
* *
* /
  * Integer division: both arguments are integers (exception)
  * Floating-point division: otherwise (NaN)

### Mathematical Functions and Constants

Methods

* sqrt(8)
* pow(x, a)
* floorMod(position+adjustment, 12)
* PI
* E

Classes

* **Math** fastest performance
* **StrictMath** predictable results

Return wrong results when a computation overflows

### Conversions between Numeric Types

Loss precision

* int -> float
* long -> float
* Long -> double

Two different types of values with a binary operator

* double > float > long > int

### Casts

```java
int wx = (int) 9.567;					// discard the fractional part

// round
Math.round(9.567);						// return a long
```

Cannot cast between **boolean** and any **numeric** types, use b?1:0

### Combine Assignment with Operators

shortcut for binary operators

```java
x += 4;
```

### Increment and Decrement Operators

```java
n++;													// postfix form
++n;													// prefix form
```

### Relational and Boolean Operators

**==**, **!=**, **>=**, **<=**, **>**, **<**

Short circuit fashion: **&&**, **||**, **!**

Ternary operator: **condition ? expression 1: expression 2**

## 3.6 Strings

> Sequences of unicode characters

### Substring

```java
String greeting = "Hello";
String s = greeting.substring(0, 3);				// The second parameter is the first position that you don't want to cope
```

### Concatenate

```java
int age=13;
// Use + to concatenate
String rating = "PG"+age;					// convert to string automatically

// Use join to concatenate
String all = String.join(" / ", "S", "M", "L");			//return S / M / L
```

### String Are Immutable

```java
String str = Hello;
str[2] = 'a';						// WRONG
```

modify the string

* **Concatenate** the substring with characters you want to replace
* (Behave like pointers)

### Test Strings for Equality

```java
s.equal(t);
s.equalIgnoreCase(t);
```

== only determine whether the strings are stored in the same location

### Empty and Null Strings

Empty: **""** is a string of length 0

Null: **null** indicates that there is no object associated with the variable

### Code Points and Code Units

> A code point may include 1/2 code unit(s).

length() - code units

codePointCount(0, length()) - code points

```java
// How to traverse a string
int[] codePoints = str.codePoints().toArray();			// get code points array
String str = new String(codePoints, 0, codePoints.length());		// constructor
```

### The String API

```java
int compareTo(String other);
// before negative, equal 0, after, positive

IntStream codePoints();
new String(int[], int offset, int count());

boolean isEmpty();
boolean isBlank();

boolean equals(Object other);
boolean equalsIgnoreCase(String other);

boolean startsWith(String prefix);
boolean endsWith(String suffix);

int indexOf(String str);
int indexOf(String str, int fromIndex);
int indexOf(int cp);
int indexOf(int cp, int fromIndex);
int lastIndexOf...;

String replace(charSequence oldString, charSequence newString);

String substring(int beginIndex);
String substring(int beginIndex, int endIndex);

String toLowerCase();
String toUpperCase();

String join();
String repeat(int count);
```

### StringBuilder class

```java
StringBuilder builder = new StringBuilder();
builder.append(char/string);
String completedString = builder.toString();

void setCharAt(int i, char c);
StringBuilder insert(int offset, String str);
StringBuilder insert(int offset, char c);
StringBuilder delete(int startIndex, int endIndex);
```

## 3.7 Input and Output

### Reading Input

```java
// The Scanner class is defined in the java.util package
import java.util.*;

Scanner in = new Scanner(System.In);					// construct & attach
String name = in.nextLine();									// include spaces
String firstName = in.next();									// a single word
int age = in.nextInt();
int age = in.nextDouble();

// Other API
boolean hasNext();
boolean hasNextInt();
boolean hasNextDouble();
```

### Formatting Output

```java
System.out.println("Hwllo, %s. Next year you'll be %d.", name, age);
```

> Each of the format specifiers that start with a **%** is **replaced** with the corresponding argument.

| Conversion Type | Type                       |
| --------------- | -------------------------- |
| d               | Decimal                    |
| f               | Fixed-point floating-point |
| e               | Exponential floating-point |
| s               | String                     |

> Specify **flags** that control the appearance of the formatted output

| Flag | Purpose             |
| ---- | ------------------- |
| +    | Signs               |
| 0    | Add leading zeros   |
| ,    | Add group separator |
| $    | Argument index      |
| <    | Previous arguments  |

Use the static **String.format** method to get a formatted string

```java
// Date class
System.out.println("tc", new Date());
```

### File Input and Output

```java
// read
Scanner in = new Scanner(Path.of("C:\\myDirectory\\myFile.txt"), StandardCharsets.UTF_8);

//write
PrintWriter out = new PrintWriter("myFile.txt", StandardCharset.UTF_8);
```

## 3.8 Control Flow

### Block Scope

Blocks define the scope of the variables

### Conditional Statements

```java
if (condition) statement1 else statement2;

if (condition) statement1 else if statement2;
```

### Loops

```java
while (condition) statement;

do statement while (condition);
```

### Multiple Selections - The Switch Statement

```java
switch (choice)
{
  case 1:					// can be
    ...						// 	* a constant expression of type char, byte, short or int
    break;				//  * an enumerated constant (do not need name)
  ...							//  * a string
  default:
  	...
    break;
}
```

### Statement That Break Control Flow

* **unlabeled** break statement

* **labeled** break statement

  ```java
  read_data:						// followed by a colon, must precede the outermost loop out of
  while(...)						// which you want to break
  {
    ...;
    for (...)
    {
      if(...)
        break read_data;
    }
  }
  ```

* **continue** statement

## 3.9 Big Numbers

Use classes in the java.math package: **BigInteger** and **BigDecimal** when the precision of the basic integer and floating-point type is not sufficient

1. turn an ordinary number into a big number

   ```java
   BigInteger a = BigInteger.valueOf(10);
   ```

2. longer number

   ```java
   BigInteger reallyBig = new BigInteger("...");
   ```

Use methods such as add and multiply

* ```java
  // add
  BigInteger c = a.add(b);

  // multiply
  BigInteger d = c.multiply(b.add(BigInteger.valueOf(2)));
  ```

(Java has no operator overloading)

## 3.10 Array

> Arrays hold sequences of values of the same type
>
> Access each value through an integer index

Declare and Initialize

```java
int[] a = new int[100];
int[] smallPrimes = {2,3,5,7,11,13};				// shortcut, a comma is allowed
smallPrimes = {17,19}												// reinitialize
int[] b = new int[0]												// array of length 0
```

* use **ArrayList** class to change its length

### Access Array Elements

| Type      | Default value |
| --------- | ------------- |
| numerical | 0             |
| boolean   | false         |
| object    | null          |

length: array.length

### The "for each" Loop

```java
for (variable : collection) statement					// collection: iterable
```

### Array Copying

```java
int[] a = b;								// both variable refer to the same array
														// like a pointer in C++
int[] a = Arrays.copyOf(b, b.length);
int[] a = Arrays.copyOf(b, 2*b.length);			// used to increase the length of array
																						// filled with default values
```

### Command-Line Parameters

```java
public static void main(String[] args)
```

java test -g cruel world

* args[0]: -g
* args[1]: cruel
* args[2]: world

### Array Sorting

```java
Arrays.sort(a);					// Quick Sort
Math.random();					// [0, 1)
int r = (int)(Math.random()*n);
```

### Multidimensional Arrays

```java
double[][] balances = new double[100][100];

// balances[i] refers to an array and can be swapped
double[] temp = balances[i];
balances[i] = balances[i+1];
balances[i+1] = temp;

// build arrays of different length
int[][] odds = new int[10][];
for (int n=0;n<100;n++)
  odds[n] = new int[n+1];
```

