---
title: 1 Computer Networks and the Internet
date: 2023-01-31 15:06:00 +0800
categories: [Basic, Computer Networking A Top-Down Approach]
tags: [basic]        # lowercase
toc: true
---

## 1.1 What is the Internet & What is Protocols

### The Internet: a Nuts-and-bolts View

**Network Edge**: Billions of connected computing devices

* **hosts**/**end systems**: clients and servers
* run network apps
* servers often in the data center

**Packet switches**

* forward packets (chunks of data)
* two types: **routers**, **switches**

* **access networks** (physical media)

  * wired, wireless **communication links**: fiber, copper, radio, satellite


  * **transmission rate**: bandwidth


* **Network core**

  * interconnected **routers**

  * <u>Internet: "network of networks"</u>

  * Internet Service Providers (**ISPs**)


**Protocols** are everywhere (e.g. TCP & IP)

* control sending and receiving of messages
* Internet standards: requests for comments (**RFCs**)

### The Internet: a "Service"‘s View

**Infrastructure** that provides services to applications

* End systems use a **socket** interface to communicate with each other

### Protocols

Human protocols

* example: Request & Reply; multi-step questions & answers

* rules: specific <u>messages</u> sent, specific <u>actions</u> taken when message received

Network protocols

* Protocols define the <u>format</u>, <u>order of messages sent and received</u> among network entities, and <u>actions</u> taken on msg transmission, receipt

## 1.2 The Network Edge

### Access Networks

connect end systems to edge router (3 types)

* <u>residential</u> access networks
* <u>institutional</u> access networks (school company)
* <u>mobile</u> access networks (WiFi, 4G/5G)

2 things about access networks

* <u>transmission rate</u> (bit per second) of access network
* <u>shared</u> or <u>dedicated</u> access among users

#### Home Access (Residential)

**Cable**: (homes) cable modem - cable - cable headend - Internet Service Provider (ISP)

* **frequency division multiplexing (FDM)**: different channels transmitted in different frequency bands

* **HFC**: hybrid fiber coax (asymmetric)
  * downstream transmission rate: 40Mbps - 1.2Gbs
  * upstream transmission rate: 30 - 100Mbps
* network of cable, fiber attaches homes to ISP router
  * home **shares** access network to cable headend

**Digital Subscriber Line (DSL)**: (home) DSL modem - DSLAM (central office) - Internet/telephone network

* use existing <u>telephone line</u> to exchange data with a <u>digital subscriber line access multiplexer (DSLAM)</u>

* dedicated downstream transmission rate: 24-52Mbps (asymmetric)

  dedicated upstream transmission rate: 3.5-16Mbps

  ordinary two-way telephone channel

* telephone call and Internet connection **share** the link

#### Enterprise (and the Home) Access (Institutional)

**Ethernet**: hosts - Ethernet switch - institutional router - ISP

**Wireless Local Area Networks (WLANs)**:  shared wireless access network connects end systems to router

* via base station (access point)
* base station - router - cable modem - ISP

#### Mobile Access

**Wide-area Wireless Access**

* provided by mobile, cellular network operator (10 km)
* 4G/5G cellular

### Packets of data

host sending function

* break message into smaller chunks, known as **packets**, of length **L** bits

* transmits packets into access network at **transmission rate R**

  * link transmission rate, aka link capacity, link bandwidth

* $$
  packet~transmission~delay = time~needed~to~transmit~L-bit~packet~to~link  = \frac{L}{R}
  $$

### Physical Media

**bit**: propagates between transmitter/receiver pairs

**physical link**: what lies between transmitter & receiver

**guided media**: signals propagate in solid media: copper, fiber, coax

* **Twisted pair (TP)**: two insulated copper wires
* **Coaxial cable**: two concentric copper conductors, bidirectiona
* **Fiber optic cable**: glass fiber carrying light pulses

**unguided media**: signals propagate freely, e.g. radio

* **Wireless radio**

## 1.3 The Network Core

mesh of interconnected <u>routers</u>

**Packet-switching**: hosts break application-layer messages into **packets**

* network <u>forwards</u> packets from one router to the next, across links on path <u>from source to destination</u>

### Two Key Network-core Functions

**Forwarding** (aka switching)

* <u>local</u> action: move arriving packets from router's input link to appropriate router output link
* controlled by local forwarding table based on <u>destination address</u> in arriving packet's header

**Routing**

* <u>global</u> action: determine source-destination paths taken by packets
* routing algorithm

### Packet-switching: store-and-forward

**packet Transmission delay**: takes L/R seconds to transmit L-bit packet into link at R bps

**store and forward**: entire packet must arrive at router before it can be transmitted on next link

**queueing** occurs when work arrives faster than it can be serviced

**Packet queuing and loss**: if arrival rate to link exceeds transmission rate of link for some period of time

* packets will <u>queue</u>, waiting to be transmitted on output link
* packets can be <u>dropped(lost)</u>, if memory(buffer) in router fills up

### Circuit-switching (Alternative to packet-switching)

end-end resources allocated to, reserved for "call" between source and destination (queuing never occurs)

* <u>dedicated</u> resources (no sharing)
* circuit segment <u>idle</u> if not used by call
* commonly used in traditional telephone networks

FDM and TDM

* **Frequency Division multiplexing (FDM)**
  * divided into <u>narrow frequency bands</u>
  * each call allocated its own band, can transmit at max rate of that narrow band
* **Time Division Multiplexing (TDM)**
  * time divided into <u>slots</u>
  * each call allocated periodic slot(s), can transmit at maximum rate of (wider) frequency band during its time slot

### Packet-switching Versus Circuit-switching

packet-switching is great for "bursty data"

packet-switching

* cons: not suitable for real-time services
* pros
  * better sharing
  * simpler, more efficient, and less costly

**excessive congesting possible**: packet delay and loss due to buffer overflow

* <u>protocols</u> needed for reliable data transfer, congestion control

### Internet Structure: a "Network of Networks"

Network Structure 1: one <u>global transit ISPs</u>

Network Structure 2: multiple global transit ISPs

Network Structure 5 (Any ISP may choose to **multi-home**)

* "tier 1" commercial ISPs
* content provider networks (Google, Facebook)

* **Internet Exchange Point (IXP)**
* regional ISP
* access ISP: cable, FTTH, Wi-Fi and cellular

## 1.4 Network Performance: Delay, Loss, Throughput

How do packet delay and loss occur?

1. Packets <u>queue</u> in router buffers

2. Packet <u>loss</u> occurs when memory to hold queued packets fills up

delay

* transmission delay
* queueing delay

### Packet Delay: four sources

$$
d_{nodal} = d_{proc}+d_{queue}+d_{trans}+d_{prop}
$$

* d_{proc}: <u>processing</u> delay

  * check bit errors
  * determine output link
  * typically < microsecs

* d_{queue}: <u>queueing</u> delay

  * time waiting at output link for transmission

  * depends on congestion level of router

  * **traffic intensity**

    * a: average packet arrival delay

    * L: packet length (bits)

    * R: link bandwidth

    * $$
      \frac{L\cdot a}{R} = \frac{arrival~rate~of~bits}{service~rate~of~bits}
      $$

      ~0: small

      ->1: large

      \> 1: infinite
      
      no greater than 1

* d_{trans}: <u>transmission</u> delay

  * L: packet length (bits)
  * R: link transmission rate (bps)
  * d_{trans} = L/R

* d_{prop}: <u>propagation</u> delay

  * d: length of physical link
  * s: propagation speed
  * d_{prop} = d/s

### "Real" Internet Delays and Routes

**traceroute** program: provides delay measurement from source to router along end-end Internet path towards destination

* For all router i, 
  * sends three packets that will reach router i on path towards destination
  * router will return each packet to sender
  * sender measures time interval between transmission and reply

### Packet Loss

queue preceding link in buffer has finite capacity

packet arriving to full queue dropped

lost packet may be retransmitted by previous node, by source end system, or not at all

### Throughput

**throughput**: rate (bits/time unit) at which bits are being sent from sender to receiver

* **instantaneous**: rate at given point in time
* **average**: rate over longer period of time

Rs for the link between the server and the router, and Rc for the link between the client and the router, average end-end throughput

* Rs < Rc, the throughput is Rs
* Rs > Rc, the throughput isRc
* **bottleneck link**: thinner one

### Throughput: Network Scenario

10 connections share backbone link R bits/sec

* per-connection end-end throughput: <u>min</u>(Rs, Rc, R/10)

* in practice: Rc or Rs is smaller than R/N, bottleneck link is <u>at network edge</u>

## 1.5 Layering, Encapsulation, Service Models

an example of airline systems

### Architectural Layering

**layers**: each layer implements a <u>service</u>

* via its own internal-layer actions
* relying on services provided by layer below

Why Layering?

* Explicit structure allows identification, relationship of system's pieces
* modularization eases maintenance, updating of system
  * change in layer's service implementation <u>transparent</u> to rest of system (doesn't affect rest of the system)

### Internet Layers

Five-layer Internet protocol stack

1. **application**: supporting network application (software)

   * HTTP, IMAP, SMAP, DNS

   * exchanges messages to implement some application service using services of transport layer

   * application-layer **message** M


2. **transport**: processing data transfer (software)

   * TCP, UDP

   * transfers M from one process to another, using services of network

   * H_t M: **encapsulates** application-layer message, M, with transport-layer header H_t to create a transport-layer **segment**


3. **network**: routing of datagrams from source to destination (software and hardware)

   * IP, routing protocols

   * transfers transport-layer segment from one host to another, using link layer services

   * H_n H_t M: **encapsulates** transport-layer segment with network-layer header H_n to create a network-layer **datagram**


4. **link**: data transfer between neighboring network elements (hardware)

   * Ethernet, WiFi, PPP

   * transfers datagram from host to neighboring host, using network-layer services

   * H_l H_n H_t M: **encapsulates** network datagram with link-layer header H_l to create a link layer **frame**


5. **physical**: hits on the wire (hardware)

Seven-layer **Open Systems Interconnection (OSI) model**

1. application layer
2. <u>presentation layer</u>
3. <u>session layer</u>
4. transport layer
5. network layer
6. data link layer
7. physical layer

Switches and routers only implement the <u>lower layers</u> of the protocol stack

* (network)
* link
* physical

## 1.6 Security

Internet not originally designed with security in mind

### Bad Actions

Pack interception: **packet sniffing**

* broadcast media (shared Ethernet, wireless)
* promiscuous network interface reads/records all packets passing by

Fake identity: **IP spoofing**

* injection of packet with false source address

Denial of service: **Denial of Service (DoS)**

* attackers make resources (server, bandwidth) unavailable to legitimate traffic by overwhelming resource with bogus traffic

### Lines of Defense

**authentication**: provide you are who you say you are

* password
* cellular networks provides hardware identity via SIM card

**confidentiality**: via encryption

**integrity checks**: digital signatures prevent/detect tampering

**access restrictions**: password protected VPNs

**firewalls**: specialized "middle boxes" in access and core networks

* off-by-default: filter incoming packets to restrict senders, receivers, applications
* detecting/reacting to DOS attacks