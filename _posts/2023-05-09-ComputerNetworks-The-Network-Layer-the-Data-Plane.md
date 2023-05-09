---
title: 4 The Network Layer: the Data Plane
date: 2023-05-09 14:17:00 +0800
categories: [Basic, Computer Network]
tags: [basic]        # lowercase
toc: true
math: true
---

## 4.1 Network Layer Overview

### Network-layer services and protocols

transport segment from sending to receiving host

* sender: <u>encapsulates</u> segment into datagrams, <u>passes</u> to link layer
* receiver: <u>delivers</u> segments to transport layer protocol

network layer protocols in **every Internet devices** (including hosts & routers)

* routers
  * <u>examines</u> header fields in all IP datagrams passing through it
  * <u>moves</u> datagrams from input ports to output ports to transfer datagrams along end-end path

### Two key network-layer functions

**forwarding**: move packets from a router's input link to appropriate router output link

* implemented in hardware

**routing**: determine route taken by packets from source to destination (end-end)

* implemented in routing algorithm (software)

### Network layer: data plane, control plane

**Data plane**

* **local**, per-router function
* determines how datagram arriving on router <u>input</u> port is forwarded to router <u>output</u> port

**Control plane**

* **network-wide** logic
* determines how datagram is routed among routers along end-end path from <u>source</u> host to <u>destination</u> host

* two control-plane approaches
  1. **traditional routing algorithms**: implemented in routers
  2. **software-defined networking (SDN)**: implemented in servers

### Network-layer service model

Internet "best effort" service model: **No guarantees** on

1. successful datagram delivery to destination
2. timing or order of delivery
3. bandwidth available to end-end flow

**Simplicity of mechanism** has allowed Internet to be widely deployed adopted

Sufficient **provisioning of bandwidth** allows performance of real-time applications to be "good enough" for "most of the time"

**Replicated, application-layer distributed services** connecting close to clients' networks, allow services to be provided from multiple location

## 4.2 What's Inside a Router

### Architecture Overview

**forwarding data plane** (hardware)

* router input ports -> high-speed switching fabric -> router output ports
* operates in <u>millisecond</u> time frame

**routing, management control plane** (software)

* router input ports -> (high-speed switching fabric <-> <u>routing processor</u>) -> router output ports
* operates in <u>nanosecond</u> time frame

### Input Ports

1. line termination: physical layer: bit-level reception

2. link layer protocol: link layer: e.g. Ethernet
3. look up, forwarding, queueing: decentralized switching
   * using <u>header field values</u>, lookup output port using <u>forwarding table</u> in input port memory
   * **destination-based forwarding**: forward based only on destination <u>IP address</u> (traditional)
   * **generalized forwarding**: forward based on any set of <u>header field values</u>
4. (switching fabric)

destination-based forwarding

* **forwarding table**: destination address range, link interface

* **Longest prefix match**

  * find the <u>longest address prefix</u> that matches destination address

    e.g. 11001000 00010111 00011000 \*\*\*\*\*\*\*\*

  * often performed using ternary content addressable memories (TCAMs)

### Switching

**switching fabric**: <u>transfer</u> packet from input link to appropriate output link

**switching rate**: rate at which packets can be transfer from inputs to outputs

* N input ports, R incoming rate
* ideally rate = N*R

three major types of switching fabrics

* <u>memory</u>
  * switching under direct control of <u>CPU</u>
  * packet <u>copied</u> to system's memory
  * speed limited by memory bandwidth
* bus
  * switching speed limited by bus bandwidth
* interconnection network (most widely adopted)
  * crossbar, clos network, other interconnection nets initially developed to connect processors in multiprocessor
  * **multistage switch**
  * exploiting **parallelism**: fragment datagram into fixed length cells on entry, switch cells through the fabric, reassemble datagram at exit
  * using multiple switching planes in parallel
    * Cisco CRS router
      * basic unit: 8 switching planes
      * each plane: 3-stage interconnection network

### Output Ports

input port queuing: occurs when switch fabric slower than input ports combined

* causes queuing delay and loss

* **Head-of-the-Line (HOL) blocking**: queued datagram at front of queue prevents others in queue from moving forward

output port queuing

* **Buffering** required when datagrams arrive from fabric <u>faster</u> than link transmission rate

  * RFC 3439: average buffering equal to "typical" RTT times link capacity C

  * with N flows buffering equal to
    $$
    \frac{RTT\cdot C}{\sqrt{N}}
    $$

  * <u>too much buffering</u> can increase <u>delays</u>

* **Drop policy**: which datagrams to <u>drop</u> if no free buffers (congestion)

* **Scheduling discipline**: <u>chooses</u> among queued datagrams for transmission

### Packet Buffering

**Drop**: which packet to add, drop when buffers are <u>full</u>

* **tail drop**: drop arriving packets
* **priority**: drop/remove on priority basis

**Marking**: which packets to mark to signal congestion (ECN, RED)

### Packet Scheduling

**packet scheduling**: decide which packet to send next on link

* first come, first serve
* priority
* round robin
* weighted fair queueing

**FCFS**: packets transmitted in <u>order of arrival</u> to output port

* also known as <u>First-in-first-out (FIFO)</u>

**Priority scheduling**: arriving traffic classified, queued by <u>class</u>

* send packet from <u>highest</u> priority queue that has buffered packets
* <u>FCFS</u> within priority class

**Round Robin (RR) scheduling**

* arriving traffic classified, queued by class
* server cyclically, repeatedly scans class queues, sending one complete <u>packet from each class in turn</u>

**Weighted Fair Queuing (WFQ)**: generalized Round Robin

* each class i has weight w_i and gets <u>weighted</u> amount of service in each cycle
  $$
  \frac{w_i}{\sum_jw_j}
  $$

* minimum bandwidth guarantee

### Sidebar: Network Neutrality

**network neutrality**: how an ISP should share/allocate its resources

2015 US FCC

* no blocking
* no throttling
* no paid prioritization

## 4.3 The Internet Protocol - IPv4, addressing

### IP Datagram format

32 bits each (Typically datagram is 1500 bytes or less)

* IP protocol version number, header length(bytes), type of service(diffserv, ECN for congestion), total datagram length (bytes)
* 16-bit identifier, flags, fragment offset (for fragmentation)
* time to live TTL, upper later (e.g. TCP, UDP), header checksum
* source IP address
* destination IP address
* options
* payload data (typically a TCP, UDP segment)

### IP addressing

**IP addressing**: 32-bit identifier associated with each host or router <u>interface</u>

**interface**: connection between host/router and physical link

* router's typically have multiple interfaces
* host typically has one or two interfaces

#### Subnets

**subnet**: device interfaces that can physically reach each other <u>without passing through an intervening router</u> (via link layer technology)

IP address have structure

* <u>subnet part</u>: common high order bits
* <u>host part</u>: remaining low order bits

example

* 233.1.3.0/24
* /24 is the subnet mask (high-order 24 bits is the subnet part of IP address)

#### CIDR

**CIDR**: Classless InternetDomain Routing

* subnet portion of address of arbitrary length
* address format: <u>a.b.c.d/x</u>, where x is # bits in subnet portion of address

#### How to get IP address?

How does a host get <u>host part</u> of address

* hard-coded by sys admin in config file
* **DHCP**: Dynamic Host Configuration Protocol

DHCP

* goal: host dynamically obtains IP address from network server when it joins network
  * can renew its lease
  * allows reuse of addresses
* **DHCP server**: co-located in router, serving all subnets to which router is attached
* DHCP client-server scenario
  * <u>DHCP discover</u>: Broadcast to find a DHCP server (optional)
  * <u>DHCP offer</u>: give an IP address (optional)
  * <u>DHCP request</u>: Broadcast including the IP address that the host wants to use
  * <u>DHCP ACK</u>: Broadcast
* DHCP can return
  * allocate IP address on subnet
  * address of first-hop router for client
  * name and IP address of DNS server
  * network mask

How does a network get <u>subnet part</u> of address

* get allocated portion of its provider ISP's address space
* example
  * ISP: 200.23.16.0/20
  * Organization 0: 200.23.16.0/23
  * Organization 1: 200.23.18.0/23

### Hierarchical addressing

**route aggregation**

* allows efficient advertisement of routing information: clients has the same address beginning as their ISP

choose more <u>specific</u> route: longest prefix match

## 4.3 The Internet Protocol - NAT, IPv6

### NAT: Network Address Translation

All devices in local network share just one IPv4 address.

All datagrams leaving local network have the <u>same</u> source NAT IP address, but different source port numbers.

All devices in local network have 32-bit addresses in a private IP address space (<u>10/8, 172.16/12, 192.168/16 prefixes</u>) that can only <u>be used in local network</u>

advantages

* <u>one</u> IP address needed from provider ISP for all devices
* can change addresses of host in local network <u>without notifying</u> outside world
* can change ISP <u>without changing</u> addresses of devices in local network
* security: devices inside local net <u>not directly addressable, visible</u> by outside world

implementation

* <u>outgoing datagrams</u>: replace (source IP address, port #) to (NAT IP address, new port #)
* <u>remember</u> (in NAT translation table) every translation pair
* <u>incoming datagrams</u>: replace (NAT IP address, new port #) to (source IP address, port #)

### IPv6

motivation

* 32-bit IPv4 address space would be completely allocated
* speed processing/forwarding: 40-byte fixed length header
* enable different network-layer treatment of flows

datagram format: 32 bits each

* version, priority, flow label (identify datagrams in same flow)
* payload length, next header, hop limit
* 128-bit IPv6 address
* payload
* no checksum, fragmentation, options

Transition from IPv4 to IPv6

* how will network operate with mixed IPv4 and IPv6 router
* **tunneling**: IPv6 datagram carried as payload in IPv4 datagram among IPv4 router

## 4.4 Generalized Forwarding and SDN

### generalized forwarding

many header fields can determine action

many action possible: drop/copy/modify/log packet

flow table abstraction

* <u>flow</u>: defined by header field values
* <u>generalized forwarding</u>: simple packet-handling rules
  * <u>match</u>: pattern values in packet header fields
  * <u>actions</u>
  * <u>priority</u>: disambiguate overlapping patterns
  * <u>counters</u>: # bytes and # packets

### OpenFlow

match+action: abstraction unifies different kinds of devices

* Router
  * match: longest destination IP prefix
  * action: forward out a link
* Switch
  * match: destination MAC address
  * action: forward or flood
* Firewall
  * match: IP addresses and TCP/UDP port numbers
  * action: permit or deny
* NAT
  * match: IP address and port
  * action: rewrite address and port

## 4.5 Middleboxes

initially: proprietary hardware solution

move towards hardware implementing open API

* move away from proprietary hardware solutions
* <u>progammable local actions</u> via match+action
* move towards innovation/differentiation in software

<u>SDN</u>: centralized control and configuration management often in private/public cloud

<u>network function virtualization (NFV)</u>: programmable services over white box networking, computation, storage