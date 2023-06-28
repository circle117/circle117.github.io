---
title: 2 The Application Layer
date: 2023-02-13 15:45:00 +0800
categories: [Basic, Computer Networking A Top-Down Approach]
tags: [basic]        # lowercase
toc: true
---

## Overview

learn about protocols by examining popular application-layer protocols and infrastructure

* HTTP
* SMTP, IMAP
* DNS
* video streaming systems, CDNs

programming network applications

* socket API

## 2.1 Principles of Network Applications

applications

* distributed interacting processes
* exchanging messages

### Network Application Architectures

#### Client-server Architecture

**server**

* <u>always-on</u> host
* <u>permanent</u> IP address
* often in <u>data centers</u>

**clients**

* contact, communicate with server
* may be <u>intermittently connected</u>
* may have <u>dynamic</u> IP address
* do not communicate directly with each other (interact with servers)

examples: HTTP, IMAP, FTP

#### Peer-to-peer Architecture

* <u>no always-on</u> server

* arbitrary end systems directly communicate

* peers request service from other peers,

  and provide service in return to other peers

* peers are <u>intermittently connected</u> and <u>change</u> IP address (complex management)

example: P2P file sharing

> Some applications have hybrid architectures, combining both client-server and P2P elements

### Processes Communicating

**process**: program running with a host

* within same host, two processes communicate using **inter-process communication** (defined by OS)
* processes in different hosts communicate by exchanging **messages**

**client process**: process that <u>initiates</u> communication

**server process**: process that <u>waits</u> to be contacted

#### Sockets

process sends/receives messages to/from its socket

* sending process relies on <u>transport infrastructure</u> (transport layer, network layer, link layer and physical layer)
* <u>two</u> sockets involved, one on each side

#### Addressing

to receive messages, process must have <u>identifier</u>

* host device has unique 32-bit <u>IP address</u>
* Identifier includes both **IP address** and **port numbers** associated with process on host
  * IP address - host
  * port number - process
    * example: HTTP server: 80; mail server: 25

### Transport Layer Service

#### An Application-layer Protocol

defines 

* types of messages exchanged (request, response)
* message syntac
* message semantics
* rules

**open protocols**

* defined in RFCs, everyone has access to protocol definition
* allows for interoperability
* e.g. HTTP, SMTP

**proprietary protocols**

* owned by company
* e.g. Skype, Zoom

#### What transport service dose an app need?

**data integrity**

* some apps (file transfer) require 100% <u>reliable data transfer</u>
* other apps (audio) can tolerate some loss

**timing**

* some apps require low delay

**throughput**

* some apps require minimum amount of throughput
* other apps make use of whatever throughput they get

**security**

#### Transport Layer Protocols Services

TCP service

* **reliable transport** between sending and receiving process
* **flow control**: sender won't overwhelm receiver
* **congestion control**: throttle sender when network overloaded
* **connection-oriented**: setup required between client and server process
* does not provide: timing, minimum throughput guarantee, security

UDP service

* <u>unreliable</u> data transfer
* does not provide: reliability, flow control, congestion control, timing, throughput guarantee, security, or connection setup
* can build <u>additional services</u> that are not provided by UDP on top of UDP in the application layer

| Application            | Application Layer Protocols | Transport Protocol |
| ---------------------- | --------------------------- | ------------------ |
| file transfer/download | FTP                         | TCP                |
| e-mail                 | SMTP                        | TCP                |
| Web documents          | HTTP                        | TCP or UDP         |
| Internet telephony     | SIP, RTP or proprietary     | TCP or UDP         |
| streaming audio/video  | HTTP, DASH                  | TCP                |
| interactive games      | WOW, FPS (proprietary)      | UDP or TCP         |

#### Securing TCP

Transport Layer Security (TLS)

* on top of TCP socket
* provide encrypted TCP connection
* data integrity
* end-point authentication

## 2.2 The Web and HTTP

**web page** consists of **objects**, each of which can be stored on different Web servers

* objects: HTML file, JPEG image, Java applet, audio file, ...

web page consists of **base HTML file** which includes several referenced objects, each addressable by a **URL**

* host name + path name

### HTTP: Hypertext Transfer Protocol

Web's application layer protocol

client/server model

* <u>client</u>: browser that requests, receives and displays web objects
* <u>server</u>: Web server sends objects in response to requests

HTTP uses TCP

* client <u>initiates</u> TCP connection(create <u>socket</u>) to server, port 80
* server <u>accepts</u> TCP connection from client
* <u>HTTP message</u> (application-layer protocol messages) exchanged between browser (HTTP client) and Web server (HTTP server)
  * **HTTP request**
  * **HTTP response**

* TCP connection <u>closed</u>

HTTP is **stateless**: server <u>maintains no information</u> about past client requests

* protocols that maintain state are complex

### HTTP Connections

#### Non-persistent HTTP

download multiple objects required multiple connections

1. TCP connection opened
2. <u>at most one</u> object sent over TCP connection (send request/response message)
3.  TCP connection closed

response time

* RTT: time for a small packet to travel from client to server and back
* 1 RTT (initiate TCP connection) + 1 RTT (request file) + time to transmit file
* <u>2RTT + file transmission time</u>
* browsers often open multiple <u>parallel</u> TCP connections to fetch referenced objects in parallel

> three-way handshake
>
> 1. the client sends a small TCP segment to the server
> 2. the server acknowledges and responds with a small TCP segment
> 3. the client sends the HTTP request message combined with the acknowledgement into the TCP connection

#### Persistent HTTP

mostly used

1. TCP connection opened
2. <u>multiple</u> objects can be sent over single TCP connection
   * server <u>leaves connection open</u> after sending response
   * subsequent HTTP messages between same client/server sent over open connection
   * client sends requests as soon as it encounters a referenced object
   * **pipeline**: requests for objects can be made back-to-back
   * as little as <u>one RTT</u> for all the referenced objects
3. TCP connection closed

### HTTP Messages

#### HTTP Request Messages

request line + header lines + carriage return (<u>ASCII</u>)

 general format

* **request line**: <u>method, URL, version, carriage return + line feed</u>
* **header lines**: <u>header field name: value, cr lf</u> *n
* cr lf
* body: entity body

method

* **POST**: include form input; user input sent in <u>entity body</u> of HTTP POST request message
* **GET**: include user data in <u>URL field</u> of HTTP GET request message (follow a '? xxx&xxx')
* **HEAD**: requests headers that would be returned if specified URL were requested with an HTTP GET method （for debugging)
* **PUT**: uploads new file to server; completely replaces file that exists at specified URL with content in entity body of POST HTTP request message
* **DELETE**: delete an object on a Web server

#### HTTP Response Messages

general form

* status line: version, status code, short status phrase

* header lines

* body

status codes

* 200 OK
* 301 Moved Permanently
* 400 Bad request: request message not understood by server
* 404 Not Found
* 505 HTTP Version Not Supported

### HTTP Cookies

Web site and client browser use **cookies** to identify users

four components

1. a cookie header line in the HTTP <u>response</u> message
2. a cookie header line in the next HTTP <u>request</u> message
3. a cookie file kept on user's <u>host</u> and managed by user's browser
4. a back-end database at <u>Web site</u>

What cookies can be used for

* authorization
* shopping carts
*  recommendations
* user session state

How to keep state

* at protocol endpoints
* in messages

### Web Caches

goal: satisfy client requests <u>without</u> involving origin server

* user configures browser to point to a (local) Web cache
* browser sends all HTTP requests to cache
  * <u>if</u> object in cache: cache returns object to client
  * <u>else</u> cache requests object from origin server, caches received object, then returns object to client
* Web cache acts as <u>both client and server</u>
  * server for original requesting client
  * client to origin server
* server tells cache about object's allowable caching in response header
  * <u>Cache-Contro</u>l: max-age=\<seconds>
  * <u>Cache-Control</u>: no-cache

Why Web caching?

* reduce response time for client request
* reduce traffic on an institution's access link

### Conditional HTTP GET

goal: <u>verify</u> that its objects are up-to-date

* cache: specify date of cached copy in HTTP request

  <u>If-modified-since</u>: \<date>

* server: response contains no object if cached copy is up-to-date

  <u>304 Not Modified</u>

>### HTTP/2
>
>goal: decreased delay in multi-object HTTP requests
>
>* transmission order of requested objects based on client-specified object priority (not FCFS)
>* push unrequested objects to client
>* divide objects into frames, schedule frames to mitigate HOL blocking (frame transmission interleaved)

## 2.3 Email (SMTP)

### Infrastructure

Three major components

* **user agents** (e.g. Outlook)
  * composing, editing, reading mail messages

* **mail servers** (core)
  * <u>mailbox</u>: contains incoming messages for user
  * <u>message queue</u>: to be sent mail messages

* **SMTP**: simple mail transfer protocol
  * client: sending
  * server: receiving


User -> User Agent - (SMTP) > Mail Server -(TCP connection, SMTP) > Mail Server -(POP3, IMAP or HTTP)-> User Agent -> Another user

### SMTP: Simple Mail Transfer Protocol

uses TCP to reliably transfer email message from the sender's mail server to the receiver's, port 25

#### Basic Operation of SMTP

1. A invokes the <u>user agent</u>

2. A's user agent sends the message to A's <u>mail server</u>

3. The client side of <u>SMTP</u> running on A's mail server sees the message in the <u>message queue</u>

   It opens a <u>TCP connection</u> to an <u>SMTP</u> server running on B's <u>mail server</u>

4. After some initial <u>SMTP handshaking</u>, the SMTP client sends Alice's message into the TCP connection

5. The B's server side of SMTP receives the message, and places the message in B's <u>mailbox</u>

6. B invokes the <u>user agent</u> to read the message

do not use intermediate mail servers

#### Three Phases of Transfer

1. SMTP handshaking (indicates the e-mail address of the sender and the recipient)
2. SMTP transfer of messages
3. SMTP closure

#### Comparison with HTTP

similarities

* transfer files from one server to another
* persistent connection

differences

* HTTP: **pull protocol** (pull the information from the server)

  SMTP: **push protocol** (push the file to the server)

* SMTP: require each message (header & body) to be in <u>7-bit ASCII</u>

* HTTP: each object encapsulated in its <u>own</u> response message

  SMTP: place all of the message's object into <u>one</u> message

#### Mail Message Format

From:

To:

Subject: <message body (ASCII)>

### Mail Access Protocol

goal: let the receiver's user agent obtain the messages from his mail server

**POP3: Post Office Protocol - Version 3**

* three phases
  1. **authorization**: sends a username and a password
  2. **transaction**: retrieves messages
  3. **update**: after the client issued the quit command, end the POP3 session
* <u>download and delete</u> or <u>download and keep</u>
* lack of state information <u>across</u> POP3 session
  * not provide any means for a user to create remote folders and assign messages to folders

**IMAP: Internet Mail Access Protocol**

* maintains user state information across IMAP sessions
  * associate each message with a folder
* permit a suer agent to obtain components of messages (e.g. the message header)

**Web-Based E-Mail** (HTTP)

* user agent is an ordinary <u>Web browser</u>
* use <u>HTTP</u> when sending and receiving messages from the mail server

## 2.4 The Domain Name System: DNS

Internet hosts, routers can be <u>identified</u> by

* **hostname**
* **IP address**

How to map between IP address and name?

### DNS Structure & Services

<u>main task</u>: translate hostnames to IP address

The DNS is

* a <u>distributed database</u> implemented in hierarchy of **DNS servers**

* an <u>application-layer protocol</u> that allows hosts to query the distributed database

The DNS runs over <u>UDP</u> and uses port 53

steps

1. user machine runs <u>the client side of the DNS application</u>
2. browser <u>extracts</u> the hostname from the URL and <u>passes</u> the hostname to the client side of the DNS application
3. DNS client <u>sends a query</u> containing the hostname to a <u>DNS server</u>
4. DNS client <u>receives</u> a reply including <u>the IP address</u> for the hostname
5. browser can <u>initiate a TCP connectio</u>n to the HTTP server process at port 80 <u>at that IP address</u>

DNS services

* hostname-to-IP-address translation
* **host aliasing**
* **mail server aliasing** (mail server's IP address)
* **load distribution** (decentralized)
  * many IP addresses correspond to one name
  * send the entire set of IP addresses, but rotates the ordering of the addresses within each reply


### How DNS Works

hostname-to-IP-address translation service

1. One application <u>invokes the client side of DNS</u>, specifying the hostname
2. DNS in the user's host <u>sends a query message</u> to the network
3. After a delay, DNS <u>receives a DNS reply message</u> and <u>passes</u> it to the invoking application

Why not centralized DNS?

* **a single point of failure**: If the DNS server crashes, so does the entire Internet
* **traffic volume**
* **distant centralized database**
* **maintenance**

#### A Distributed, Hierarchical Database

four classes of DNS servers

* belong to the hierarchy of DNS servers

  * **Root DNS servers**
    * provide the IP address of the TLD servers

  * **Top-level domain (TLD) DNS servers**
    * e.g. com, org, net, uk, fr, ca

  * **Authoritative DNS servers**
    * e.g. yahoo.com
    * organization's own DNS servers or of some service providers

* **Local DNS servers**: when host makes DNS query, it is sent to its local DNS server
  * from its local <u>cache</u> of recent name-to-address translation pairs
  * <u>forward</u> request into DNS hierarchy for resolution

example

1. the host sends a DNS query message to its <u>local DNS server</u>
2. the local DNS server forwards the message to a <u>root DNS server</u>
3. the root DNS server returns to the local DNS server a list of IP addresses for TLD servers
4. <u>the local DNS server resends</u> the message to one of the TLD servers
5. the TLD server <u>responds</u> with the IP address of the authoritative DNS server
6. <u>the local DNS server resends</u> the query message to it

**Iterative query**

* contacted server replies with IP address of server to contact
* keep contacting other servers until find the target

**Recursive query**

* put burden of name resolution on contacted name server
* heavy load at upper levels of hierarchy

#### DNS Caching

**Caching DNS information**: once name server learns mapping, it <u>caches</u> mapping and immediately returns a cached mapping in response to a query

* improves response time
* timeout after some time (TTL)
* TLD servers typically cached in local name servers
* cached entries may be out-of-date: may not be known until all TTLs expire

### DNS Records and Messages

Distributed database storing **resource records** (RR) format: (Name, Value, Type, TTL)

* Type=A
  * Name is <u>hostname</u>
  * Value is <u>IP address</u>
* Type=NS
  * Name is <u>domain</u> (e.g. foo.com)
  * Value is the hostname of <u>authoritative DNS server</u> that knows how to obtain the IP addresses for hosts in the domain
* Type=CNAME
  * Value is a canonical hostname for the alias hostname Name
* Type=MX
  * Value is name of SMTP mail server associated with Name

DNS messages

* two kinds (both have same format)
  * DNS query message
  * DNS reply message

get your info into the DNS

1. register name at DNS registrar
   * provide names, IP addresses of authoritative name server
2. create authoritative server locally with the IP address

### DNS Security

DDoS attacks

## 2.6 Video Streaming and Content Distribution Networks

stream video traffic is the major consumer of Internet bandwidth

challenge

* <u>scale</u>
* <u>heterogeneity</u>: different users have different capabilities
  * wired & mobile
  * bandwidth rich & poor

solution: distributed, application-level infrastructure

### Internet Video

video medium

* sequence of <u>images</u> (frames) displayed at constant rate

  digital image consists of an array of <u>pixels</u>

* coding: use <u>redundancy</u> within and between images to decrease bits used to encode image
  * <u>spatial</u> or <u>temporal</u>

  * video encoding methods

    * **constant bit rate (CBR)**: video encoding rate fixed

    * **variable bit rate (VBR)**: rate changes as amount of spatial, temporal coding changes


streaming stored video

* main challenges

  * server-to-client bandwidth will <u>vary</u> over time, with changing network congestion level

  * packet <u>loss</u>, <u>delay</u> due to congestion will delay playout, or result in poor video quality


* **streaming**: client plays out early part of video, while server still sending later part of it.

**buffering** & **playout**

* **continuous playout constraint**: during client video playout, playout timing must match original timing
  * network delay problem -> client-side buffer is needed


* other challenges

  * client interactivity: pause, fast-forward, etc

  * video packets may be lost and retransmitted


### DASH: Dynamic Adaptive Streaming over HTTP

server

* divide video file into multiple <u>chunks</u>
* each chunk encoded at multiple <u>different rates</u>
* different rate encodings stored in <u>different files</u>
* files replicated in various CDN nodes
* <u>manifest file</u>: provides <u>URLs</u> for different chunks

client

* periodically <u>estimates</u> server-to-client bandwidth
* consulting manifest file, requests one chunk at a time
  * choose maximum coding rate sustainable given current bandwidth
  * can choose different rates at different points and from different servers

* intelligent one, determines
  * when to request
  * what encoding rate
  * where to request chunk


### Content Distribution Network(CDNs)

 challenge: how to stream content to hundreds of thousands of simultaneous users worldwide

store/serve multiple copies of videos at multiple <u>geographically distributed</u> sites

* **enter deep**: push CDN servers deep into many <u>access ISPs</u>
* **bring home**: smaller number of larger clusters in <u>Internet Exchange Points (IXPs)</u>

how a CDN works

* <u>intercept</u> the request via DNS so that it can
  1. determine a suitable CDN server cluster for that client at that time
  2. redirect the request to a server in that cluster

## 2.7 Socket Programming: Creating Network Applications

socket: door between application process and end-end transport protocol

### Socket Abstraction

Two socket types for two transport services

* UDP: unreliable datagram
* TCP: reliable, byte stream-oriented

### UDP sockets

UDP

* <u>no connection</u> between client and server
  * <u>no handshaking</u> before sending data
  
  * sender explicitly attaches <u>IP address</u> and <u>port #</u> to each packet
  
  * receiver does the same
  
* transmitted data may be lost or received out-of-date

* <u>unreliable</u> transfer of groups of bytes between client and server processes

client/server socket interaction

1. client: create socket <u>clientSocket</u>

   server: create socket <u>serverSocket</u>, bind port

2. client: create datagram with server IP address and Port, send datagram via clientSocket

3. server: read datagram from serverSocket

   server: write reply to serverSocket specifying client address, port number

4. client: read datagram

5. client: close clientSocket

### TCP sockets

client must contact server

* server process must <u>first</u> be running
* server must have <u>created socket</u> that welcomes client's contact

client contacts server by

* create TCP socket, specify IP address, port number

* when contacted by client, server TCP <u>creates new socket</u> for server process to communicate with that particular client (use the same port number)
  * can talk with <u>multiple</u> clients
  * <u>source port numbers</u> used to distinguish clients

Client/server socket interaction

1. server: create socket serverSocket, port=x

2. server: wait for incoming connection request

3. client: create socket, specify the server's name and port=x

4. TCP connection setup

5. server: connectionSocket is created

6. client: send request

7. server: read request from connectionSocket

8. server: write reply to connectionSocket

9. client: read reply

10. server: close connectionSocket

    client: close connectionSocket

