---
title: 5 The Network Layer - the Control Plane
date: 2023-05-15 09:41:00 +0800
categories: [Basic, Computer Networking A Top-Down Approach]
tags: [basic]        # lowercase
toc: true
math: true
---

## 5.1 Introduction

principles behind network control plane

* traditional routing algorithms: link state, distance vector
* SDN controllers
* network management, configuration: SNMP, YANG/NETCONF

instantiation, implementation in the Internet

* OSPF, BGP
* OpenFlow, ODL and ONOS controllers
* Internet Control Message Protocol: ICMP
* SNMP, YANG/NETCONF

**Per-router control**

* a routing algorithm component in <u>each</u> and every route
* every router <u>interacts</u> in the control plane
* e.g. OSPF & BGP

**Logically centralized control**

* <u>remote controller</u> computes, installs forwarding tables in routers
* routers <u>don't interact</u> with each other

## 5.2 Routing Algorithms

goal: determine "good" paths from senders to receivers, through the network of routers

* <u>path</u>: sequence of routers packets traverse from given initial source host to final destination host
* <u>good</u>: least cost, fastest, least congested

Routing algorithm

* classification 1
  * **centralized**: all routers have complete, global knowledge about the network
    * including connectivity between nodes and link costs
    * **link-state(LS) algorithms**
  
  * **decentralized**: iterative process of computation, exchange of info with neighbors
    * routers initially only know link costs to attached neighbors
    * distance-vector (DV) algorithms
  
* classification 2
  * **static**: routes change slowly over time
  * **dynamic**: routes change more quickly
  * periodic updates or in response to link cost changes
  
* classification 3
  * **load-sensitive**
  * **load-insensitive**: a link's cost does not explicitly reflect its current level of congestion
  

### The Link-State (LS) Routing Algorithm

**link-state broadcast algorithm**

* each node broadcast link-state packets to all other nodes in the network
* each link-state packet contains the identities and costs of its attached link

**Dijkstra's algorithm**

* computes least-cost paths from one node to all other nodes
* <u>iterative</u>: after k iterations, know least-cost path to k destinations

* complexity: O(n^2)

* oscillations possible

### The Distance-Vector (DV) Routing Algorithm

properties

* **distributed**

  1. each node receives some information from one or more of its directly attached neighbors
  2. calculates, and then
  3. distributes the results back to its neighbors

* **iterative**: continues on until no more information is exchanged between neighbors

* **asynchronous**: does not require all of the nodes to operate with each other

* **self-stopping**

  * neighbors then notify their neighbors - only if necessary

  * no notification received, no actions taken

based on **Bellman-Ford equation**

* let D_x(y) be the cost of least-cost path from x to y

* then
  $$
  D_x(y) = min_v\{c_{x,v}+D_v(y)\}
  $$

**Distance Vector**
$$
D_x=[D_x(y):~~y~~in~~N]
$$
calculation steps

1. initialize each node's distance vector
2. each node sends its own distance vector to its neighbors
3. when receiving new DV estimate from any neighbor, it updates its own DV using B-F equation
4. if DV is changed, send DV to its neighbors

<u>link-cost changes</u>

* node detects local link cost change
* updates routing info, recalculates local DV
* if DV changes, notify neighbors
* "good news travels fast" (lower link cost)
* "bad news travels slow" (higher link cost)
  * count-to-infinity problem
  * avoided using **poisoned reverse**
    * if z routes through y to get to destination x, then z will advertise to y that its distance to x is infinity
    * loop involves three or more nodes will not be detected


### Comparison of LS and DV algorithms

message complexity

* <u>LS</u>: n routers, O(n^2) messages sent
* <u>DV</u>: convergence time varies

speed of convergence

* <u>LS</u>: O(n^2), may have oscillations
* <u>DV</u>: may have routing loops, count-to-infinity problem

robustness: what happens if router malfunctions or is compromised?

* <u>LS</u>
  * router can advertise incorrect link cost
  * each router computes only its own table
* <u>DV</u>
  * DV router can advertise incorrect <u>path</u> cost: black-holing
  * each router's DV is used by others: error propagate through network

## 5.3 Intra-AS Routing in the Internet: OSPF

simplistic in

* **scale**: billions of destinations

  * can't store all destinations in routing table

  * routing table exchange would swamp links


* **administrative autonomy**

  * Internet: a network of networks

  * each network admin may want to control routing in its own network


aggregate a group of routers into regions known as **autonomous systems (AS)** (a.k.a domains)

**intra-AS** (a.k.a intra-domain): routing among routers <u>within</u> the same AS

* all routers in AS must run <u>same</u> intra-domain protocol

  routers in different AS can run different intra-domain routing protocols

* **gateway router**

  * at edge of its own AS
  * has link to router in other ASs

**inter-AS** (a.k.a inter-domain): routing among ASs

* gateways perform inter-domain routing as well as intra-domain routing

<u>forwarding table</u> is configured by both intra- and inter-AS routing algorithms

* intra-AS routing determines entries for destinations <u>within</u> AS
* intra- & inter-AS determines entries for <u>external</u> destinations

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

* each router <u>floods</u> OSPF link-state information to all other routers in entire AS (directly over <u>IP</u> rather than using TCP/UDP)

* multiple link costs metrics possible: bandwidth, delay

  configured by the network administrator

* each router has a complete topological map (uses Dijkstra's algorithm)

advances

* **Security**: all OSFP messages authenticated

* **Multiple same-cost paths**: allow multiple paths to be used

* **Integrated support for unicast and multicast routing**

* **Hierarchical OSPF**: two-level hierarchy (local area, backbone)

  * link-state advertisements flooded only inside its area (or backbone)
    * backbone
      * route traffic between the other areas in the AS
      * contains all area border routers in the AS


  * each node has detailed area topology

    only knows direction to reach other destinations

  * **area border routers** (both in area and backbone)
    * summarize distance to other destinations in own area
    * advertise in backbone

  * **local routers** (in area)
    * flood LS in area only
    * compute routing within area
    * forward packets to outside <u>via area border router</u>


  * **boundary router** (in backbone): connects to other ASs

  * **backbone router** (in backbone): runs OSPF limited to backbone 


## 5.4 Routing Among the ISPs: BGP

**BGP: Border Gateway Protocol**

* "glue that holds the Internet together"
* a router's forwarding table have entries of the form *(x, I)*
  * x: a prefix
  * I: an interface number for one of the router's interface

* provides each AS a means to
  * **obtain** prefix reachability info from neighboring ASs (**eBGP**: among two different AS'es)
  * **determine** the " best" routes to other networks based on reachability information and policy
  * **propagate** reachability info to all AS-internal routers (**iBGP**: in the same AS)
  * **advertise** (to neighboring networks) destination reachability info

### Advertising BGP Route Information

**BGP connection**: two BGP routers ("peers") exchange BGP messages over semi-permanent <u>TCP connection</u>

* advertise <u>paths</u> to different destination network prefixes
* **external BGP (eBGP)**: a BGP connection that spans two ASs
* **internal BGP (iBGP)**: a BGP connection between routers in the same AS

**BGP messages**

* **OPEN**: opens TCP connection to remote BGP peer and authenticates sending BGP peer
* **UPDATE**: <u>advertises</u> new path (or withdraws old)
* **KEEPALIVE**: keeps connection alive in absence of UPDATES; also ACKs OPEN request
* **NOTIFICATION**: reports <u>errors</u> in previous msg; also used to <u>close</u> connection

### Determining the Best Routes

**route** = prefix + **BGP attributes**

* **AS-PATH**: list of ASs through which the prefix advertisement has passed
  * can detect and prevent looping advertisements
* **NEXT-HOP**: the IP address of the router interface that begins the AS-PATH
  * does not belong to AS1
  * directly attaches to AS1

#### Populating Forwarding Table (iBGP)

**hot potato routing**

* steps
  1. find the least-cost intra-AS path to <u>NEXT-HOP</u>
  2. consult its forwarding table and find the interface I that is on the least-cost path to the chosen NEXT-HOP
  3. add (x, I) to its forwarding table
* reduce the cost in its own AS while ignoring the other components of the end-to-end costs outside its AS

#### Route-Selection Algorithm

BGP sequentially invokes the following elimination rules until one route remains
1. **local preference**: determined by the network administrator
2. the shortest AS-PATH
3. hot potato routing (the closest NEXT-HOP)
4. BGP identifiers

#### Policy-based Routing

routers use policy to

* <u>accept/reject</u> a path (e.g. never route through AS W or country Y)

* to decide whether to advertise a path to neighboring AS Z

BGP: achieving policy via advertisement

* ISP only wants to route traffic to/from its customer networks
* example
  * x is provider network A's customer network
  * A advertises path A-x to B and C
  * B chooses not to advertise B-A-x to C

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

## 5.5 The SDN Control Plane

SDN control plane: the network-wide logic that controls packet forwarding among a network's SDN

* **Flow-based forwarding**: compute, manage and install flow table entries in all of the network's switches
* **Separation of data plane and control plane**
  * the data plane consists of network's switches
  * the control plane consists of servers and software
* **Network control functions: external to data-plane switches**: the software executes on servers that are both distinct and remote from the network's switches
* **A programmable network**
* SDN represents a significant unbundling of network functionality: <u>data plane switches, SDN controller, network-control applications</u>

<u>packet switches</u>: network's forwarding devices

### SDN Controller and SDN Network-control Applications

controller's functionality

* **A communication layer**: communicating between the <u>SDN controller</u> and <u>controlled network devices</u> (OpenFlow)
  * SDN controller control the <u>operation</u> of the network devices
  * a device communicate <u>locally-observed events</u> to the controller
* **A network-wide state-management layer**
  * the state of the network devices
  * counters in the flow tables
  * a copy of these flow tables
  * ...
* **The interface to the network-control application layer** (APIs)

### OpenFlow Protocol

operates between an <u>SDN controller</u> and <u>SDN-controlled switch</u>

messages from the controller to the switch

* **Configuration**: query and set a switch's configuration parameters
* **Modify-State**: add/delete or modify entries in the flow table
* **Read-State**: collect statistics and counter values from the flow table
* **Send-Packet**: send a specific packet out of a special port

messages from the switch to the controller

* **Flow-Removed**: a flow table entry has been removed
* **Port-status**: a change in port status
* **Packet-in**

## 5.6 ICMP: The Internet Control Message Protocol

**ICMP**

* used by <u>hosts and routers</u> to communicate network-level information

  * error reporting: unreachable host, network, port, protocol

  * echo request/reply (used by <u>ping</u>)

* network-layer "above" IP

  * ICMP messages are carried as IP payload

* **ICMP message**: type, code plus header and first 8 bytes of IP datagram causing error

**traceroute** and ICMP

* source sends sets of UDP segments to destination
  * first set has TTL=1, second set has TTL=2, etc.
* datagram in nth set arrives to nth router
  * router <u>discards</u> datagram and <u>sends</u> source ICMP message
  * IP address of router where TTL expired is source IP address of datagram containing this ICMP message

## 5.7 Network Management and SNMP

### The Network Management Framework

key components

* **managing server** (application): control the collection, processing, analysis and display of network management information
* **managed device**
* **Management Information Base (MIB)**: collects information related to the managed devices
* **network management agent**: a process running in the managed device that communicates with the managing server, taking local actions at the managed device under terhe command and control of the managing server
* **network management protocol**: runs between the managing server and the managed devices, allowing the managing server to query the status of managed devices and indirectly take actions at theses devices via its agent

### The Simple Network Management Protocol (SNMP)

SNMP: an application-layer protocol used to convey network-management control and information messages between a managing server and an agent

* request-response mode
  * SNMP managing server sends a request to an SNMP agent
  * the agent sends a reply to the request
* query or modify MIB object values associated with a managed device
* notify a managing server of an exceptional situation
