---
title: 4 The Network Layer - the Data Plane
date: 2023-05-09 14:17:00 +0800
categories: [Basic, Computer Networking A Top-Down Approach]
tags: [basic]        # lowercase
toc: true
math: true
---

## 4.1 Network Layer Overview

### Network-layer Services

transport segment from sending to receiving host

* sender: <u>encapsulates</u> segment into datagrams, <u>passes</u> to link layer
* receiver: <u>delivers</u> segments to transport layer protocol

network layer protocols in **every Internet devices** (including hosts & routers)

* routers
  * <u>examines</u> header fields in all IP datagrams passing through it
  * <u>moves</u> datagrams from input ports to output ports to transfer datagrams along end-end path

### Two Key Network-layer Functions

**forwarding**: move packets from a router's input link to appropriate router output link

* implemented in hardware

**routing**: determine route taken by packets from source to destination (end-end)

* implemented in routing algorithm (software)

### Network Layer: Data Plane & Control Plane

**Data plane**

* **local**, per-router function
* determines how datagram arriving on router <u>input port</u> is forwarded to router <u>output port</u>

**Control plane**

* **network-wide** logic
* determines how datagram is routed among routers along end-end path from <u>source host</u> to <u>destination host</u>

* two control-plane approaches
  1. **traditional routing algorithms**: implemented in routers (exchange routing messages)
  2. **software-defined networking (SDN)**: implemented in servers

### Network-layer Service Model

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

1. line termination (physical-layer function): bit-level reception

2. link layer protocol (link-layer function): e.g. Ethernet
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

**switching rate**: rate at which packets can be transfer from inputs to outputs

* N input ports, R incoming rate
* ideally rate = N*R

**switching fabric**: <u>transfer</u> packet from input link to appropriate output link

* **memory**
  * switching under direct control of <u>CPU</u>
  * packet <u>copied</u> to system's memory
  * then copied to the output port's buffers
  * speed limited by memory bandwidth
* **bus**
  * generate a switch-internal <u>label</u>
  * only the port that matches the label will keep the packet
  * remove the label
  * speed limited by bus bandwidth
* **interconnection network** (most widely adopted)
  * overcome the bandwidth limitation of a single, shared bus
  * **crossbar switch**
    * consists of <u>2N buses</u> that connect N input ports to N output ports
    * **non-blocking**: capable of forwarding multiple packets in parallel (except for these destined to the same output port)
  * **multistage switch**
    * exploiting **parallelism**: fragment datagram into fixed length cells on entry, switch cells through the fabric, reassemble datagram at exit

### Output Ports

1. (switch fabric)
2. Queuing (buffer management)
3. Data link processing
4. Line termination

input port queuing: occurs when switch fabric slower than input ports combined

* causes queuing delay and loss

* **Head-of-the-Line (HOL) blocking**: queued datagram at front of queue prevents others in queue from moving forward

output port queuing

* **Buffering** required when datagrams arrive from fabric <u>faster</u> than link transmission rate

  * RFC 3439: average buffering equal to "typical" RTT times link capacity C

  * with N TCP flows, buffering equal to
    $$
    \frac{RTT\cdot C}{\sqrt{N}}
    $$

  * (<u>too much buffering</u> can increase <u>delays</u>)

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

**Priority Queuing**: classified into priority classes

* each class has a queue
* FCFS in each queue
* **non-preemptive priority queuing**

**Round Robin (RR) Queuing**

* arriving traffic classified, queued by class
* server cyclically, repeatedly scans class queues, sending one complete <u>packet from each class in turn</u>

**Weighted Fair Queuing (WFQ)**: generalized Round Robin

* each class i has weight w_i and gets <u>weighted</u> amount of service in each cycle
  $$
  \frac{w_i}{\sum_jw_j}
  $$

* minimum bandwidth guarantee

> ### Sidebar: Network Neutrality
>
> **network neutrality**: how an ISP should share/allocate its resources
>
> 2015 US FCC
>
> * no blocking
> * no throttling
> * no paid prioritization

## 4.3 The Internet Protocol - IPv4, Addressing, IPv6 and More

### IP Datagram Format

Typically datagram is 1500 bytes or less

* **version number**
* **header length**: to determine where in the IP datagram the payload actually begins
* **type of service**: e.g. real-time datagrams or non-real-time
* **datagram length**: total length of the IP datagram (header plus data)
* **identifier, flags, fragmentation offset**: for IP fragmentation
* **time-to-live** (TTL): prevent circulation (decremented by one each time the datagram is processed by a router. If it is 0, a router must drop the datagram)
* **protocol**: the specific transport-layer protocol
* **header checksum**: the Internet checksum
* **source and destination IP address**
* **options**
* **data (payload)**

datagram header (40 bytes) = 20 bytes (from datagram header) + 20 bytes (from TCP segment header)

### IPv4 Datagram Fragmentation

**maximum transmission unit (MTU)**: the maximum amount of data that a link-layer frame can carry

* <u>varies</u> in different link-layer protocols
* <u>limits</u> the length of an IP datagram

Each of the links along the route between sender and destination have <u>different MTUs</u>

* solution
  * <u>fragment</u> the payload in the IP datagram into two or more smaller IP datagrams
  * datagrams are <u>reassembled in the end systems</u> rather than in network routers
* how
  * **identifier**: the sending host <u>increments the identifier</u> for each datagram it sends
  * **flag**: the last fragment is 0, otherwise 1
  * **offset**: specify where the fragment fits within the original IP datagram

### IPv4 Addressing

**interface**: connection between host/router and physical link

* router's typically have multiple links

  Each link has an interface

* host typically has one or two links, thus has one or two interfaces

**IP address**: 32-bit identifier associated with each host‘s or router's <u>interface</u>

#### Subnets

**subnet**: device interfaces that can physically reach each other <u>without passing through an intervening router</u> (via link layer technology)

IP address have structure

* <u>subnet part</u>: common high order bits
* <u>host part</u>: remaining low order bits

example

* 233.1.3.0/24
* /24 is the **subnet mask** (high-order 24 bits is the subnet part of IP address)

#### CIDR

**CIDR**: Classless Internet Domain Routing

* subnet portion of address of arbitrary length
* address format: <u>a.b.c.d/x</u>, where x is # bits in subnet portion of address

**IP broadcast address**: 255.255.255.255

* the message is delivered to all hosts on the same subnet

#### How to get IP address?

##### Obtaining a Block of Addresses

for use within an organization's subnet

* contact its ISP

  get allocated portion of its provider ISP's address space

* ICANN is responsible for managing the IP address space

example

* ISP: 200.23.16.0/20
* Organization 0: 200.23.16.0/23
* Organization 1: 200.23.18.0/23

##### Obtaining a Host Address

router: a system administrator will typically <u>manually configure</u> the IP addresses into the router

host: **DHCP Dynamic Host Configuration Protocol**

DHCP: a plug-and-play protocol

* goal: host dynamically obtains IP address (permanent or temporary) from network server when it joins network
* a client-server protocol
  * <u>DHCP server</u>: co-located in router, serving all subnets to which router is attached
  
* a four-step process
  * **DHCP server discovery**: Broadcast to find a DHCP server (optional)
  * **DHCP server offers**: give an IP address (optional)
  * **DHCP request**: Broadcast including the IP address that the host wants to use
  * **DHCP ACK**: Broadcast
  * can use the DHCP-allocated IP address for the lease duration
    * can renew its lease
* DHCP can also return
  * address of first-hop router for client (default gateway)
  * name and IP address of DNS server
  * subnet mask

> ### Hierarchical addressing
>
> **route aggregation**
>
> * allows efficient advertisement of routing information: clients has the same address beginning as their ISP
>
> choose more <u>specific</u> route: longest prefix match

### NAT: Network Address Translation

**private network** or **realm with private addresses**: network whose addresses only have meaning to devices within that network

* 10.0.0.0/8
* 172.16.0.0/12
* 192.168.0.0/16

the NAT router behaves to the outside world as a <u>single</u> device with a <u>single</u> IP address

* router gets its address from the ISP's DHCP server
* router runs a DHCP server to provide addresses to computers within the NAT-DHCP-router-controlled home network's address space

implementation

* <u>outgoing datagrams</u>: replace (source IP address, port #) to (NAT IP address, new port #)
* <u>remember</u> (in **NAT translation table**) every translation pair
* <u>incoming datagrams</u>: replace (NAT IP address, new port #) to (source IP address, port #)

advantages

* <u>one</u> IP address needed from provider ISP for all devices
* can change addresses of host in local network <u>without notifying</u> outside world
* can change ISP <u>without changing</u> addresses of devices in local network
* security: devices inside local net <u>not directly addressable, visible</u> by outside world

### IPv6

motivation: 32-bit IPv4 address space would be completely allocated

datagram format changes

* **Expanded addressing capabilities**: 128-bit
* **A streamlined 40-byte header**: faster processing
  * **Version**: IP version
  * **Traffic class**: give priority to certain datagrams
  * **Flow label**: identify a flow of datagram
  * **Payload length**
  * **Next header**: identify the transport layer protocol
  * **Hop limit**: decremented by one by each router that forwards the datagram
  * **Source and destination addresses**
  * **Data**

* **Flow labeling**: enable different network-layer treatment of flows

* deleted parts
  * **Fragmentation**
    * does not allow for fragmentation and reassembly at intermediate routers; these can be performed only by the source and destination
    * simply drops the datagram and sends a ICMP error message
  * **Header checksum**: unnecessary since the transport-layer and link-layer protocols have
  * **Options**

Transition from IPv4 to IPv6: how will network operate with mixed IPv4 and IPv6 router

* **tunneling**: IPv6 datagram carried as payload in IPv4 datagram among IPv4 router

## 4.4 Generalized Forwarding and SDN

### Generalized Forwarding

destination-based forwarding

1. **match**: look up a destination IP address
2. **action**: send the packet into the switching fabric to the specific output port

generalized forwarding

1. **match**: based on multiple header fields
2. **action**: forward/drop/copy/modify/log packet

**flow table** abstraction

* <u>A set of header field values</u>: to which an incoming packet will be matched
* <u>A set of counters</u>: e.g. the number of packets that have been matched by that table entry
* <u>A set of actions to be taken</u>

### OpenFlow

match+action abstraction unifies different kinds of devices

* allows for a match to be made on selected fields from <u>three layers</u> of protocol headers
* each flow table entry has a <u>priority</u>

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
