---
title: 5 The Network Layer - the Control Plane
date: 2023-05-15 09:41:00 +0800
categories: [Basic, Computer Network]
tags: [basic]        # lowercase
toc: true
math: true
---

## 5.1 Introduction to the Network-layer control plane

principles behind network control plane

* traditional routing algorithms: link state, distance vector
* SDN controllers
* network management, configuration: SNMP, YANG/NETCONF

instantiation, implementation in the Internet

* OSPF, BGP
* OpenFlow, ODL and ONOS controllers
* Internet Control Message Protocol: ICMP
* SNMP, YANG/NETCONF

<u>per-router control plane</u>

* individual routing algorithm components in each and every router interact in the control plane

<u>Software-Defined Networking (SDN) control plane</u>

* remote controller computes, installs forwarding tables in routers
* (routers don't interact with each other)

## 5.2 Routing Algorithms

goal: determine "good" paths from sending hosts to receiving hosts, through network of routers

* <u>path</u>: sequence of routers packets traverse from given initial source host to final destination host
* <u>good</u>: least cost, fastest, least congested

Routing algorithm classification

* <u>global</u>: all routers have complete topology, link cost info
  * link state algorithms
* <u>decentralized</u>: iterative process of computation, exchange of info with neighbors
  * routers initially only know link costs to attached neighbors
  * distance vector algorithms
* static: routes change slowly over time
* dynamic: routes change more quickly
  * periodic updates or in response to link cost changes

### Dijkstra's Link-state Routing Algorithm

<u>centralized</u>: network topology, link costs known to all nodes

* accomplished via link state broadcast
* all nodes have the same info

computes least cost paths from one node to all other nodes

<u>iterative</u>: after k iterations, know least cost path to k destinations

**Dijkstra's algorithm**

* O(n^2)

* oscillations possible

### Distance Vector

based on <u>Bellman-Ford equation</u>

* let D_x(y) be the cost of least-cost path from x to y

* then
  $$
  D_x(y) = min_v\{c_{x,v}+D_v(y)\}
  $$

key idea

* each node sends its own distance vector estimate to neighbors
* when x receives new DV estimate from any neighbor, it updates its own DV using B-F equation

properties

* <u>iterative</u>, <u>asynchronous</u>: each local iteration caused by

  * local link cost change

  * DV update message from neighbor

* <u>distributed</u>, <u>self-stopping</u>: each node notifies neighbors only when its DV changes

  * neighbors then notify their neighbors - only if necessary
  * no notification received, no actions taken

when <u>link cost changes</u>

* node detects local link cost change
* updates routing info, recalculates local DV
* if DV changes, notify neighbors
* "good news travels fast" (lower link cost)
* "bad news travels slow" (higher link cost) - count-to-infinity problem

### Comparison of LS and DV algorithms

message complexity

* <u>LS</u>: n routers, O(n^2) messages sent
* <u>DV</u>: convergence time varies

speed of convergence

* <u>LS</u>: O(n^2), may have oscillations
* <u>DV</u>: may have routing loops, count-to-infinity problem

robustness: what happens if router malfunctions or is compromised?

* LS
  * router can advertise incorrect <u>link</u> cost
  * each router computes only its own table
* DV
  * DV router can advertise incorrect <u>path</u> cost: black-holing
  * each router's DV is used by others: error propagate through network

## 5.3 Intra-AS Routing in the Internet: OSPF

### Scalable Routing

**scale**: billions of destinations

* can't store all destinations in routing table
* routing table exchange would swamp links

**administrative autonomy**

* Internet: a network of networks
* each network admin may want to control routing in its own network

aggregate routers into regions known as <u>autonomous systems (AS)</u> (a.k.a domains)

**intra-AS** (a.k.a intra-domain): routing among routers within same AS

* all routers in AS must run same intra-domain protocol
* routers in different AS can run different intra-domain routing protocols
* <u>gateway router</u>: at edge of its own AS, has link to router in other AS'es

**inter-AS** (a.k.a inter-domain): routing among AS'es

* gateways perform inter-domain routing as well as intra-domain routing

<u>forwarding table</u> is configured by both intra- and inter-AS routing algorithms

* intra-AS routing determines entries for destinations within AS
* intra- & inter-AS determines entries for external destinations

intra-AS routing protocols

* RIP: Routing Information Protocol
  * classic DV
  * no longer widely used

* **OSPF: Open Shortest Path First**
  * classic link-state routing
* EIGRP: Enhanced Interior Gateway Routing Protocol
  * DV based

### OSPF Routing

open: publicly available

classic link-state

* each router floods OSPF <u>link-state</u> advertisements to all other routers in entire AS (directly over IP rather than using TCP/UDP)
* multiple link costs metrics possible: bandwidth, delay
* <u>each router has full topology</u>, uses Dijkstra's algorithm to compute forwarding table

<u>security</u>: all OSFP messages authenticated

**Hierarchical OSPF**: two-level hierarchy (local area, backbone)

* link-state advertisements flooded only in area, or backbone
* each node has detailed area topology; only knows direction to reach other destinations
* **area border routers** (both in area and backbone)
  * summarize distance to other destinations in own area
  * advertise in backbone
* **local routers** (in area)
  * flood LS in area only
  * compute routing within area
  * forward packets to outside <u>via area border router</u>

* **boundary router** (in backbone): connects to other AS'es
* **backbone router** (in backbone): runs OSPF limited to backbone 

## 5.4 Routing Among the ISPs: BGP

**BGP: Border Gateway Protocol**

* "glue that holds the Internet together"
* allows subnet to advertise its existence, and destinations it can reach, to the rest of the Internet
* provides each AS a means to
  * obtain destination network reachability info from neighboring AS'es (**eBGP**: among two different AS'es)
  * determine routes to other networks based on reachability information and <u>policy</u>
  * propagate reachability information to all AS-internal routers (**iBGP**: in the same AS)
  * **advertise** (to neighboring networks) destination reachability info

### BGP Basics

**BGP session**: two BGP routers ("peers") exchange BGP messages over semi-permanent <u>TCP connection</u>

* advertise <u>paths</u> to different destination network prefixes
* BGP is a "path vector" protocol

**BGP messages**

* <u>OPEN</u>: <u>opens</u> TCP connection to remote BGP peer and authenticates sending BGP peer
* **UPDATE**: <u>advertises</u> new path (or withdraws old)
* <u>KEEPALIVE</u>: keeps connection alive in absence of UPDATES; also ACKs OPEN request
* <u>NOTIFICATION</u>: reports errors in previous msg; also used to <u>close</u> connection

### Path Advertisement (eBGP)

Path attributes and BGP routes

* BGP advertised path: prefix + attributes
  * <u>path prefix</u>: destination being advertised (e.g. /16)
  * attributes
    * <u>AS-PATH</u>: list of AS'es through which prefix advertisement has passed
    * <u>NEXT-HOP</u>: indicates specific internal-AS router to next-hop AS
* **policy-based routing**
  * router receiving route advertisement to destination X uses policy to <u>accept/reject</u> a path (e.g. never route through AS W or country Y)
  * router uses policy to decide whether to advertise a path to neighboring AS Z

BGP path advertisement

* gateway routers may learn about multiple paths to destination

BGP: achieving policy via advertisement

* ISP only wants to route traffic to/from its customer networks
* example
  * x is provider network A's customer network
  * A advertises path A-x to B and C
  * B chooses not to advertise B-A-x to C

### Populating Forwarding Table (iBGP)

**hot potato routing**

* choose local gateway that has least intra-domain cost
* don't worry about inter-domain cost

### Why different Intra-, Inter-AS routing?

**policy**

* inter-AS: admin wants <u>control</u> over how its traffic routed, who routes through its network
* intra-AS: single admin, so policy less of an issue

**scale**: reducing forwarding table size and amount of routing update traffic

* hierarchical routing: limiting the scope of full topological information
* BGP routing to CIDRized destination networks

performance

* inter-AS: <u>policy</u> dominates over performance

* intra-AS: can focus on <u>performance</u>

## 5.6 ICMP: Internet Control Message Protocol

ICMP

* used by hosts and routers to communicate network-level information

  * error reporting: unreachable host, network, port, protocol

  * echo request/reply (used by <u>ping</u>)

* network-layer "above" IP

  * ICMP messages carried in IP datagrams, protocol number: 1

* **ICMP message**: type, code plus header and first 8 bytes of IP datagram causing error

<u>traceroute</u> and ICMP

* source sends sets of UDP segments to destination
  * first set has TTL=1, second set has TTL=2, etc.
* datagram in nth set arrives to nth router
  * router discards datagram and sends source ICMP message
  * IP address of router where TTL expired is source IP address of datagram containing this ICMP message
