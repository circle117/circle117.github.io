---
title: 1 Computer Networks and the Internet
date: 2023-01-31 15:06:00 +0800
categories: [Basic, Computer Network]
tags: [basic]        # lowercase
toc: true
---

## 1.1 What is the Internet & What is Protocols

### The Internet: a nuts-and-bolts view

**Network Edge**: Billions of connected computing devices

* **hosts**/end systems: clients and servers
* run network apps
* servers often in the data center

**Packet switches**

* forward packets (chunks of data)
* two types: routers, switches

**Access networks, physical media**

* wired, wireless communication links: fiber, copper, radio, satellite

* transmission rate: bandwidth

**Network core**

* interconnected routers
* **Internet: "network of networks"**
* managed by an organization

**Protocols** are everywhere

* control sending and receiving of messages
* Internet standards

### The Internet: a "service"‘s view

**Infrastructure** that provides services to applications

### Protocols

Human protocols

* example: Request & Reply; multi-step questions & answers

* rules: specific messages sent, specific actions taken when message received

Network protocols

Protocols define the **format**, **order** of **messages sent and received** among network entities, and **actions** taken on msg transmission, receipt

## 1.2 The Network edge

### Access Networks

connect end systems to edge router (3 types)

* <u>residential</u> access networks
* <u>institutional</u> access networks (school company)
* <u>mobile</u> access networks (WiFi, 4G/5G)

2 things about access networks

* <u>transmission rate</u> (bit per second) of access network
* <u>shared</u> or <u>dedicated</u> access among users

#### cable-based access

(homes) cable modem - cable - cable headend - Internet Service Provider (ISP)

* **frequency division multiplexing (FDM)**: different channels transmitted in different frequency bands

* HFC: hybrid fiber coax
  * asymmetric
    * downstream transmission rate: 40Mbps - 1.2Gbs
    * upstream transmission rate: 30 - 100Mbps
* network of cable, fiber attaches homes to ISP router
  * home **shares access network** to cable headend

#### Digital Subscriber Line (DSL)

(home) DSL modem - central office (DSLAM) - ISP

* use existing telephone line to central office (DSLAM)
* dedicated downstream transmission rate: 24-52Mbps
* dedicated upstream transmission rate: 3.5-16Mbps

#### Home networks

headend/central office - cable or DSL modem - router, firewall, NAT - 

* wired Ethernet
* WiFi wireless access point
* wireless and wired devices

#### Wireless Access Networks

 shared wireless access network connects end systems to router

* via base station (access point)

Wireless Local Area Networks (WLANs)

* typically within or around building

Wide-area cellular access networks

* provided by mobile, cellular network operator (10 km)
* 4G/5G cellular

#### Enterprise networks

companies, universities, etc

mixed of wired, wireless link technologies, connecting a mix of switches and routers

#### Data center networks

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

mesh of interconnected routers

**Packet-switching**: hosts break application-layer messages into **packets**

* network <u>forwards</u> packets from one router to the next, across links on path <u>from source to destination</u>

### Two Key Network-core Functions

**Forwarding** (aka switching)

* <u>local</u> action: move arriving packets from router's input link to appropriate router output link
* controlled by local forwarding table based on destination address in arriving packet's header

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

### Circuit-witching (Alternative to packet-switching)

end-end resources allocated to, reserved for "call" between source and destination (queuing never occurs)

* <u>dedicated</u> resources (no sharing)
* circuit segment <u>idle</u> if not used by call
* commonly used in traditional telephone networks

FDM and TDM

* **Frequency Division multiplexing (FDM)**
  * divided into narrow frequency bands
  * each call allocated its own band, can transmit at max rate of that narrow band
* **Time Division Multiplexing (TDM)**
  * time divided into slots
  * each call allocated periodic slot(s), can transmit at maximum rate of (wider) frequency band during its time slot

### Packet-switching Versus Circuit-switching

packet-switching is great for "bursty data"

**excessive congesting possible**: packet delay and loss due to buffer overflow

* <u>protocols</u> needed for reliable data transfer, congestion control

### Internet Structure: a "Network of Networks"

connect millions of access network

* global transit ISPs

At center: small of well-connected large networks

* "tier 1" commercial ISPs
* content provider networks (Google, Facebook)

* **Internet Exchange Point (IXP)**
* regional ISP
* access ISP

## 1.4 Network Performance: delay, loss, throughput

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

* d_{proc}: processing delay

  * check bit errors
  * determine output link
  * typically < microsecs

* d_{queue}: queueing delay

  * time waiting at output link for transmission

  * depends on congestion level of router

  * traffic intensity

    * a: average packet arrival delay

    * L: packet length (bits)

    * R: link bandwidth

    * $$
      \frac{L\cdot a}{R} = \frac{arrival~rate~of~bits}{service~rate~of~bits}
      $$

      ~0: small

      ->1: large

      \> 1: infinite

* d_{trans}: transmission delay

  * L: packet length (bits)
  * R: link transmission rate (bps)
  * d_{trans} = L/R

* d_{prop}: propagation delay

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

Rs for link one, and Rc for link two, average end-end throughput

* Rs < Rc, Rs
* Rs > Rc, Rc
* **bottleneck link**: thinner one

### Throughput: Network Scenario

10 connections share backbone link R bits/sec

* per-connection end-end throughput: min(Rs, Rc, R/10)

* in practice: Rc or Rs is smaller than R/N, bottleneck link is <u>at network edge</u>

## 1.5 Layering, Encapsulation, Service models

an example of airline systems

### Architectural Layering

**layers**: each layer implements a service

* via its own internal-layer actions
* relying on services provided by layer below

Why Layering?

* Explicit structure allows identification, relationship of system's pieces
* modularization eases maintenance, updating of system
  * change in layer's service implementation transparent to rest of system (doesn't affect rest of the system)

### Internet Layers

**application**: supporting network application

* HTTP, IMAP, SMAP, DNS
* exchanges <u>messages</u> to implement some application service using services of transport layer
* M

**transport**: process-process data transfer

* TCP, UDP
* transfers M from one process to another, using services of network
* H_t M: **encapsulates** application-layer message, M, with transport layer-layer head H_t to create a transport-layer **segment**

**network**: routing of datagrams from source to destination

* IP, routing protocols
* transfers transport-layer segment from one host to another, using link layer services
* H_n H_t M: **encapsulates** transport-layer segment with network layer-layer head H_n to create a network-layer **datagram**

**link**: data transfer between neighboring network elements

* Ethernet, WiFi, PPP
* transfers datagram from host to neighboring host, using network-layer services
* H_l H_n H_t M: **encapsulates** network datagram with link-layer header H_l to create a link layer **frame**

**physical**: hits on the wire

### Encapsulation

Switches only implement the lower layers of the protocol stack

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