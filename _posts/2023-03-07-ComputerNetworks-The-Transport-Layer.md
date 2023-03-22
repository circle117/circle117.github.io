---
title: 3 The Transport Layer
date: 2023-03-07 16:43:00 +0800
categories: [Basic, Computer Network]
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

* **UDP**: connectionless, best-effort service
* **TCP**: reliable, flow- and congestion-controlled connection-oriented transport

transport vs. network layer services and protocols

* **network layer**: logical communication between <u>hosts</u>
* **transport layer**: logical communication between <u>processes</u>
  * rely on, enhance network layer services

Two principle Internet transport protocols

* **TCP**: Transmission Control Protocol
  * reliable, in-order delivery
  * congestion control
  * flow control
  * connection setup
* **UDP**: User Datagram Protocol
  * unreliable, unordered delivery
* services not available
  * delay guarantees
  * bandwidth guarantees

## 3.2 Multiplexing and Demultiplexing

<u>multiplexing at sender</u>: handle data from multiple sockets, add transport header (for demultiplexing)

<u>demultiplexing at receiver</u>: use header info to deliver received segments to correct sockets

### How Demultiplexing Work

hosts received IP datagrams

* source IP address, destination IP address, transport-layer segment(including source, destination port number)

host uses <u>IP addresses & port numbers</u> to direct segment to appropriate socket

**Connectionless demultiplexing**

* when creating socket, must specify <u>host-local</u> port

* when creating datagram to send into UDP socket, must specify <u>destination IP address & port</u>

* when receiving host receives UDP segment

  * check <u>destination port</u> in segment
  * directs UDP segment to socket with that port

* same destination port but different source IP addresses and port numbers will be directed to <u>same socket</u> at receiving host

  demultiplexing is only based on the destination port

**Connection-oriented demultiplexing**

* TCP socket identified by <u>4-tuple</u>
  * source IP address
  * source port number
  * dest IP address
  * dest port number
* demultiplexing: receiver uses <u>all four values</u> to direct segment to appropriate socket
* server may support many <u>simultaneous</u> TCP sockets
  * identified by its own 4-tuple
  * associated with a different connecting client
* If HTTP is used, the destination port is 80. The source IP and port number are used for demultiplexing

**Multiplexing and demultiplexing happen at all layers**

## 3.3 Connectionless Transport: UDP

"No frills", "bare bones", "best effort" Internet transport protocol

UDP segments may be: <u>lost</u>, delivered <u>out-of-order</u>

connectionless

* no handshaking
* each UDP segment handled <u>independently</u>

Why is there a UDP

* no connection establishment (no RTT delay)
* simple: no connection state
* small header size
* no congestion control

UDP use

* streaming multimedia apps
* DNS
* SNMP
* HTTP/3

if reliable transfer needed over UDP

* add needed reliability at application layer
* add congestion control at application layer

### UDP sender/receiver actions

UDP sender actions

* passed an application-layer message (e.g. SNMP message)
* determines UDP segment <u>header</u> fields value
* <u>creates</u> UDP segment
* <u>passes</u> segment to network layer (IP)

UDP receiver actions

* <u>receives</u> segment from IP
* <u>checks</u> UDP checksum header value
* <u>extracts</u> application-layer message
* <u>demultiplexes</u> message up to application via socket

### UDP segment format

32bit

* source port #, destination port #

* length (in bytes of UDP segment, including header), checksum

* application data (payload)

### Internet checksum

* goal: detect errors in transmitted segment
* sender
  * treat contents of UDP segment as sequence of 16-bit integers
  * **checksum**: <u>addition</u> of segment content
  * checksum value put into UDP checksum field
* receiver
  * compute checksum of received segment
  * check if computed checksum equals checksum field value
    * not equal - error detected
    * equal - no error detected (errors may still exist)

## 3.4-1 Principles of Reliable Data Transfer

sender-side/receiver-side of reliable data transfer protocol

* Complexity of reliable data transfer protocol will <u>depend strongly on characteristics</u> of unreliable channel (can it lose, corrupt, reorder data?)
* Sender, receiver <u>do not know the state</u> of each other, unless communicated via a message

### RDT 1.0: reliable data transfer over a reliable channel

<u>reliable</u> underlying channel

* no bit errors
* no loss of packets

separate <u>FSMs (finite state machine)</u> for sender, receiver (just send and receive)

* sender (wait for call from above) sends data into underlying channel
* receiver (wait for call from velow) reads data from underlying channel

### RDT 2.0: channel with bit errors

underlying channel may flip bits in packet

* checksum to detect bit errors

how to <u>recover</u> from errors?

* **acknowledgements (ACKs)**: receiver explicitly tells sender that pkt received ok

* **negative acknowledgements (NAKs)**: receiver explicitly tells sender that pkt had errors

* sender <u>retransmits</u> pkt on receipt of NAK
* **stop and wait**: sender sends one packet, then waits for receiver response

RDT2.0 has a fatal flaw: what happens if <u>ACK/NAK corrupted</u>?

* sender doesn't know what happened at receiver

### RDT 2.1: sender, handling garbled ACK/NAKs

retransmit

* possible duplicate: add <u>sequence number</u> to each pkt, receiver discards duplicate pkt

RDT 2.1 flaw: what happens if pkt lost?

## 3.4-2 Principles of Reliable Data Transfer

### RDT 3.0: channels with errors and loss

underlying channel can both <u>corrupt and loss</u> packets (data, ACKs)

Approach: sender <u>waits</u> reasonable amount of time for ACK

* <u>retransmits</u> if no ACK received in this time
* if pkt just delayed (not lost)
  * retransmission will be duplicate, but sequence handles this
  * receiver must specify sequence of pkt being ACKed
* use <u>countdown timer</u> to interrupt after reasonable amount of time

$$
U_{sender} =\frac{L/R}{RTT+L/R}
$$

* L: length of the packet
* R: transmission rate

Protocol limits performance of underlying infrastructure (channel)

### RDT 3.0: pipelined protocols operation

pipelining: sender allows multiple, "in-flight", yet-to-be-acknowledged packets

* range of sequence numbers must be increased
* buffering at sender and/or receiver

increased utilization

#### Go-Back-N

sender: window of up to N, consecutive transmitted but unACKed pkts

* k-bit sequence pkt header

* **cumulative ACK**: ACKs all packets up to, including sequence # n

  * on receiving ACK move forward to begin at n+1

* <u>timer</u> for oldest in-flight packet

  <u>timeout</u>: retransmit packet n and all higher sequence # packets in window

receiver

* ACK-only: always send ACK for correctly-received packet so far, with <u>highest in-order</u> sequence #
  * may generate duplicate ACKs

* on receipt of out-of-order packet

  * can <u>discard</u> or buffer

  * re-ACK pkt with highest in-order sequence

#### Selective repeat

receiver <u>individually</u> acknowledges all correctly received packets

* buffer packets for eventual in-order delivery to upper layer

sender

* <u>data from above</u>: if next available sequence # in window, send packet
* <u>timeout</u>: resend packet n, restart timer (only retransmit the loss packet)
* <u>ACK(n) in [sendbase, sendbase+N]</u>
  * mark packet n as received
  * if n is the smallest unACKed packet, advance window base to next unACKed sequence #

receiver

* <u>packet n in [rcvbase, rcvbase+N-1]</u>
  * send ACK(n)
  * out-of-order: buffer
  * in-order: deliver, advance window to next not-yet-received packet
* <u>packet n in [rcvbase-N, rcvbase-1]</u>: ACK(n)
* <u>otherwise</u>: ignore

## 3.5-1 Connection-oriented Transport: TCP

<u>point-to-point</u>: one sender, one receiver

<u>reliable, in-order byte stream</u>: no "message boundaries"

<u>full duplex data</u>: bi-directional data flow in same connection, MSS: maximum segment size

<u>cumulative ACKs</u>

<u>pipelining</u>: TCP congestion and flow control set window size

<u>connection-oriented</u>: handshaking

<u>flow control</u>: sender will not overwhelm receiver

### TCP segment structure

32 bits

* source port #

  destination port #

* sequence number

  * byte stream "number" of first byte in segment's data

* acknowledgement number

  * sequence # of next byte expected from the sender
  * cumulative ACK

* header length, not used, C, E, U, A, P, R, S, F

  receive window

  * C, E: congestion notification
  * RST, SYN, FIN: connection management
  * receive window: for flow control

* internet checksum

* TCP options

* application data (variable length)

### Reliable Data Transter

#### TCP round trip time, timeout

How to set TCP timeout value

* longer than RTT, but RTT varies
* <u>too short</u>: premature timeout, unnecessary retransmission
* <u>too long</u>: slow reaction to segment loss

How to estimate RTT

* **SampleRTT** measured time from segment transmission until ACK receipt

* SampleRTT will vary, want it to be smoother

  * average several recent measurement

* $$
  EstimatedRTT=(1-\alpha)*EstimatedRTT+\alpha * SampleRTT
  $$

  typical value for alphah: 0.125

* $$
  TimeoutInterval=EstimatedRTT+4*DevRTT\\
  DevRTT = (1-\beta)*DevRTT+\beta*|SampleRTT-EstimatedRTT|
  $$

  want a safety margin

  typically beta=0.25

#### TCP Sender

event: data received from application

* create segment with seq #
* seq # is byte-stream number of first data byte in segment
* start timer if not already running (for oldest unACKed segment)

event: timeout

* retransmit segment that caused timeout
* restart timer

event: ACK received

* if ACK acknowledges previously unACKed segment
  * update
  * start timer if there are still unACKed segments

#### TCP Receiver

| Event at receiver                                            | TCP receiver action                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| arrival of in-order segment with expected seq #. All data up to expected seq # already ACKed | delayed ACK. Wait up to 500ms for next segment. If no next segment, send ACK. |
| arrival of in-order segment with expected seq #. One other segment has ACK pending (event 1). | immediately send single cumulative ACK, ACKing both in-order segments |
| arrival of out-of-order segment higher-than-expect seq #. Gap detected. | immediately send duplicate ACK, indicating seq # of next expected byte |
| arrival of segment that partially or completely fills gap    | immediately send ACK, provided that segment starts at lower end of gap |

<u>TCP fast retransmit</u>: if sender receives 3 ACKs for same data, resend unACKed segment with smallest seq #(don't wait for timeout)

## 3.5-2 Connection-oriented Transport: TCP

### Flow Control

receiver <u>controls sender</u>, so sender won't overflow receiver's buffer by transmitting too much, too fast

TCP flow control

* TCP receiver advertises free buffer space in **rwnd** (receive window in TCP header) filed in TCP header
  * **RcvBuffer** size set via socket options
  * many operating systems auto adjust **RcvBuffer**
* sender limits amount of unACKed data to received rwnd
* guarantees receive buffer will not overflow

### Connection Management

handshake before exchanging data

* agree to <u>establish</u> connection
* agree on connection <u>parameters</u> (e.g. starting seq #)

TCP 3-way handshake

1. client: choose init seq num, send TCP <u>SYN</u> message

2. server: choose init seq num, send TCP <u>SYNACK</u> message, acking SYN
3. client: received SYNACK indicates server is live, send <u>ACK</u> for SYNACK, this segment may contain client-to-server data
4. server: received ACK indicates client is live

closing a TCP connection

1. client, server <u>each</u> close their side of connection: send TCP segment with <u>FIN bit = 1</u>
2. respond to received FIN with <u>ACK</u>: on receiving FIN, ACK can be combined with own FIN
3. simultaneous FIN exchanges can be handled

## 3.6 Principles of Congestion Control

### Causes and Costs of Congestion

**congestion control**: too <u>many</u> senders, sending too fast

* manifestation: long delays (queue in router buffers), packet loss (buffer overflow at routers)

**flow control**: <u>one</u> sender too fast for one receiver

scenario 1: one router, infinite buffers (no retransmission)

* when reaching the maximum per-connection throughput, large delays occurs

scenario 2: one router, finite buffers

* sender retransmits lost, timed-out packet -> actual throughput = original data + retransmitted data
* "wasted" capacity due to un-needed retransmissions (don't know whether a segment is lost or not)

scenario 3: four senders, multi-hop paths, timeout/retransmit

**costs of congestion**

* throughput can <u>never exceed</u> capacity (scenario 1)
* delay increases as capacity approach (scenario 1)
* <u>loss/retransmission</u> decreases effective throughput (scenario 2)
* <u>un-needed duplicates</u> further decreases effective throughput (scenario 2)
* <u>upstream</u> transmission capacity/buffering wasted for packets lost <u>downstream</u>

### Approaches towards Congestion Control

End-end Congestion Control (central part)

* congestion <u>inferred</u> from observed loss, delay (ACKs) at the sender

* no explicit feedback from network

Network-assisted Congestion Control

* router provide direct feedback to sending/receiving hosts

## 3.7 TCP Congestion Control

### Classic TCP: loss based, end-end

#### additive increase, multiplicative decrease (AIMD)

* **approach**: senders can <u>increase</u> sending rate until packet loss occurs, then <u>decrease</u> sending rate on <u>loss event</u>
* Additive Increase: increase sending rate by <u>1 maximum segment size</u> every RTT until loss detected
* Multiplicative Decrease: cut sending rate <u>in half</u> at each loss event
  * cut in half on loss detected by <u>triple duplicate ACK</u> (TCP Reno)
  * cut to <u>1 MSS</u> (maximum segment size) when loss detected by timeout (TCP Tahoe)

implements

* TCP sender limits transmission: <u>LastByteSent - LastByteAcked <= cwnd</u>

* cwnd is dynamically adjusted in response to observed network congestion (based on AIMD algorithm)

* TCP sending behavior
  $$
  TCP~~rate \approx \frac{cwnd}{RTT}~~bytes/sec
  $$

#### TCP slow start

when connection begins, increase rate exponentially until first loss event

* initially cwnd = 1MSS
* double cwnd every RTT (done by incrementing cwnd for every ACK received)

#### TCP: from slow start to congestion avoidance

implementation

* variable **ssthresh**
* on loss event, ssthresh is set to 1/2 of cwnd just before loss event

#### TCP Cubic

larger increases when further away from K

smaller increases when nearer K

### Enhanced TCPs

#### Delay-based Congestion Control TCP

Goal: keep the end-end pipe just full, not fuller

* measured throughput = # bytes sent in last RTT interval/ measured RTT
* uncongested throughput with cwnd is **cwnd/minimum observed RTT**

if measured throughput <u>close</u> to uncongested throughput, increase cwnd linearly

else if measured throughput <u>below</u> uncongested throughput, decrease cwnd linearly

#### Explicit Congestion Notification (ECN)

network-assisted congestion control

* two bits in IP header ECN marked by <u>network router</u> to indicate congestion
* congestion indication carried to destination
* destination sets <u>ECE bit on ACK segment</u> to notify sender of congestion
* involves both IP and TCP

### TCP fairness

fairness goal: if K TCP sessions share same bottleneck link of bandwidth R, each should have <u>average rate</u> of R/K

## 3.8 Evolution of Transport Layer Functionality

QUIC: Quick UDP Internet Connections

* application-layer protocol, on top of UDP

* increase performance of HTTP
* deployed on many Google servers

QUIC: Connection establishment

* TCP (reliability, congestion control) + TLS (authentication, crypto) use 2 serial handshakes (2 RTT)

* QUIC (reliability, congestion control, authentication, crypto): 1 handshake (1 RTT)

QUIC: streams: parallelism, no HOL blocking
