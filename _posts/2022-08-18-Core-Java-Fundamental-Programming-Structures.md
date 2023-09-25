---
title: 3 Fundamental Programming Structures in Java
date: 2022-08-18 11:37:00 +0800
categories: [Java, Core Java]
tags: [java]        # lowercase
toc: true
---

## 3.1 A Simple Java Program

```java
public class FirstSample
{
	public static void main(String[] args)
	{
		System.out.println("Hello world!");
		// object.method(parameters)
	}
}
```

* case sensitive

* *public*: access modifier

* *class*: Everything in a Java program must be inside a class

* *CamelCase*: nouns that start with an uppercase letter

* the file name: className.java

  bytecode file name: FirstSample.class

* *java FirstSample*: launch the program

---

* *main method*: starts execution with the code in the main method

* *semicolon*: every statement ends with a semicolon
* *object.method(parameters)*: use zero, one or more parameters

## 3.2 Comments

1.  / /: the most common form

2. /* and */

3. /**

    *

    */

## 3.3 Data Types

Java is a strongly <u>typed</u> language

primitive types

* int
* short
* long
* byte

---

* float
* double

---

* char

---

* boolean

### Integer

numbers without fractional parts

| Type name | Length | Comments                |
| --------- | ------ | ----------------------- |
| long      | 8      | suffix L/l              |
| int       | 4      | most practical          |
| short     | 2      | specialized application |
| byte      | 1      | specialized application |

* The ranges for the various types in Java programs are <u>fixed</u>
* Hexa-decimal: prefix 0x/0X
* Binary: prefix 0b/0B
* can add underscores to number literals

### Floating-Point

denote numbers with fractional parts

| Type name | Length | Comments   |
| --------- | ------ | ---------- |
| double    | 8      |            |
| float     | 4      | suffix F/f |

* Use float values only when you work with a library that requires them, or need to store a very large number of them
* Values
  * positive infinity
  * negative infinity
  * NaN
    * use *Double.isNaN* to check

### Char

Enclosed in single quotes

* some Unicode characters can be described with one char value

  and other Unicode characters require two char values

* Usually use String

### Unicode

*code point*: a code value that is associated with a character in an encoding scheme

*first code plane*: basic multilingual plane consisting of the classic Unicode characters with code points U+0000 to U+FFFF

*code unit*: 16-bit value

*surrogates area*: unused values of the basic multilingual plane

* U+D800 to U+DBFF for the first code
* U+DC00 to U+DFFF for the second code

<u>char</u> describes a <u>code unit</u> in the UTF-16 encoding.

### Boolean

two values: *false* or *true*

* Cannot be converted into integer values

## 3.4 Variables and Constants

variables: store values

constants: values don't change

### Variables

Declare

* *type name*

Initialize

* <u>explicitly</u> initialize it by means of an assignment statement

### Constants

Use keyword *final*: can assign to the variable <u>once</u>

* customary to name constants in all <u>uppercase</u>

* ```java
  class MyClass {
    public static final double CM_PER_INCH = 2.54;			// other methods in the class can use it
  }
  ```

  *static final*: class constants

  * if declared as *public*, methods of other classes can use it as **className.constantName**

### Enumerated Types

has a <u>finite</u> number of named values

```java
enum Size {SMALL, MEDIUM, LARGE};
Size s = Size.MEDIUM;
```

* Size holds one of the values listed or *null*

## 3.5 Operators

### Arithmetic Operators

* +
* -
* *
* /
  * integer division: both arguments are integers
    * division by 0: exception
  * floating-point division: otherwise
    * division by 0: infinite or NaN
* %: integer remainder

### Mathematical Functions and Constants

*Math* class

* sqrt(8)
* pow(x, a)
* floorMod(x+y, 12)
* trigonometric function
* exponential function
* mathematical function

### Conversions between Numeric Types

may loss precision

* int -> float
* long -> float
* Long -> double

Two different types of values with a binary operator

* double > float > long > int

### Casts

```java
int wx = (int) 9.567;					// discard the fractional part

// round
int x = (int) Math.round(9.567);						// return a long
```

* give the target type in <u>parentheses</u>
* may lost information

Cannot cast between **boolean** and any **numeric** types, use b?1:0

### Combining Assignment with Operators

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

relational operators

* ==
* !=
* \>=
* <=
* \>
* <

logical operators

* &&
* ||
* !
* <u>short circuit fashion</u>

Ternary operator

* condition ? expression 1: expression 2

### Bitwise Operators

operators that work directly with the bits that make up the intergers

* &: and

* |: or

* ^: xor

* ~: not

* \>\>: shift a bit pattern right, extends the sign bit into the top bits

  \>\>\>: fills the top bits with zero

* <<: shift a bit pattern left

### Parentheses and Operator Hierarchy

1. method call: [] . ()
2. ! ~ ++ -- (cast) new
3. \* / %
4. \+ -
5. \<< >> >>>
6. \< <= > >= instanceof
7. == !=
8. &
9. ^
10. |
11. &&
12. ||
13. ?:
14. = += -= *= /= %= &=|= ^= <<= >>= >>>=

## 3.6 Strings

sequences of unicode characters

### Substring

```java
String greeting = "Hello";
String s = greeting.substring(0, 3);
```

* The second parameter is the first position that you don't want to cope
* easy to calculate the length: b-a

### Concatenate

```java
int age=13;
// Use + to concatenate
String rating = "PG" + age;					// convert to string automatically

// Use join to concatenate
String all = String.join(" / ", "S", "M", "L");			//return S / M / L

// Use repeat to concatenate
String repeated = "Java".repeat(3);
```

### Strings Are Immutable

<u>immutable</u>: The *String* class gives no methods that let you change a character in an existing string

* can change the contents of the string variable and make it a different string

Strings are <u>shared</u>

### Test Strings for Equality

```java
s.equal(t);
```

* *equals* method

```java
s.equalIgnoreCase(t);
```

* *equalsIgnoreCase* method

== only determine whether the strings are stored <u>in the same location</u>

### Empty and Null Strings

```java
if (str.length() == 0) {}
if (str.equals("")) {}
```

* *empty string*: "" (a string of length 0)

```java
if (str == null) {}
```

* *null*: there is no object associated with the variable

```java
if (str!== null && str.length()!=0)
```

* need to test that str is not null first

### Code Points and Code Units

char - code unit

code points

* 1 code unit
* 2 code units

get length

* *length()*:  code units

* *codePointCount(0, length())*: code points

```java
s.charAt(i)
```

* get the *i* th code unit

```java
int index = str.offsetByCodePoints(0, i);
int cp = str.codePointAt(index);
```

* get the *i* th code point

```java
int[] codePoints = str.codePoints().toArray();			// get code points array and traverse it
```

* traverse a string based on code point

```java
String str = new String(codePoints, 0, codePoints.length());		// constructor
```

* turn an array of code points to a string

### The String API

### StringBuilder class

inefficient to use string concatenation to build up strings from shorter strings

```java
StringBuilder builder = new StringBuilder();
builder.append(char/string);
String completedString = builder.toString();
```

## 3.7 Input and Output

*System.out.println*: print output

### Reading Input

```java
// The Scanner class is defined in the java.util package
import java.util.*;

Scanner in = new Scanner(System.In);					// 1. construct & attach
String name = in.nextLine();									// include spaces
```

* *new Scanner(System.In)*: construct a *Scanner* that is attached to *System.in*
* *nextLine()*: read a line of input
* *next()*: read a single word
* *nextInt()*: read a integer
* *nextDouble()*: read a floating-point number
* *import java.util.*: the scanner class is defined in the *java.util* package

### Formatting Output

each of the format specifiers that start with a <u>%</u> is <u>replaced</u> with the corresponding argument.

| Conversion Type | Type                       |
| --------------- | -------------------------- |
| d               | Decimal                    |
| f               | Fixed-point floating-point |
| e               | Exponential floating-point |
| s               | String                     |

Specify flags that control the appearance of the formatted output

| Flag | Purpose             |
| ---- | ------------------- |
| +    | Signs               |
| 0    | Add leading zeros   |
| ,    | Add group separator |
| $    | Argument index      |
| <    | Previous arguments  |

use the static *String.format* method to get a formatted string

```java
String message = String.format("Hello, %s.", name);
```

java *Date* class

### File Input and Output

read a file: construct a *Scanner* object:

```java
Scanner in = new Scanner(Path.of("C:\\myDirectory\\myFile.txt"), StandardCharsets.UTF_8);
```

* use the same methods as *Scanner*

write a file: construct a *PrintWriter* object

```java
PrintWriter out = new PrintWriter("myFile.txt", StandardCharset.UTF_8);
```

* use the same methods as *System.out*

## 3.8 Control Flow

### Block Scope

block: a number of Java statement, surrounded by a pair of braces

* may not declare identically named variables in two nested blockes

### Conditional Statements

```java
if (condition) statement1 else statement2;

if (condition1) statement1 else if (condition2) statement2;
```

### Loops

```java
while (condition) statement;

// useful when you want to execute the statment at leat once
do statement while (condition);

for (int i=0; i<10; i++)
  statement;
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

* <u>unlabeled</u> break statement

* <u>labeled</u> break statement

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

* *continue* statement

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

hold sequences of values of the same type and access each value through an integer index

### Declare and Initialize

```java
int[] a = new int[100];
```

* Declare an array variable by specifying the array type, followed by [] and its name

  *type[] name*

* use the new operator to initialize

  *new type[array length]*

  * the array length doesn't need to be a constant
  * once an array is created, its length cannot be changed
  * if you frequently need to expand the length of arrays, you should use *array lists*

```java
int[] smallPrimes = {2,3,5,7,11,13};
String[] test = {
  "a",
  "b",
  "c",
};
```

* a shortcut for creating an array object
* a comma after the last value is allowed

```java
smallPrimes = {17,19};
```

* you can reinitialize

```java
int[] b = new int[0]
```

* create an array of length 0

### Access Array Elements

| Type                      | Default value |
| ------------------------- | ------------- |
| numerical                 | 0             |
| boolean                   | false         |
| object (including String) | null          |

* index begins with 0
* *array.length*

### The "for each" Loop

```java
for (variable : collection) statement;

for(int elemnt: a)
  System.out.println(element);
```

* *collection*: array or an object of a class that implements the *Iterable* interface

### Array Copying

```java
int[] a = b;
```

* You can copy one array variable into another, but both variable refer to the same array

```java
int[] a = Arrays.copyOf(b, b.length);
int[] a = Arrays.copyOf(b, 2*b.length);
```

* use the *copyOf* method in the *Arrays* class
* the second parameter: the length of the new array
  * the additional elements will be filled with the default value

### Command-Line Parameters

```java
public class Test {
	public static void main(String[] args)
}
```

java test -g cruel world

* args[0]: -g
* args[1]: cruel
* args[2]: world

### Array Sorting

```java
Arrays.sort(a);					// Quick Sort
```

* use one of the *sort* methods in the *Arrays* class

```java
Math.random();
```

* return a random floating-point number belongs to [0, 1)

### Multidimensional Arrays

use more than one index to access array elements

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

