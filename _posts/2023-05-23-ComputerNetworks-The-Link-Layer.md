---
title: 6 The Link Layer
date: 2023-05-23 14:08:00 +0800
categories: [Basic, Computer Network]
tags: [basic]        # lowercase
toc: true
math: true
---

## 6.1 Introduction to the Link Layer

### goals

understand <u>principles</u> behind link layer services

* error detection, correction
* sharing a broadcast channel: multiple access
* link layer addressing

<u>practice</u>: instantiation, implementation of various link layer technologies

* Ethernet
* VLANS
* MPLS
* data center networks

### terminology

**Link layer** has responsibility of transferring datagram from one node to **physically adjacent** node over a link

* hosts, routers: <u>nodes</u>

* communication channels that **directly** connect **physically adjacent** nodes: <u>links</u>

  * wired, wireless
  * LANs

  * How are interfaces actually connected

    * wired Ethernet interfaces connected by Ethernet switches

    * wireless WiFi interfaces connected by WiFi base station

* layer-2 packet: <u>frame</u>, encapsulates datagram

### context

datagram transferred by different link protocols over different links, e.g.

* WiFi on first link
* Ethernet on next link

each link protocol provides different services, e.g.

* may or may not provide reliable data transfer over link

### services

**framing, link access**

* <u>encapsulate</u> datagram into frame, adding header, trailer
* channel access if shared medium
* MAC address in frame headers identify source, destination

**reliable delivery between adjacent nodes**

* seldom used on low bit-error links
* wireless links: high error rates

**flow control**

* pacing between adjacent sending and receiving nodes

**error detection**

* errors caused by signal attenuation noise
* receiver detects errors, signals retransmission or drops frame

**error correction**

* receiver identifies and corrects bit error without retransmission

**half-duplex and full duplex**

* with half duplex, nodes at both ends of link can transmit, but not at the same time

### Host Link-layer Implementation

* in each-and every host
* link layer implemented on chip or in network interface card (NIC)
  * implements link, physical layer
* attaches into host's system buses
* combination of hardware, software, firmware

### Interfaces Communication

sending side

* encapsulates datagram in frame
* adds error checking bits, reliable data transfer, flow control, etc

receiving side

* looks for errors, reliable data transfer, flow control, etc
* extracts datagram, passes to upper layer at receiving side

## 6.2 Error-Detection and -Correction Techniques

### Simple Parity Checking

sender: **single bit parity**

* detect single bit errors
* <u>Even parity</u>: set parity bit so there is an even number of 1's

receiver

* compute parity of d+1 received bits, if not even, then error detected
* can detect <u>odd</u> number of bit flips

two-d parity

* row parity
* column parity
* detect two-bit errors
* detect and <u>correct single bit errors</u> without retransmission
  * one parity error in row and another in column

### Internet Checksum

goal: detect errors in transmitted segment

sender

* treat contents of UDP segment as sequence of 16-bit integers
* <u>checksum</u>: addition of segment content
* checksum value put into UDP checksum field

receiver

* compute checksum of received segment
* check if computed checksum equals checksum field value
  * not equal - error detected
  * equal - no error detected. But maybe errors nonetheless?

### Cyclic Redundancy Check (CRC)

CRC

* more powerful error-detection coding

* D: data bits (given, think of these as a binary number)

* G: bit pattern (generator), of r+1 bits (given, specified in CRC standard)

* R: r CRC bits

* bits to send: D+R

* <D,R> = D*2^r XOR R

  * $$
    R = remainder[\frac{D\cdot 2^r}{G}]
    $$

sender: compute r CRC bits, R, such that <D,R> exactly divisible by G

* receiver knows G, divides <D, R> by G. if non-zero remainder: error detected
* can detect all burst error less than r+1 bits
* widely used in practice (Ethernet, 802.11 WiFi)

## 6.3 Multiple Access Links and Protocols

### The Multiple Access Link

two types of links

* <u>point-to-point</u>
  * point-to-point link between Ethernet switch, host
  * PPP for dial-up access
* **<u>broadcast</u>** (shared wire or medium)
  * old-school Ethernet
  * upstream HFC in cable-based access network
  * 802.11 wireless LAN, 4G/5G, satellite

### Multiple Access Protocols

* single shared broadcast channel
* two or more simultaneous transmissions by nodes: interference
  * <u>collision</u> of node received two or more signals at the same time
* challenges
  * distributed algorithm that determines how nodes share channel, determine when node can transmit
  * communication about channel sharing must use channel itself

#### An Ideal Multiple Access Protocol

given: multiple access channel (MAC) of rate R bps

desiderate

* when one node wants to transmit, it can send at rate R
* when M nodes want to transmit, each can send at average rate R/M
* fully decentralized
  * no special node to coordinate transmissions
  * no synchronization of clocks, slots
* simple

taxonomy: three broad classes

* **channel partitioning**
  * divide channel into smaller pieces (time slots, frequency, code)
  * <u>allocate</u> piece to node for <u>exclusive use</u>
* **random access**
  * channel not divided, <u>allow collisions</u>
  *  recover from collisions
* **taking turns**
  * nodes take turns, but nodes with more to send can take longer turns

#### Channel Partitioning MAC Protocols

TDMA: time division multiple access

* access to channel in rounds
* each station gets <u>fixed length slot</u>
* unused  slots go <u>idle</u>

FDMA: frequency division multiple access

* channel spectrum divide into <u>frequency bands</u>
* each station assigned fixed frequency band
* unused transmission time in frequency bands go <u>idle</u>

#### Random Access Protocols

random access protocols

* when node has packet to send
  * transmit full channel data rate R
  * <u>no</u> a priori <u>coordination</u> among nodes
* 2+ sending nodes: collisions
* random access protocols specifies
  * when to send
  *  how to detect collisions
  * how to recover from collisions (e.g. via delayed retransmissions)
* examples
  * ALOHA
  * CSMA, CSMA/CD, CSMA/CA

Slotted ALOHA

* allow collision to happen (and then recover via retransmission)
* use **randomization** in choosing when to retransmit
* the setting
  * all frames are of the same size
  * time divided into equal size slots
  * nodes are synchronized
  * nodes begin transmissions at slot start times
  * if 2 or more nodes transmit in slot, <u>collision detected by senders</u>
* operation
  * when node has new frame to send, transmit in next slot
    * <u>if no collision</u>: success
    * <u>if collision</u>: node retransmits frame in each subsequent slot <u>with probability p</u> until success (hope only retransmit one frame in the next slot)
* pros
  * single active node can <u>continuously transmit</u> at full rate of channel
  * <u>highly decentralized</u>: only slots in nodes need to be in sync
  * <u>simple</u>
* cons
  * synchronization
  * collisions, wasting slots
  * idle slots, wasting slots
* max efficiency: 1/e = 0.37

CSMA: Carrier Sense Multiple Access

* **simple CSMA**: listen before transmit

  * if channel sensed idle: transmit entire frame
  * if channel sensed busy: defer transmission

* **CSMA/CD**: CSMA with collision detection

  * collisions detected within short time
  * colliding transmissions aborted, reducing channel wastage
  * collision detection easy in wired, difficult with wireless

* collisions can <u>still occur</u> with carrier sensing

  * propagation delay means two nodes may not hear each other's just-started transmission

* Ethernet CSMA/CD algorithm

  1. Ethernet received datagram from network layer, creates frame

  2. If Ethernet senses channel

     * if idle: start frame transmission
     * if busy: wait until channel idle, then transmit

  3. If entire frame transmitted without collision - done

  4. If another transmission detected while sending: abort, send jam signal

  5. After aborting, enter <u>binary (exponential) backoff</u>

     * after m-th collision, chooses K at random from {0,1,2,...,2^m-1}

       waits K*512 bit times, returns to step 2

     * more collisions: longer backoff interval

#### Taking Turns MAC Protocols

channel partitioning MAC protocols

* share channel efficiently and fairly at high load
* <u>inefficient at low load</u>

random access MAC protocols

* <u>efficient at low load</u>: single node can fully utilize channel
* high load: collision overhead

**taking turn protocols**: try to get best of both

* channel allocated explicitly (no collisions)
* nodes won't hold channel for long if nothing to send
* two approaches: polling, token passing

**polling**

* centralized controller uses polling messages to invite client nodes to transmit in turn
* protocol needed for client devices to join/leave network
* Bluetooth uses polling

**token passing**

* control token message explicitly passed from one node to next, sequencially
  * transmit while holding token

##  6.4 Switched Local Area Networks

use link-layer addresses to forward link-layer frames

### Link-layer Addressing

MAC addresses (a.k.a LAN addresses or physical addresses)

* <u>adapters</u> (network interfaces in hosts and routers) has MAC address
  * one adapter has one <u>6-byte</u>, <u>unique</u>, <u>fixed</u> (but can be changed by software) MAC address
* each router interface has an IP address and a MAC address
* **MAC broadcast address**: in Ethernet and 802.11 it is FF-FF-FF-FF-FF-FF

>Why MAC address? Keep the layers independent
>
>1. adapters can support different network-layer protocols
>2. can be stored in ROM, and don't need to be reconfigured
>
>host names for the application layer, IP addresses for the network layer, MAC addresses for the link layer

Address Resolution Protocol (ARP): translate IP addresses to link-layer addresses

* to send a datagram, the source must give its adapter both the destination IP address and MAC address

  **ARP module** in the sending host translates it.

  * resolves IP addresses only for hosts and router interfaces <u>on the same subnet</u>

* each host and router has an **ARP table** in its memory

  * TTL is used to be 20 minutes
  * not contain an entry for every host and router on the subnet

* <u>get an entry</u> that isn't in the ARP table

  1. sender construct an **query ARP packet**
     * include the sending and receiving IP and MAC addresses
     * both query and response packet has the same format
  2. the sender's adapter send the packet to <u>the MAC broadcast address</u>
  3. each adapter on the subnet passes the packet to <u>its ARP module</u>
  4. ARP module <u>check</u> if it matches
  5. The one with a match sends back a **response ARP packet**

* properties

  * query ARP message - in a broadcast frame

    response ARP message - in a standard frame

  * plug-and-play (built automatically)

  * a protocol that straddles the boundary between the link and network layer

### Ethernet Protocol

Ethernet Frame Structure

* **Cyclic redundancy check (CRC)** (4 bytes)
* **Data field** (46 to 1,500 bytes): carries the IP datagram
* **Destination address** (6 bytes): the MAC address of the destination adapter
* **Source address** (6 bytes): the MAC address of the source adapter
* **Type field** (2 bytes): permits Ethernet multiplex network-layer protocol
* **Preamble** (8 bytes)
  * each of the first 7 bytes of the preamble has a value of 10101010, the last byte is 10101011
  * wake up the receiving adapters and synchronize their clocks

Ethernet properties

* provide <u>connectionless</u> service to the network layer (without handshaking while sending frames)
* <u>unreliable</u>: don't send ACK or NACK, simply discard the frame that fails the CRC check
  * if use UDP: see gaps in the data
  * if use TCP: retransmit

> modern switches are full-duplex. in a switch-based Ethernet LAN there are no collisions and no need for a MAC protocol.
>
> But Ethernet is still necessary. Its frame format remains unchanged.

### Link-layer Switches

function: receive incoming link-layer frames and forward them into outgoing links

**transparent** to the hosts and routers: unaware that a switch will be receiving the frame and forwarding it

#### Forwarding and Filtering

**Filtering**: determines whether a frame should be forwarded to some interface or just be dropped

**Forwarding**: determines the interfaces to which a frame should be directed

**switch table** (for filtering and forwarding)

* contains entries for <u>some of</u> the hosts and routers on a LAN
* entry contains
  * a <u>MAC address</u>
  * the switch <u>interface</u> that leads toward that MAC address
  * the <u>time</u> at which the entry was placed in the table

How switch filtering and forwarding work

* <u>no entry</u>: broadcast the frame
* <u>an entry associating the destination MAC address with the coming interface</u>: discard
* <u>an entry associating the destination MAC address with the other interface</u>: forward

#### Self-learning

steps

1. The switch table is initially empty
2. For each incoming frame received on an interface, stores its
   * MAC address in the frame's source address field
   * interface
   * the current time
3. delete an address after some period of time (<u>the aging time</u>)

switches are **plug-and-play and full-duplex devices**

#### Properties of Link-Layer Switching

features and properties

* **Elimination of collisions**: no wasted bandwidth due to collisions, buffer frames
* **Heterogeneous links**: different links can operate different speeds and run over different media
* **Management**: ease network management, gather statistics

#### Switched Versus Routers

Both switches and routers are candidates for interconnection devices.

switches (layer-2 packet switch)

* pros
  * plug-and-play
  * relatively high filtering and forwarding rates
* cons
  * topology is restricted to a spanning tree
  * require large ARP tables
  * susceptible to broadcast storms

routers (layer-3 packet switch)

* pros
  * can use the best path between source and destination (do not have the spanning tree restriction)
  * firewall protection against layer-2 broadcast storm
* cons
  * not plug-and-play
  * larger per-packet processing time

Small networks (hundreds of hosts): switches

Larger networks (thousands of hosts): routers

### Virtual Local Area Networks (VLANs)

<u>drawbacks</u> of configured hierarchically institutional LANs

* **lack of traffic isolation**: broadcast frames must traverse the entire institutional network
* **inefficient use of switches**
* **managing users**: the physical cabling must be changed, if an employee moves between groups

can be handled by a switch that supports **virtual local area networks (VLANs)**

* allows <u>multiple virtual</u> local area networks to be defined over <u>a single physical</u> local area network infrastructure
* a network manager
  * divides the ports into groups
  * reconfigure the VLAN software to manage users
* traffic between different VLANs of the same physical switch
  * connect a VLAN switch port to an <u>external router</u> (a device that has both a VLAN switch and a router)
  * configure the port to belong both VLANs

**VLAN trunking**: interconnect two VLAN switches

* a 4-byte **VLAN tag** used for identifying the VLAN

VLAN

* port-based VLAN
* MAC-based VLAN
* network-layer-based VLAN

## 6.5 Link Virtualization: A Network as a Link Layer

 Multi-protocol Label Switching (MPLS): a packet-switched, virtual-circuit network

* can be considered as a link-layer technology that serves to interconnect IP devices

### MPLS: Multi-protocol Label Switching

goal: augment the destination-based IP datagram-forwarding infrastructure by selectively <u>labeling</u> datagrams and allowing routers to <u>forward</u> datagrams <u>based on fixed-length labels</u> when possible

MPLS

* **MPLS header**: between the layer-2 header and layer-3 header

  * can only be send between MPLS-capable routers (**label-switched router**)

* perform switching based on labels, don't need the IP address ->

  provides the ability to forward packets along <u>routes</u> that would not be possible using standard IP routing protocols

* perform fast <u>restoration</u> of MPLS forwarding paths

* used to implement virtual private networks (VPN)

## 6.6 Data Center Networking

a data center

* **hosts**
  * serve content, store e-mails and documents and perform massively distributed computations
  * stacked in racks, with each rack having 20 to 40 **blades** (hosts)
  * **Top of Rack (TOR) switch**
    * at the top of the tack
    * interconnect the hosts in the rack with each other and with other switches in the data center
* **border routers**
  * handle flows between <u>external clients</u> and <u>internal hosts</u>

### Load Balancing

each application is associated with a publicly visible IP address

* to which clients send their <u>requests</u>
* from which clients receive <u>responses</u>

**load balancer**: to distribute requests to the hosts and relays the response back

* <u>layer-4 switch</u>: makes decisions based on the destination port number (layer 4) and destination IP address
* function
  * <u>balance the work load</u> across hosts
  * provide a <u>NAT-like</u> function: translate the public external IP address to the internal IP address of the certain host

### Hierarchical Architecture

hierarchy of routers and switches

* the border router connects to <u>access routers</u>
* access routers connects to many tiers of switches

include redundant network equipment and redundant links

suffers from limited host-to-host capacity

## 6.7 Retrospective: A Day in the Life of a Web Page Request

download a web page of www.google.com

### Getting Started: DHCP, UDP, IP, and Ethernet

laptop: run the <u>DHCP protocol</u> to <u>obtain an IP address</u> from the local DHCP server

1. <u>DHCP</u>: The OS creates a **DHCP request message**

   DHCP message -> **UDP segment** with destination port 67 (DHCP server) and source port 68 (DHCP client) -> **IP datagram** with broadcast IP destination address 255.255.255.255 and source IP address 0.0.0.0

2. <u>Ethernet</u>: The IP datagram is placed within an **Ethernet frame**, destination MAC address FF:FF:FF:FF:FF:FF (<u>broadcast</u>), source MAC address is the laptop's MAC address

3. the Ethernet switch broadcast the incoming frame

4. The router **demultiplex** the payload, gets the DHCP request message and gives it to the DHCP server (inside the router)

5. The DHCP server creates a **DHCP ACK message** containing (**CIDR**)

   * the IP address 68.85.2.101
   * the IP address of the DNS server 68.87.71.226
   * the IP address for the default gateway router 68.85.2.1
   * the subnet block 68.85.2.0/24

   DHCP message -> UDP segment -> IP datagram -> Ethernet frame

6. The router sends the frame to the switch

   The switch sends it to the output port leading to the laptop (known by **self-learning**)

7. DHCP client in the laptop records the IP address and the IP address of its DNS server

   installs the address of the default gateway into its **IP forwarding table** (send all datagrams with destination address outside of its subnet 68.85.2.0/24 to it)

### Still Getting Started: DNS and ARP

web browser: create a **TCP socket** that will be used to send the **HTTP request** to www.google.com (need to know its IP address)

8. The OS creates a **DNS query message**

   DNS message -> UDP segment with destination port 53 (<u>DNS server</u>) -> IP datagram with destination IP address of the DNS server

9. placed in an Ethernet frame which is sent to the gateway router, thus need to use the **ARP protocol** to obtain the MAC address of the gateway router

10. laptop creates an ARP query message with a target IP address of 68.85.2.1

    ARP message -> Ethernet frame

11. The gateway router receives the frame and finds that the target IP address matches the IP address of its interface

    The gateway router prepares an **ARP reply** indicating its MAC address

    ARP message -> Ethernet frame -> switch ->laptop

12. laptop extracts the MAC address

13. laptop can address the Ethernet frame containing the DNS query to the gateway router's MAC address

### Still Getting Started: Intra-Domain Routing to the DNS server

14. The gateway router receives the DNS query

    looks up the destination address and determines from its forwarding table which link to choose

15. The router in the Comcast network receives the frame

    determines the outgoing interface from its forwarding table which is filled in by Comcast's intra-domain protocol (RIP, OSPF or IS-IS) as well as the **Internet's inter-domain protocol, BGP**

16. the DNS query arrives at the DNS server

    The DNS server looks up the name www.google.com in its DNS database and finds the DNS resource record that contains the IP address

    forms a **DNS reply message** containing the hostname-to-IP-address mapping

    DNS reply message -> UDP segment -> IP datagram -> school's router -> Ethernet switch -> laptop

17. laptop extracts the IP address of the server from the DNS message

    ready to contact the www.google.com

### Web Client-Server Interaction: TCP and HTTP

18. laptop can create  the **TCP socket** that will be used to send the **HTTP GET** message to www.google.com

    * need to perform a **three-way handshake** with the TCP in www.google.com

    a TCP SYN segment with destination port 80 (for HTTP) -> IP datagram with a destination IP address of google -> frame with a destination MAC address of the gateway router

    sends the frame to the switch

19. forward the datagram toward google

20. TCP SYN is received

    a connection socket is created for the TCP connection between the Google HTTP server and the laptop

    a TCP SYNACK segment is generated and sent

21. The datagram is forwarded through the Google, Comcast, and school networks, eventually arriving at the Ethernet card in the laptop

22. the socket on the laptop is ready to send bytes to www.google.com

    creates the HTTP GET message containing the URL

23. HTTP server at www.google.com reads the message

    creates  an HTTP response message and places the Web page content in the body of the HTTP response message

    sends the message into the TCP socket

24. laptop extracts the html for the Web page from the body of the HTTP response and displays

