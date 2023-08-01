---
title: 3 The Transport Layer
date: 2023-03-07 16:43:00 +0800
categories: [Basic, Computer Networking A Top-Down Approach]
tags: [basic]        # lowercase
toc: true
math: true
---

## 3.1 Introduction

principles

* multiplexing, demultiplexing
* reliable data transfer
* flow control
* congestion control

internet transport layer protocols

* **UDP**: connectionless
* **TCP**: reliable, flow- and congestion-controlled connection-oriented transport

transport vs. network layer services and protocols

* **network layer**: logical communication between <u>hosts</u>
* **transport layer**: logical communication between <u>processes</u>
  * <u>rely on</u>, <u>enhance</u> network layer services

Two principle Internet transport protocols

* **TCP**: Transmission Control Protocol
  * reliable, in-order delivery
  * congestion control
  * flow control
  * connection setup
* **UDP**: User Datagram Protocol
  * unreliable, unordered delivery
* services both available
  * error checking
  * process-to-process data delivery
  
* services <u>not available</u>
  * <u>delay</u> guarantees
  * <u>bandwidth</u> guarantees

## 3.2 Multiplexing and Demultiplexing

<u>multiplexing at sender</u>: handle data from multiple sockets, add transport header (for demultiplexing)

<u>demultiplexing at receiver</u>: use header info to deliver received segments to correct sockets

how demultiplexing work

* hosts received IP datagrams
  * source IP address, destination IP address, transport-layer segment(including source, destination port number)


* host uses <u>IP addresses & destination port numbers</u> to direct segment to appropriate socket

### Connectionless Multiplexing and Demultiplexing

when a UDP socket is created

* the transport layer <u>automatically assigns</u> a port number to the socket
* or we can <u>associate</u> a specific port number to the socket.

steps

1. Host A <u>creates a transport-layer segment</u> that includes
   * the application data
   * the source port number (return address)
   * the destination port number
   * two other values
2. the network layer of the Host A encapsulates the segment in an <u>IP datagram</u>
3. Host B <u>examines the destination port number</u> and delivers the segment to its socket
   * demultiplexing is only based on the destination port number

UDP socket is fully identified by a <u>2-tuple</u>

* destination IP address
* destination port number

### Connection-oriented Multiplexing and Demultiplexing

TCP socket is identified by a <u>4-tuple</u>
* source IP address
* source port number
* destination IP address
* destination port number

demultiplexing: receiver uses <u>all four values</u> to direct segment to appropriate socket

server may support many <u>simultaneous</u> TCP sockets

> Web servers often uses only one process, and create a  new thread with a new connection socket for each new client connection

## 3.3 Connectionless Transport: UDP

"No frills", "bare bones" Internet transport protocol

* only multiplexing/demultiplexing function and some light error checking

UDP segments may be: <u>lost</u>, delivered <u>out-of-order</u>

connectionless

* no handshaking
* each UDP segment handled <u>independently</u>

Why is there a UDP

* **no connection establishment**: does not introduce any delay to establish a connection
* **no connection state**: support many more active clients
* **small header size**
* **no congestion control**

UDP use

* <u>DNS</u> (avoid connection-establishment delays)
* <u>SNMP</u> (network management)
* <u>multimedia applications</u> (both TCP and UDP)
* <u>QUIC protocol</u> (Quick UDP Internet Connection)

if reliable transfer needed over UDP

* add needed reliability at application layer
* add congestion control at application layer

### UDP Sender/Receiver Actions

UDP sender actions

* <u>passes</u> an application-layer message (e.g. SNMP message)
* determines UDP segment <u>header fields value</u>
* creates UDP <u>segment</u>
* <u>passes</u> segment to network layer

UDP receiver actions

* <u>receives</u> segment from IP
* <u>checks</u> UDP checksum header value
* <u>extracts</u> application-layer message
* <u>demultiplexes</u> message up to application via socket

### UDP Segment Format

32 bits

* source port #

  destination port #

* length (in bytes of UDP segment, including header)

  checksum

* application data (payload)

### UDP Checksum

goal: detect errors in transmitted segment

* sender: calculate the **checksum**
  * treat contents of UDP segment as sequence of 16-bit integers
  * <u>addition</u> of segment content (if overflow, wrap around)
  * its 1s complement
  * put the result into UDP checksum field
* receiver
  * all 16-bit words are added
    * all 1 - no error detected (errors may still exist)
    * 0 exists - error detected

## 3.4 Principles of Reliable Data Transfer

sender-side/receiver-side of reliable data transfer protocol

* Complexity of reliable data transfer protocol will <u>depend strongly on characteristics</u> of unreliable channel (can it lose, corrupt, reorder data?)
* Sender, receiver <u>do not know the state</u> of each other, unless communicated via a message

### Building a Reliable Data Transfer Protocol

#### RDT 1.0: Reliable Data Transfer over a Reliable Channel

<u>reliable</u> underlying channel

* no bit errors
* no loss of packets

separate <u>FSMs (finite state machine)</u> for sender and receiver (just send and receive)

* sender (wait for call from above) sends data into underlying channel
* receiver (wait for call from velow) reads data from underlying channel

#### RDT 2.0: Reliable Data Transfer over a Channel with Bit Errors

three additional protocol capabilities are required

* **error detection**: extra bits are needed to detect when bit errors have occurred
* **receiver feedback**
  * **positive acknowledgements (ACKs)**: receiver explicitly tells sender that pkt received ok
  * **negative acknowledgements (NAKs)**: receiver explicitly tells sender that pkt had errors
  * one bit long
* **retransmission**: sender retransmits pkt on receipt of NAK

**stop-and-wait** protocol: sender sends one packet, then waits for receiver response

RDT 2.0 flaw: what happens if <u>ACK/NAK corrupted</u>?

**RDT 2.1**: retransmit & sequence number

* possible duplicate -> add <u>sequence number</u> to each packet, receiver discards duplicate packet

RDT 2.1 flaw: what happens if <u>packet lost</u>?

#### RDT 3.0: Reliable Data Transfer over a Lossy Channel with Bit Errors

underlying channel can both <u>corrupt and loss</u> packets (data, ACKs)

**approach**: sender <u>waits</u> reasonable amount of time for ACK

* <u>retransmits</u> if no ACK received in this time
* if pkt just delayed (not lost)
  * retransmission will be duplicate, but <u>sequence number</u> handles this
  * receiver must specify sequence of packet being ACKed
* use <u>count-down timer</u> to interrupt after reasonable amount of time

### Pipelined Reliable Data Transfer Protocols

$$
U_{sender} =\frac{L/R}{RTT+L/R}
$$

* L: length of the packet
* R: transmission rate

**pipelining**: sender allows multiple, "in-flight", yet-to-be-acknowledged packets

* <u>range</u> of sequence numbers must be increased
* <u>buffering</u> at sender and/or receiver

result in increased utilization

### Go-Back-N (GBN)

a **sliding-window protocol**

**sender**: window of up to N consecutive transmitted but unACKed pkts

* k-bit sequence in pkt header

* **Invocation from above**: if the window is full, buffer

* **cumulative ACK**: ACKs all packets up to and including n have been correctly received

  * on receiving ACK move forward to begin at n+1

* **A timeout event**: timer for oldest in-flight packet

  <u>timeout</u>: retransmit packet <u>n and all higher sequence #</u> packets in the window

**receiver**

* <u>ACK-only</u>: always send ACK for correctly-received packet so far, with highest in-order sequence #
  * may generate duplicate ACKs

* on receipt of out-of-order packet

  * discard

  * resend an ACK for the most recently received in-order packet

**problem**: when the window size and bandwidth-delay are both large, a single packet error can cause GBN to <u>retransmit</u> a large number of packets

### Selective Repeat (SR)

**receiver**: <u>individually</u> acknowledges all correctly received packets

* buffer packets for eventual in-order delivery to upper layer

**sender**

* <u>data from above</u>: if next available sequence # in window, send packet
* <u>timeout</u>: resend packet n, restart timer (only retransmit the loss packet)
* <u>ACK(n) in [sendbase, sendbase+N]</u>
  * mark packet n as received
  * if n is the smallest unACKed packet, advance window base to next unACKed sequence #

**receiver**

* <u>packet n in [rcvbase, rcvbase+N-1]</u>
  * send ACK(n)
  * out-of-order: buffer
  * in-order: deliver, advance window to next not-yet-received packet
* <u>packet n in [rcvbase-N, rcvbase-1]</u>: ACK(n)
* <u>otherwise</u>: ignore

**lack of synchronization**: the sender & receiver will <u>not</u> always have an <u>identical</u> view of what has been received

* the window size must be <u>less than or equal</u> to <u>half</u> the size of the sequence number space

## 3.5 Connection-Oriented Transport: TCP

### The TCP Connection

**connection-oriented** (logical connection)

* handshaking before sending data

* send preliminary segments to each other
* initialize many TCP state variables

**full-duplex service**: bi-directional data flow in same connection

**point-to-point**: between a single sender and a single receiver

**three-way handshake**

1. the client application informs the client transport layer that it wants to establish a connection to a process in the server
2. the client sends a special TCP segment (no payload)
3. the server responds with a second TCP segment (no payload)
4. the client responds again with a third special segment

**reliable, in-order byte stream**

**cumulative ACKs**

**pipelining**: TCP congestion and flow control set window size

**flow control**: sender will not overwhelm receiver

**maximum segment size (MSS)**: the maximum amount of <u>data</u> that can be grabbed and placed in a segment

* based on the **maximum transmission unit (MTU)**
* typically 1460 bytes

### TCP Segment Structure

32 bits

* source port #

  destination port #

* **sequence number**

  * byte stream "number" of first byte in segment's data
  * randomly choose an initial sequence #

* **acknowledgement number**

  * sequence # of next byte expected from the sender
  * <u>cumulative acknowledgements</u>
  * case study: Telnet

* header length, not used, C, E, U, A, P, R, S, F

  receive window

  * C, E: congestion notification
  * RST, SYN, FIN: connection management
  * receive window: for flow control

* internet checksum

  urgent data pointer

* TCP options

* application data (variable length)

### Round-Trip Time Estimation and Timeout

TCP uses a <u>timeout/retransmit mechanism</u> to recover from lost segments

**Round-Trip Time (RTT)**: the time from when a segment is <u>sent</u> until it is <u>acknowledged</u>

How to set TCP timeout value

* longer than RTT, but RTT varies
* <u>too short</u>: premature timeout, unnecessary retransmission
* <u>too long</u>: slow reaction to segment loss

#### Estimating the Round-Trip Time

**SampleRTT**: measured time from segment transmission until ACK receipt

* estimated for one of the transmitted but currently unacknowledged segments (approximately <u>once every RTT</u>)

* <u>fluctuate</u> from segment to segment

**EstimatedRTT**: <u>average</u> of the SampleRTT values

* updated when getting a new SampleRTT
  $$
  EstimatedRTT=(1-\alpha)*EstimatedRTT+\alpha * SampleRTT
  $$
  typical value for alpha is 0.125

**DevRTT**: an estimate of how much SampleRTT <u>deviates</u> from EstimatedRTT

* $$
  DevRTT = (1-\beta)*DevRTT+\beta*|SampleRTT-EstimatedRTT|
  $$

  typically value for beta is 0.25

#### Setting and Managing Retransmission Timeout Interval

greater than or equal to estimatedRTT

TimeoutInterval

* $$
  TimeoutInterval=EstimatedRTT+4*DevRTT
  $$

* <u>initial</u> TimeoutInterval is 1 second
* when a timeout occurs, the value of TimeoutInterval is <u>doubled</u>

### Reliable Data Transfer

#### TCP Sender

event 1: data received from application above

* create segment with <u>sequence #</u>
  * sequence # is byte-stream number of first data byte in segment

* start <u>timer</u> if not already running (for oldest unACKed segment)
  * use TimeoutInterval


event 2: timer timeout

* <u>retransmit</u> segment that caused timeout
* <u>restart</u> timer

event 3: ACK receipt

* if ACK acknowledges previously unACKed segment
  * <u>update</u>
  * start <u>timer</u> if there are still unACKed segments

#### Fast Retransmit

TCP ACK Generation Recommendation

| Event at Receiver                                            | TCP Receiver Action                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Arrival of <u>in-order</u> segment with <u>expected</u> seq #. All data up to expected seq # already ACKed | <u>Delayed</u> ACK. Wait up to 500ms for next segment. If no next segment, send ACK. |
| Arrival of <u>in-order</u> segment with expected seq #. One other segment has ACK pending (<u>event 1</u>). | Immediately <u>send</u> single cumulative ACK, ACKing both in-order segments |
| Arrival of out-of-order segment higher-than-expect seq #. <u>Gap</u> detected. | immediately send <u>duplicate ACK,</u> indicating seq # of next expected byte (which is the lower end of the gap) |
| Arrival of segment that partially or completely <u>fills gap</u> | immediately <u>send</u> ACK, provided that segment starts at lower end of gap |

**fast retransmit**: if sender receives <u>3 ACKs for same data</u>, <u>resend</u> unACKed segment with smallest seq #(don't wait for timeout)

#### Hybrid of GBN and SR protocols

maintain the smallest sequence number

buffer correctly received but out-of-order segments

### Flow Control

The application process will read data from the buffer, but <u>not</u> at the <u>instant</u> the data arrives

**flow-control service**: a <u>speed-matching</u> service matching the rate at which the sender is sending against the rate at which the receiving application is reading

* the receiver allocates a receive buffer **RcvBuffer**

  * **RcvBuffer** size set via socket options
  * many operating systems auto adjust **RcvBuffer**

* the sender maintains a variable **receive window** rwnd

  * how much <u>free</u> buffer space is available at the receiver

  * rwnd sent by the receiver
    $$
    rwnd=LastByteRead-LastByteRcvd \leq RcvBuffer
    $$

  * $$
    LastByteSent-LastByteAcked\leq rwnd
    $$

* the sender continue to send segments with <u>one data byte</u> when the receiver's receive window is <u>zero</u>

In UDP, segments may lost at the receiver due to buffer overflow

### TCP Connection Management

handshake before exchanging data

* agree to <u>establish</u> connection
* agree on connection <u>parameters</u> (e.g. starting seq #)

TCP **three-way handshake**

1. client: send a **SYN segment**
   * no application-layer data
   * SYN bit is 1
   * randomly chooses an initial sequence number (client_isn)
2. server: send a **SYNACK segment**
   * no application-layer data
   * SYN bit is 1
   * the acknowledgement field is client_isn+1
   * chooses an initial sequence number (server_isn)
3. client
   * allocates buffers and variables
   * the acknowledgement field is server_isn+1
   * SYN bit is 0
   * may carry client-to-server data in the segment payload

end a TCP connection: the resources (buffers & variables) are deallocated

1. client, server <u>each</u> close their side of connection: send TCP segment with <u>FIN bit = 1</u>
2. respond to received FIN with <u>ACK</u>: on receiving FIN, ACK can be combined with own FIN
3. simultaneous FIN exchanges can be handled

if receives a TCP SYN packet, but the host is not accepting connections on port 80

* send a special reset segment to the source (RST bit is 1)

## 3.6 Principles of Congestion Control

Packet retransmission treats a symptom of network congestion but not the cause

### Causes and Costs of Congestion

**congestion control**: too many senders, sending too fast

* manifestation: long delays (queue in router buffers), packet loss (buffer overflow at routers)

**flow control**: one sender too fast for one receiver

**scenario 1**: two senders, a router with infinite buffers (no retransmission)

* cost 1: when reaching the maximum per-connection throughput, <u>large queueing delays</u> occurs
* an aggregate throughput near R is <u>not ideal</u> from a <u>delay</u> standpoint

**scenario 2**: two senders, a router with finite buffers (with retransmission)

* cost 2: the sender must perform <u>retransmissions</u> in order to compensate for dropped packets due to buffer overflow
  * sender retransmits lost, timed-out packet -> actual throughput = original data + retransmitted data

* cost 3: <u>unneeded retransmissions</u> by the sender in the face of large delays may cause a router to use its link bandwidth to forward unneeded copies of a packet
  * don't know whether a segment is lost or not


**scenario 3**: four senders, routers with finite buffers, and multi-hop paths

* cost 4: when a packet is dropped along a path, the retransmission capacity that was used at each of the upstream links to forward that packet to the point at which it is dropped ends up having been wasted

**summary**: cost of congestion

* delay increases as capacity approach (scenario 1)
* loss/retransmission decreases effective throughput (scenario 2)
* un-needed duplicates further decreases effective throughput (scenario 2)
* upstream transmission capacity/buffering wasted for packets lost downstream (scenario 3)

### Approaches towards Congestion Control

**End-to-end Congestion Control**

* no explicit support from the network layer
* congestion inferred from observed loss, delay (ACKs) at the sender

**Network-assisted Congestion Control**

* routers provide direct feedback to sending/receiving hosts

## 3.7 TCP Congestion Control

how a TCP sender <u>limits the rate</u> at which it sends traffic into its connection?

* **congestion window** cwnd imposes a constraint on the rate
  $$
  LastByteSent-LastByteAcked\leq min \{cwnd,~rwnd\}
  $$

* limits the amount of unacknowledged data at the sender and therefore <u>indirectly</u> limits the sender's send data

how a TCP sender <u>perceives</u> that there is <u>congestion</u> on the path between itself and the destination?

* the <u>lost datagram</u> is taken by the sender to be an indication of congestion
* **self-clocking**: the <u>acknowledgements</u> is used to increase its congestion window size

how should a TCP sender determine the rate at which it should send?

* A lost segment implies congestion, and hence, the TCP sender's rate should be **decreased when a segment is lost**
* An acknowledged segment indicates that the network is delivering the sender's segments to the receiver, and hence, the sender's rate can be **increased when an ACK arrives for a previously unacknowledged segment**
* **Bandwidth probing** (probe for the rate)

three major components in **TCP congestion-control algorithm**

1. slow start
2. congestion avoidance
3. fast recovery (not required)

#### Slow Start

when a TCP connection begins or a timeout happens

1. cwnd begins at 1MSS

2. cwnd doubles every RTT (increases by 1 MSS every time a transmitted segment is first acknowledged)

3. if there is a loss event

   1. **ssthresh** (slow start threshold) = <u>cwnd/2</u> (half of the value of the cwnd value when congestion was detected)
   2. cwnd = 1 MSS, and <u>slow start</u> process begins

4. when the value of <u>cwnd = ssthresh</u>, slow start ends and TCP transitions into **congestion avoidance** mode

   or if <u>three duplicate ACKs</u> are detected, TCP performs a fast retransmit and enters the **fast recovery** state

#### Congestion Avoidance

when cwnd = ssthresh

* cwnd = cwnd + 1MSS every RTT
* when a timeout occurs
  * ssthresh = cwnd/2
  * cwnd = 1 MSS
* when three duplicate ACKs are detected
  * ssthresh = cwnd/2
  * cwnd = ssthresh + 3MSS

#### Fast Recovery

when three duplicate ACKs are detected

* cwnd = cwnd +MSS
* when timeout, slow start
* when new ACK arrives, congestion avoidance

**additive increase, multiplicative decrease (AIMD)**

### Fairness

TCP results in an equal sharing of bandwidth among connections

* <u>UDP</u>: applications using UDP has a constant transmission rate which makes it possible for UDP sources to crowd out TCP traffic
* <u>Parallel TCP connections</u>: gets a larger fraction of the bandwidth in a congested link

### Enhanced TCPs

#### Delay-based Congestion Control TCP

Goal: keep the end-end pipe just full, not fuller

* measured throughput = # bytes sent in last RTT interval/ measured RTT
* uncongested throughput with cwnd is **cwnd/minimum observed RTT**

if measured throughput <u>close</u> to uncongested throughput, increase cwnd linearly

else if measured throughput <u>below</u> uncongested throughput, decrease cwnd linearly

#### Explicit Congestion Notification (ECN)

network-assisted congestion control (involves both IP and TCP)

* two bits in IP header ECN marked by <u>network router</u> to indicate congestion
  * experiencing congestion
  * ECN-capable

* congestion indication carried to destination
* destination sets <u>ECE bit on ACK segment</u> to notify sender of congestion

## 3.8 Evolution of Transport Layer Functionality

QUIC: Quick UDP Internet Connections

* application-layer protocol, on top of UDP

* increase performance of HTTP
* deployed on many Google servers

QUIC: Connection establishment

* TCP (reliability, congestion control) + TLS (authentication, crypto) use 2 serial handshakes (2 RTT)

* QUIC (reliability, congestion control, authentication, crypto): 1 handshake (1 RTT)

QUIC: streams: parallelism, no HOL blocking
