---
title: 2 The Application Layer
date: 2023-02-13 15:45:00 +0800
categories: [Basic, Computer Network]
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

### Two Styles of Interaction

#### Client-server Paradigm

**server**

* always-on host
* permanent IP address
* often in data centers

**clients**

* contact, communicate with server
* may be intermittently connected
* may have dynamic IP address
* do not communicate directly with each other (interact with servers)
* examples: HTTP, IMAP, FTP

#### Peer-peer Paradigms

* no always-on server

* arbitrary end systems directly communicate

* peers request service from other peers

  provide service in return to other peers

* peers are intermittently connected and change IP address (complex management)

* example: P2P file sharing

### Processes Communicating

**process**: program running with a host

* within same host, two processes communicate using **inter-process communication**(defined by OS)
* processes in different hosts communicate by exchanging **messages**

**client process**: process that initiates communication

**server process**: process that waits to be contacted

#### Sockets

process sends/receives messages to/from its socket

* sending process relies on transport infrastructure(transport layer, network layer, link layer and physical layer)
* two sockets involved, one on each side

#### Addressing

to receive messages, process must have **identifier**

* host device has unique 32-bit IP address
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

* some apps (file transfer) require 100% reliable data transfer
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

* unreliable data transfer
* does not provide: reliability, flow control, congestion control, timing, throughput guarantee, security, or connection setup
* can build additional services that are not provided by UDP on top of UDP in the application layer

| Application            | Application Layer Protocols | Transport Protocol |
| ---------------------- | --------------------------- | ------------------ |
| file transfer/download | FTP                         | TCP                |
| e-mail                 | SMTP                        | TCP                |
| Web documents          | HTTP                        | TCP or UDP         |
| Internet telephony     | SIP, RTP or proprietary     | TCP or UDP         |
| streaming audio/video  | HTTP, DASH                  | TCP                |
| interactive games      | WOW, FPS (proprietary)      | UDP or TCP         |

### Securing TCP

Transport Layer Security (TLS)

* on top of TCP socket
* provide encrypted TCP connection
* data integrity
* end-point authentication

## 2.2 The Web and HTTP

web page consists of **objects**, each of which can be stored on different Web servers

* objects: HTML file, JPEG image, Java applet, audio file, ...

web page consists of base HTML-file which includes several referenced objects, each addressable by a **URL**

* host name + path name

### HTTP: Hypertext Transfer Protocol

Web's application layer protocol

client/server model

* <u>client</u>: browser that requests, receives and displays web objects
* <u>server</u>: Web server sends objects in response to requests

HTTP request/response

**HTTP uses TCP**

* client initiates TCP connection(create socket) to server, port 80
* server accepts TCP connection from client
* HTTP message (application-layer protocol messages) exchanged between browser (HTTP client) and Web server (HTTP server)
* TCP connection closed

**HTTP is stateless**: server maintains no information about past client requests

* protocols that maintain state are <u>complex</u>

### HTTP connections

#### Non-persistent HTTP

download multiple objects required multiple connections

1. TCP connection opened
2. <u>at most one</u> object sent over TCP connection (send request/response message)
3.  TCP connection closed

response time

* RTT: time for a small packet to travel from client to server and back
* 1 RTT (initiate TCP connection) + 1 RTT (request file) + time to transmit file
* <u>2RTT + file transmission time</u>
* browsers often open multiple parallel TCP connections to fetch referenced objects in parallel

#### Persistent HTTP

mostly used

1. TCP connection opened
2. <u>multiple</u> objects can be sent over single TCP connection
   * server leaves connection open after sending response
   * subsequent HTTP messages between same client/server sent over open connect
   * client sends requests as soon as it encounters a referenced object
   * as little as <u>one RTT</u> for all the referenced objects
3. TCP connection closed

### HTTP messages

#### HTTP request messages

request line + header lines + carriage return (ASCII)

 general format

* request line: method, URL, version, cr if
* header lines: header field name: value, cr if *n
* cr if
* body: entity body

method

* **POST**: include form input; user input sent in entity body of HTTP POST request message
* **GET**: include user data in URL field of HTTP GET request message (follow a '?')
* **HEAD**: requests headers that would be returned if specified URL were requested with an HTTP GET method
* **PUT**: uploads new file to server; completely replaces file that exists at specified URL with content in entity body of POST HTTP request message

#### HTTP response messages

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

### HTTP cookies

Web site and client browser use **cookies** to maintain some state between transactions

four components

1. cookie header line of HTTP response message
2. cookie header line in next HTTP request messgae
3. cookie file kept on user's host, managed by user's browser
4. back-end database at Web site

What cookies can be used for

* authorization
* shopping carts
*  recommendations
* user session state

How to keep state

* at protocol endpoints
* in messages

### Web cashes

Goal: satisfy client requests without involving origin server

* user configures browser to point to a (local) Web cache
* browser sends all HTTP requests to cache
  * <u>if</u> object in cache: cache returns object to client
  * <u>else</u> cache requests object from origin server, caches received object, then returns object to client
* Web cache acts as both client and server
  * server for original requesting client
  * client to origin server
* server tells cache about object's allowable caching in response header
  * Cache-Control: max-age=\<seconds>
  * Cache-Control: no-cache

Why Web caching?

* reduce response time for client request
* reduce traffic on an institution's access link

### Conditional HTTP GET

Goal: don't send object if cache has <u>up-to-date</u> cached version

* client: specify date of cached copy in HTTP request

  if-modified-since: \<date>

* server: response contains no object if cached copy is up-to-date

  304 Not Modified

### HTTP/2

goal: decreased delay in multi-object HTTP requests

* transmission order of requested objects based on client-specified object priority (not FCFS)
* push unrequested objects to client
* divide objects into frames, schedule frames to mitigate HOL blocking (frame transmission interleaved)

## 2.3 Email (SMTP)

### Infrastructure

Three major components

* user agents
* mail servers
* simple mail transfer protocol: SMTP

**User Agent** (mail reader)

* composing, editing, reading mail messages

**Mail Servers**

* <u>mailbox</u>: contains incoming messages for user
* <u>message queue</u>: to be sent mail messages

**SMTP protocol**

* client: sending
* server: receiving

User -> User Agent - (SMTP) > Mail Server - (TCP connection, SMTP) -> Mail Server -> User Agent -> Another user

### SMTP: Simple Mail Transfer Protocol

uses TCP to reliably transfer email message from client to server (mail server initiating connection), port 25

#### three phases of transfer

1. SMTP handshaking (220, HELO, 250 Hello)
2. SMTP transfer of messages
3. SMTP closure

#### comparison with HTTP

* HTTP: client pull

  SMTP: client push

* both have ASCII command/response interaction, status codes

* HTTP: each object encapsulated in its own response message

  SMTP: multiple objects sent in multipart message

* SMTP uses persistent connection

* SMTP requires message (header & body) to be in 7-bit ASCII

* SMTP servers uses CRLF.CRLF to determine end of message

Mail message format

#### Mail access protocol

retrieval from server

*  IMAP: Internet Mail Access Protocol
* HTTP: web-based interface

## 2.4 The Domain Name Service: DNS

Internet hosts, routers

* IP address
* name

How to map between IP address and name?

### DNS structure, function

**distributed database** implemented in <u>hierarchy</u> of many name servers

**application-layer protocol**: hosts, DNS servers communicate to resolve names

DNS services

* hostname-to-IP-address translation
* host aliasing
* mail server aliasing (mail server's IP address)
* load distribution (decentralized): many IP addresses correspond to one name
* Why not centralize DNS?
  * single point of failure
  * traffic volume 
  * distant centralized database
  * maintenance

DNS: a distributed, hierarchical database

* Root DNS Servers: contact-of-last-resort by name servers that can not resolve name
  * important Internet function, provides security
  * 13 logical root name "servers"
* Top Level Domain: .com, .org, .edu
* Authoritative: yahoo.com
  * organization's own DNS servsers
* Local DNS name servers: when host makes DNS query, it is sent to its local DNS server
  * from its local cache of recent name-to-address translation pairs
  * forwarding request into DNS hierarchy for resolution

### Resolving DNS queries

**Iterated query**

* contacted server replies with name of server to contact
* keep contacting servers until find the target

**Recursive query**

* put burden of name resolution on contacted name server
* heavy load at upper levels of hierarchy

**Caching DNS information**: once name server learns mapping, it <u>caches</u> mapping and immediately returns a cached mapping in response to a query

* improves response time
* timeout after some time (TTL)
* TLD servers typically cached in local name servers
* cached entries may be out-of-date: may not be known until all TTLs expire

### DNS record format

Distributed database storing resource records (RR) format: (name, value, type, ttl)

* type=a
  * name is hostname
  * value is IP address
* type=NS
  * name is domain (e.g. foo.com)
  * value is hostname of authoritative name server for this domain
* type=CNAME
  * alias name
* type=MX
  * value is name of SMTP mail server associated with name

### DNS protocol messages

DNS query and reply message, both have same format

get your info into the DNS

1. register name at DNS registrar
   * provide names, IP addresses of authoritative name server
2. create authoritative server locally with the IP address

### DNS security

DDoS attacks

## 2.6 Video Streaming and Content Distribution Networks

stream video traffic: major consumer of Internet bandwidth

challenge

* <u>scale</u>
* <u>heterogeneity</u>: different users have different capabilities
  * wired & mobile
  * bandwidth rich & poor

solution: distributed, application-level infrastructure

### Video characteristics

sequence of images(frames) displayed at constant rate

* digital image: array of pixels
* coding: use <u>redundancy</u> within and between images to decrease bits used to encode image
  * spatial
  * temporal

video encoding methods

* constant bit rate (CBR): video encoding rate fixed
* variable bit rate (VBR): rate changes as amount of spatial, temporal coding changes

### Streaming stored video

main challenges

* server-to-client bandwidth will <u>vary</u> over time, with changing network congestion level
* packet <u>loss</u>, <u>delay</u> due to congestion will delay playout, or result in poor video quality

**streaming**: client plays out early part of video, while server still sending later part of it.

#### Buffering & playout

**continuous playout constraint**: during client video playout, playout timing must match original timing

* network delay problem -> client-side buffer is needed

other challenges

* client interactivity: pause, fast-forward, etc
* video packets may be lost and retransmitted

### DASH: Dynamic, Adaptive Streaming over HTTP

server

* divide video file into multiple <u>chunks</u>
* each chunk encoded at multiple different rates
* different rate encodings stored in different files
* files replicated in various CDN nodes
* <u>manifest file</u>: provides URLs for different chunks

client

* periodically estimates server-to-client bandwidth
* consulting manifest file, requests one chunk at a time
  * choose maximum coding rate sustainable given current bandwidth
  * can choose different rates at different points and from different servers

* intelligent one, determines
  * when to request
  * what encoding rate
  * where to request chunk


### Content Distribution Network(CDNs)

 challenge: how to stream content to hundreds of thousands of simultaneous users

store/serve multiple copies of videos at multiple geographically distributed sites

* enter deep: push CDN servers deep into many access networks
* bring home: smaller number of larger clusters near access nets

subscriber requests content, service provider returns manifest

* use manifest, client retrieves content at highest supportable rate
* may choose different rate or copy if network path congested

## 2.7 Socket Programming: Create Network Applications

socket: door between application process and end-end-transport protocol

### Socket Abstraction

Two socket types for two transport services

* UDP: unreliable datagram
* TCP: reliable, byte stream-oriented

### UDP sockets

UDP

* no connection between client and server

  * <u>no handshaking</u> before sending data

  * sender explicitly attaches IP address and port to each packet

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

* server process must first be running
* server must have created socket that welcomes client's contact

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

