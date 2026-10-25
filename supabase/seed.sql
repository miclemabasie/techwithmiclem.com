-- Seed data matching the design. Safe to run once on an empty schema.

insert into categories (name, slug, sort_order) values
  ('Systems','systems',1), ('Embedded','embedded',2), ('C++','cpp',3),
  ('Computer Architecture','computer-architecture',4), ('Linux','linux',5),
  ('Automotive','automotive',6), ('Projects','projects',7), ('Notes','notes',8);

insert into topics (name, sort_order) values
  ('C++',1),('STM32',2),('CAN',3),('Linux',4),('OS',5),('Architecture',6),('RAII',7),
  ('Docker',8),('Networking',9),('RTOS',10),('Automotive',11),('Robotics',12);

insert into posts (title, slug, excerpt, content, category_id, read_minutes, tags, published, published_at) values
('RAII in C++ — More Than Just a Convenience','raii-in-cpp',
 'RAII is often explained as a simple "use smart pointers" concept, but it''s actually a fundamental idea about resource management, exception safety and deterministic behavior. In this post, we''ll go deeper into why it matters, how it works…',
 E'RAII — Resource Acquisition Is Initialization — ties the lifetime of a resource to the lifetime of an object.\n\nWhen a constructor succeeds, the resource is owned. When the destructor runs, the resource is released. No matter how the scope is left — return, break, or exception — the destructor runs.\n\nThat guarantee is what makes exception-safe code possible without try/finally everywhere.',
 (select id from categories where slug='cpp'), 8, '{C++,RAII}', true, '2026-09-10'),
('What Actually Happens When a Program Runs?','what-happens-when-a-program-runs',
 'From high-level code to machine instructions, there''s a lot going on. This post breaks down the journey of your code through the CPU, including instruction fetch, decode, execution and how caches and memory fit into the process.',
 E'Your program starts life as text. The compiler lowers it to machine instructions, the linker lays them out, and the loader maps them into a process address space.\n\nFrom there the CPU fetches, decodes and executes instructions, pulling data through L1, L2 and L3 caches before touching RAM.',
 (select id from categories where slug='computer-architecture'), 10, '{Architecture,OS}', true, '2026-09-06'),
('STM32 Bare-Metal: Setting Up a Real Project','stm32-bare-metal-setup',
 'A complete guide to setting up a bare-metal project on STM32, from the toolchain to the first blink, with explanations of what''s happening under the hood and why each step matters.',
 E'Bare-metal means no HAL, no RTOS — just the reference manual, a linker script and a startup file.\n\nWe''ll set up the toolchain, write the vector table, configure the clock tree and toggle a GPIO.',
 (select id from categories where slug='embedded'), 12, '{STM32,Embedded}', true, '2026-09-02'),
('CAN Bus: How It Works in a Vehicle','can-bus-in-a-vehicle',
 'The CAN bus is the nervous system of modern vehicles. In this post, we''ll look at how messages are structured, how arbitration works, error handling and why it''s so reliable in harsh environments.',
 E'CAN is a multi-master, message-based serial bus. Every node sees every frame, and identifiers decide priority.\n\nArbitration is non-destructive: the lower identifier wins and the loser backs off without corrupting the frame.',
 (select id from categories where slug='automotive'), 9, '{CAN,Automotive}', true, '2026-08-28'),
('Building a High-Performance Log Ingestion Engine in C++','log-ingestion-engine',
 'A deep dive into designing a log ingestion pipeline capable of handling millions of events per second. We''ll cover the architecture, data structures, threading model, memory management and performance tuning.',
 E'The goal: millions of events per second on commodity hardware.\n\nWe use a sharded, lock-free ring buffer per producer, batch writes, and arena allocation to keep the hot path allocation-free.',
 (select id from categories where slug='systems'), 11, '{C++,Systems}', true, '2026-08-20'),
('Linux on ARM: A Practical Introduction','linux-on-arm-intro',
 'Getting comfortable with Linux on ARM devices opens the door to real embedded development. In this post, we''ll set up a Raspberry Pi, explore the filesystem, and look at what makes Linux powerful in embedded systems.',
 E'A Raspberry Pi is the cheapest way to get a real ARM Linux system on your desk.\n\nWe''ll flash an image, SSH in, and look at /proc, /sys and the device tree.',
 (select id from categories where slug='linux'), 7, '{Linux,Embedded}', true, '2026-08-14'),
('New Waves Resort: Connected Operations for a Smart Resort','new-waves-resort',
 'How we designed a networked system to connect CCTV, access control, IoT devices, booking and operations for a luxury resort in Cameroon.',
 E'A resort is a small city: cameras, door locks, point of sale, booking and building systems all need to talk.\n\nThis post walks through the network design, the VLAN layout and the software that ties it together.',
 (select id from categories where slug='projects'), 10, '{Networking,IoT}', true, '2026-08-08'),
('From C++ Object to Machine Code','cpp-object-to-machine-code',
 'What really happens when you create an object in C++? We''ll look at the memory layout, vtables, constructors, destructors and what the compiler actually generates.',
 E'Create an object and the compiler lays out its members, wires up a vtable pointer if it is polymorphic, and emits constructor code.\n\nWe''ll read the assembly to see exactly what that looks like.',
 (select id from categories where slug='cpp'), 9, '{C++,Architecture}', true, '2026-08-03'),
('The 4 Steps of an Embedded Control Loop','embedded-control-loop',
 'At the heart of most embedded systems is a simple loop. In this post, we''ll break down the sensing, processing, decision and actuation cycle with real examples.',
 E'1. Read sensors\n\n2. Process data\n\n3. Make decisions\n\n4. Control actuators\n\nEverything else in an embedded system is detail around this loop.',
 (select id from categories where slug='notes'), 5, '{Embedded,RTOS}', true, '2026-07-30');

insert into focus_items (title, detail, sort_order) values
 ('Deepening C++17/20','RAII, move semantics, templates',1),
 ('Computer Architecture','Inside the Machine',2),
 ('Operating Systems','OSTEP',3),
 ('STM32 bare-metal development',null,4),
 ('Automotive ECU simulation','CAN, sensors, diagnostics',5),
 ('Real-time systems',null,6),
 ('Building more. Learning more.',null,7);

insert into skills (title, icon, items, sort_order) values
 ('Systems Programming','cpu','{"C","C++17/20","STL","RAII","Templates","Concurrency","Memory"}',1),
 ('Computer Systems','monitor','{"Architecture","OS","Linux","Processes","Threads","Virtual Memory","Networking"}',2),
 ('Embedded','chip','{"STM32","ARM Cortex-M","Bare Metal","Interrupts","DMA","Timers","ADC","PWM"}',3),
 ('Communication','radio','{"CAN","SPI","I²C","UART","TCP/IP"}',4),
 ('Backend','database','{"Django","PostgreSQL","Redis","Celery","Docker"}',5),
 ('Hardware & Electronics','zap','{"Sensors","ADC","PWM","Motor Control","Power Management"}',6),
 ('Systems & Direction','compass','{"Automotive","Real-Time Systems","Robotics","Control Systems"}',7);

insert into tech_proof (label, icon, status, progress, sort_order) values
 ('C++','code','BUILT',90,1), ('Linux','terminal','BUILT',85,2), ('CAN','network','EXPLORING',45,3),
 ('RTOS','layers','STUDIED',65,4), ('Robotics','bot','EXPLORING',40,5), ('Computer Arch.','cpu','STUDIED',60,6);

insert into projects (title, slug, description, image_url, tags, link, featured, sort_order) values
 ('Automotive ECU Simulator','automotive-ecu-simulator','A software-defined vehicle environment for experimenting with ECU behavior, sensor data and diagnostics.',null,'{C++,CAN,Real-Time,Sensors}',null,true,1),
 ('High-Performance Log Engine','log-engine','A log ingestion pipeline built for high throughput, low latency and fault tolerance.',null,'{C++,Multithreading,Systems}',null,true,2),
 ('Network Digital Twin','network-digital-twin','A visual system for understanding network topology, VLANs and traffic behavior.',null,'{Python,Networking,Visualization}',null,true,3),
 ('Ngeme Resort Operations','ngeme-resort-operations','Networked infrastructure and operational software connecting hospitality, security, surveillance and IoT systems.',null,'{Django,IoT,CCTV,PMS}',null,true,4);

insert into roadmap (period, title, sort_order) values
 ('2026 – 2027','C++ Mastery',1),
 ('2026 – 2027','Computer Architecture + OS',2),
 ('2027 – 2028','Advanced Embedded / Automotive',3),
 ('2028 – 2030','Robotics + AI/ML',4),
 ('Beyond','Build, Contribute, Speak',5);
