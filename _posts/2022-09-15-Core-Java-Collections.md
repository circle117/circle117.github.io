---
title: 9 Collections
date: 2022-09-15 13:42:00 +0800
categories: [Core Java]
tags: [java]        # lowercase
toc: true
---

# 9 Collections

## 9.1 The Java Collection Framework

### Seperate Collection Interfaces and Implementation

Interface

```java
public interface Queue<E>
{
  void add(E element);
  E remove();
  int size();
}
```

Create a class to implement

**Use the interface type** to hold the reference

* When you use a queue in your program, you don't need to know which implementation is actually used
* easy to change the implementation
  * circular array: bounded

### The Collection Interface

the fundamental interface

```java
public interface Collection<E>
{
  boolean add(E element);
  Iterator<T> iterator();
  ...
}
```

* add: add an element
  * return true: changed
  * return false: unchanged
* iterator: return Iterator object (visit one by one)

### Iterators

```java
public interface Iterator<E>
{
  E next();
  boolean hasNext();
  void remove();
  default void forEachRemaining(Consumer<? super E> action);
}
```

* Call the hasNext() before calling the next()

* ```java
  for (String element: c)
  {
    do something with element;
  }
  ```

  work with any object that implements Iterable

  ```java
  public interface Iterable<E>
  {
    Iterator<E> iterator();
  }
  ```

* ```java
  iterator.forEachRemaining(element -> do something with the element);

* remove(): remove the element that was returned by the last call to next
* IllegalStateException: call remove() before next()

### Generic Utility Methods

AbstractCollection

* leave size() and iterator abstract
* implement the routine method

## 9.2 Interfaces in the Collections Framework

* Collection
  * add
  * iterator
* Map
  * V put (K key, V value)
  * V get (K key)
* List: ordered collection
  * access
    * random access: index(add, remove, get, set)
    * iterator: ListIterator
* Set: reject duplication
  * add
  * equals
  * hashCode
* SortedSet, SortedMap

## 9.3 Concrete Collection

### LinkedList

List interface

* LinkedList class
* ArrayList class

Solve the remove/insert problem in ArrayList

* store each object in a separate link: data, next, previous

* an **ordered** collection

* LinkedList.add: end

* ListIterator

  * E previous();

  * boolean hasPrevious();

  * **add**: add the new element before the iterator position

    if a LinkedList has n elements, there are n+1 spots for adding a new element

  * **set**: replaces the last element returned by a call to next or previous

  * **ConcurrentModificationException**: If an iterator finds that its collection has been modified by another iterator or by method of the collection itself

    * You can have as many iterators as you like, if they are readers
    * Only one iterator that can both read and write

  * AbstractCollection superclass

  * don't use for integer-index access (inefficient)

  * nextIndex()

    previousIndex()

### HashSet

features

* look for a particular element quickly (only check one bucket)
* no control over the order

> If you define your own classes, implement the hashCode() method

The computation **depends only on the state** of the object that need to be hased

In Java, hash tables are implemented as **arrays of linked list (bucket)** (balanced tree in Java 8)

* get the hashCode
* code % m (m: the number of buckets)
  * set m to somewhere between 75% and 150% of the expected element count
* if hash collision occurs, compare to see if it is already present
* rehash if it is full
  * the load factor determines when to rehash (usually 75% full)

### TreeSet

* similar to the hash set, but it is sorted collection (red-black tree)
* the element must implement the Comparable interface or supply a Comparator
* If you don't need the data sorted, there is no reason to use TreeSet

### Queues and Deques

Queue interface

Deque interface

* add or remove elements at the head and tail
* implemented by ArrayDeque, LinkedList

### Priority Queues

**retrieve** elements in **sorted** order

* remove(): get the **smallest** element
* not sorted when iterating
* In java, use **heap**
* implement the Comparable/Comparator object

## 9.4 Maps

look up an element with key

### Basic Map Operation

**HashMap** & **TreeMap** implement the **Map** interface

* HashMap: **hash** the key

  TreeMap: an ordering on the keys in a search **tree**

* choose

  sets & no need to sort: HashMap

* .get(): when there is no correspondent key, returns null

  .getOrDefault(id, 0)

* key must be **unique**

  put(...) (will replace)

  remove(...)

* size()

* iterate: foreach()

### Update Map Entries

count

1. ```java
   counts.put(word, counts.getOrDefault(word, 0)+1);
   ```

2. ```java
   counts.putIfAbsent(word, 0);
   counts.put(word, counts.get(word)+1);
   ```

3. ```java
   counts.merge(word, 1, Integer::sum);
   ```

### Map views

The collection framework dose not consider a map itself a collection (map is not a collection)

**views** of the map: objects that implement the Collection interface or its subclass

```java
// views
Set<K> KeySet();				// not Hashset or Treeset
Collection<V> Values();
Set<Map.Entry<K, V>> entrySet();
```

```java
for (Map.Entry<String, Employee> entry: staff.entrySet())
{
  String k = entry.getKey();
  Employee v = entry.getValue();
  ...
}
```

* the iterator on the key set/entry set view
  * remove(): remove the key and associated value
  * cannot add

### Weak Hash Maps

map classes for specialized need

Problem: As long as the map object is live, all buckets in it are live and won't be reclaimed. Program should take care to remove unused values from long-lived maps

**WeakHashMap**: cooperate with the garbage collector

* use **WeakReference** to hold keys
* **garbage collector** put WeakReference into a queue
* the WeakHashMap checks the queue and **removes** the associated entry

### Linked Hash Sets and Maps

Remember in which order you inserted items

* LinkedHashSet
* LinkedHashMap
* doubly linked list

LinkedHashMap can alternatively use **access order**

* get() or put(): the entry is placed at the end of the linked list

* LinkedHashMap<K, V>(initialCapacity, loadFactor, true);

  * (128, 0.75F, true)

* useful for implementing a  "least recently used" discipline for a cache

* ```java
  var cache = new LinkedHashMap<K, V>(128, 0.75F, true)
  {
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest)
    {
      return size() > 100;
    }
  };
  ```

### Enumeration Sets and Maps

EnumSet: elements that belong to an enumerated type (internally implemented as a sequence of bits)

* ```java
  enum Weekday {MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY};
  EnumSet<Weekday> always = EnumSet.allOf(Weekday.class);
  EnumSet<Weekday> never = EnumSet.noneOf(Weekday.class);
  EnumSet<Weekday> workday = EnumSet.range(Weekday.MONDAY, Weekday.FRIDAY);
  EnumSet<Weekday> mwf = EnumSet.of(Weekday.MONDAY, Weekday.WEDNESDAY, Weekday.FRIDAY);

* usual methods of the Set interface

EnumMap: keys belong to an enumerated type

* ```java
  var personInCharge = new EnumMap<Weekday, Employee>(Weekday.class);

### Identity Hash Map

Use System.identityHashCode (memory address) to compute the hash values for the keys

* consider distinct even if they have equal contents

## 9.5 Views and Wrappers

view: a class that implements the **Set** interface and whose methods manipulate the original map

### Small Collection

of: yield with given elements

```java
List<String> names = List.of("Peter", "Pual", "Mary");
Set<Integer> numbers = Set.of(2, 3, 5);
Map<String, Integer> scores = Map.of("Peter", 2, "Paul", 3);
```

* (List and Set interface) 11 of() methods with 0 to 10 arguments (for efficiency) and an of() method with a variable number of arguments

* (Map interface) ofEntries()

  ```java
  import static java.util.Map.*;

  Map<String, Integer> scores = ofEntries(
  	entry("Peter", 2),
  	entry("Paul", 3));
  ```

These collection objects are **immutable**

* **UnsopportedOperationException**: Attempt to change their contents

* pass the immutable collection to the constructor to get a mutable one

  ```java
  var names = new ArrayList<>(List.of("Peter", "Paul"));

```java
List<String> settings = Collections.nCopies(100, "DEFAULT");
```

* "DEFAULT" stores only once

### Subranges

subList(a, b): obtain a view into the subrange of the list

```java
List<Employee> group2 = staff.subList(10, 20); 		// inclusive, exclusive
```

* the operations to the subrange automatically reflect the entire list

**SortedSet** interface (return views)

* ```java
  SortedSet<E> subSet(E from, E to);
  SortedSet<E> headSet(E to);
  SortedSet<E> tailSet(E from);

* from: >=
* to: <

**SortedMap** interface (return views)

* ```java
  SortedMap<K, V> subMap(K from, K to);
  SortedMap<K, V> headMap(K to);
  SortedMap<K, V> tailMap(K from);
  ```

**NavigableSet** interaface

* ```java
  NavigableSet<E> subSet(E from, boolean fromInclusive, E to, boolean toInclusive);
  NavigableSet<E> headSet(E to, boolean toInclusive);
  NavigableSet<E> tailSet(E from, boolean fromInclusive);

### Unmodified Views

Let the collection remain untouched (methods)

```java
Collections.unmodifiableCollection;
Collections.unmodifiableList;
Collections.unmodifiableSet;
Collections.unmodifiableSortedSet;
Collections.unmodifiableNavigableSet;
Collections.unmodifiableMap;
Collections.unmodifiableSortedMap;
Collections.unmodifiableNavigableSet;
```

* All **mutator** methods have been redefined to throw an **UnsupportedOperationException**

* views **wrap the interface**: only have access to those methods that are defined in the interface

* Only unmodifiableSet & unmodifiableList uses the equals() and hashcode() methods of the underlying collections

  Otherwise, use Object class

### Synchronized Views

For multiple threads

static Collection.synchronizedMap: turn any map into a Map with synchronized access methods

```java
var map = Collections.synchronizedMap(new HashMap<String, Employee>());
```

**get() and put()** are synchronized: each method call must be finished completely before another thread can call another method

### Checked Views

debugging support for a problem that can occur with generic type

Undetected errors happen at runtime when:

```java
var strings = new ArrayList<String>();
ArrayList rawList = strings;				// warning only
rawList.add(new Date());
```

* throw an exception when being casted to string, define a safe list as follows

  ```java
  List<String> safeStrings = Collections.checkedList(strings, String.class);

## 9.6 Algorithm

### Why Generic Algorithm
