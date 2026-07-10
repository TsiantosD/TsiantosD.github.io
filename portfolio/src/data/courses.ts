export interface Course {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  people: number;
  projects: Project[];
  grade?: number;
  members?: TeamMember[];
  inProgress?: boolean|null;
}

export interface Project {
  title: string;
  slug: string;
  description?: string|null;
  featured: boolean;
  image?: string|null;
  content: string;
  topOfClass?: string|null;
}

export interface TeamMember {
  name: string;
  linkedin?: string;
  avatar?: string;
}

const me: TeamMember = {
  name: "Tsiantos Dimitrios",
  linkedin: "https://linkedin.com/in/tsiantosd",
  avatar: "/me.jpg"
};
const tsogkas: TeamMember = {
  name: "Tsogkas Panagiotis Nikolaos",
  linkedin: "https://www.linkedin.com/in/panagiotis-nikolaos-tsogkas-650871293/"
}
const nikas: TeamMember = {
  name: "Nikas Jason", 
  linkedin: "https://www.linkedin.com/in/jason-nikas-b64163255/",
  avatar: "/team-members/nikas.jpeg"
};
const zerdalis: TeamMember = {
  name: "Zerdalis Christodoulos",
  linkedin: "https://www.linkedin.com/in/christodoulos-zerdalis-8a0839399/",
  avatar: "/team-members/zerdalis.jpeg"
}
const romanidis: TeamMember = {
  name: "Romanidis Angelos",
  linkedin: "",
  avatar: ""
}
const malakoudis: TeamMember = {
  name: "Malakoudis Harris",
  linkedin: "https://www.linkedin.com/in/harris-malakoudis-a22462309/",
  avatar: "/team-members/malakoudis.jpeg"
}
// const kalousis: TeamMember = {
//   name: "Kalousis Anastasios",
//   linkedin: "",
//   avatar: ""
// }
// const tsimponidis: TeamMember = {
//   name: "Tsimponidis Alexandros",
//   linkedin: "https://www.linkedin.com/in/alexandros-tsimponidis-9ab830248/",
//   avatar: ""
// }
const balamotis: TeamMember = {
  name: "Balamotis Panagiotis",
  linkedin: "https://www.linkedin.com/in/panagiotisbalamotis/",
  avatar: "/team-members/balamotis.jpeg"
}

export const courses = [
  {
    slug: "high-performance-computing",
    title: "High Performance Computing",
    description: "Five projects teaching the fundamentals of CUDA, x86 multi-core and single-core optimizations.",
    tags: ["HPC", "CUDA", "C", "C++", "OpenMP", "Intel V-Tune", "Nsight"],
    image: "/hpc/generic-supercomputer.jpg",
    link: "https://github.com/TsiantosD/ECE415-High-Performance-Computing",
    people: 3,
    grade: 9.5,
    members: [ me, nikas, tsogkas ],
    projects: [
      {
        slug: "nbody",
        title: "Project 5 - N-Body",
        featured: true,
        image: "/hpc/project5/nbody_simulation.png",
        description: "GPU-accelerated N-Body simulation.",
        topOfClass: "Top of class performance",
        content: `
[View report (PDF)](/hpc/project5/report-EN.pdf)

Starting from a sequential CPU baseline, the simulation was progressively optimized using **OpenMP** for multicore CPUs and **CUDA** for GPUs. The work examines multiple levels of parallelism, including **thread-level parallelism**, **SIMD vectorization**, **GPU kernel design**, **CUDA streams**, and **data-layout transformations**.

Key optimizations include dynamic scheduling and SIMD pragmas on the CPU, as well as GPU-specific techniques such as kernel separation, use of special function units, stream-based concurrency, structure-of-arrays data layouts for coalesced memory access, kernel fusion, coarsening, and branch divergence reduction. Performance was evaluated through repeated measurements, reporting throughput, execution time, and scaling improvements across versions.

The final GPU implementation achieves over two orders of magnitude speedup compared to the sequential CPU version, demonstrating a systematic approach to performance analysis, architectural awareness, and data-driven optimization on both CPUs and GPUs.

![Simulation of a galaxy with 4096 bodies and a black hole in the center. Visualized using matlab and ffmpeg.](/hpc/project5/nbody_simulation.gif)
![Memory flow of the program.](/hpc/project5/memory-flow.png)

\`\`\`gist
TsiantosD/51900a7f4e2e3523581583bdbe5dbf52
\`\`\``
      },
      {
        slug: "clahe",
        title: "Project 4 - CLAHE",
        featured: false,
        image: "/hpc/project4/second_step.png",
        description: "GPU-accelerated CLAHE.",
        content: `
[View report (PDF)](/hpc/project4/report-EN.pdf)

In this project, we engineered a high-performance **GPU implementation** of the **Contrast Limited Adaptive Histogram Equalization (CLAHE)** algorithm using **CUDA C++**. The objective was to accelerate image contrast enhancement by migrating a sequential CPU workflow to a parallel architecture. We decomposed the workload by dividing images into tiles and computing local histograms using optimized shared memory and atomic operations to minimize global memory latency. The implementation featured a custom kernel for histogram clipping and redistribution, followed by bilinear interpolation to eliminate boundary artifacts. The final solution was optimized to avoid memory bank conflicts and maximize throughput (Mpixels/sec), demonstrating significant speedups over the reference CPU implementation.

![Diagram of the first step of the algorithm](/hpc/project4/first_step.png#medium)
![Diagram of the second step of the algorithm](/hpc/project4/second_step.png#small)`
      },
      {
        slug: "convolution",
        title: "Project 3 - GPU Convolution",
        featured: false,
        content: `
[View report (PDF)](/hpc/project3/report-EN.pdf)

Implemented a 2D convolution on a GPU using the CUDA programming environment. Our initial implementation was constrained by using only a single thread block, which limited us to processing very small images (up to 32x32) because we quickly ran out of available threads per block. To overcome this, we redesigned the solution to use multiple thread blocks organized into a square grid, allowing us to process much larger high-resolution images, such as 16384x16384, until we reached the physical limits of the Tesla K80's global memory.

A major challenge we addressed was "thread divergence," which occurred because our code used conditional if statements to check if the filter was sliding outside the image boundaries, causing threads to process data at different speeds. We optimized the algorithm by implementing image padding, which adds a temporary border around the source image so the filter logic remains uniform for every pixel. Additionally, we conducted a comparative analysis of computational accuracy and execution times using both floats and doubles, observing how higher precision significantly reduced rounding errors while impacting the speedup provided by the GPU.

![Grid structure of blocks, each containing threads. Example of CUDA threads structure.](/hpc/project3/grid.png#small)`
      },
      {
        slug: "kmeans",
        title: "Project 2 - K-means",
        featured: false,
        content: `
[View report (PDF)](/hpc/project2/report-EN.pdf)

Parallelization of a sequential C implementation of the **k-means clustering algorithm**. Our objective was to leverage OpenMP to optimize the algorithm's execution on a multi-core Intel Xeon E5-2695 system. We began by profiling the application using Intel VTune Profiler to identify critical hotspots, specifically focusing on the object-to-cluster assignment loop and the centroid recalculation process.

Our experimental results demonstrated that using atomic directives was 27% faster than critical sections because it bypassed heavy synchronization locks through direct hardware support. Furthermore, we optimized the Euclidean distance calculation by utilizing SIMD (AVX2) instructions, allowing for the simultaneous processing of eight floating-point operations.

This project provided us with valuable experience in balancing synchronization overhead, vectorization, and thread distribution to achieve maximum speedup in shared-memory architectures.`
      },
      {
        slug: "sobel",
        title: "Projet 1 - Sobel",
        featured: true,
        image: "/hpc/project1/shibuya-before-after.png",
        description: "Optimized the Sobel operator on x86 CPU.",
        content: `
[View report (PDF)](/hpc/project1/report-EN.pdf)

Optimization of a **sequential C implementation** of the **Sobel Operator**, a discrete differentiation operator widely used in image processing for edge detection. Starting from a provided baseline, we iteratively applied code transformations to reduce execution time on the CPU while maintaining mathematical accuracy, verified through Peak Signal-to-Noise Ratio (PSNR) comparisons against a reference implementation. Our optimization strategy involved improving memory locality via **Loop Interchange**, reducing overhead through **Loop Unrolling** and **Function Inlining**, and enhancing instruction efficiency with **Loop Fusion**, **Loop Invariant Code Motion**, and **Common Subexpression Elimination**. We also performed **Strength Reduction**, replacing computationally expensive arithmetic with more efficient bitwise shifts and additions.

To validate our improvements, we conducted an experimental analysis using the **Intel OneAPI Base Toolkit** (icx), comparing our results across both non-optimized (-O0) and highly-optimized (-fast) compiler environments. Our final report analyzed these performance gains through detailed statistical processing—reporting the mean and standard deviation of 12-run averages and comprehensive graphical diagrams to illustrate the impact of each transformation on the system's microarchitecture.

![Plot of y = x+µ and y = log2(1+x), y = x+µ is used for the approximation of the fast square root.](/hpc/project1/logx.png#small)

\`\`\`gist
TsiantosD/44952094ffe543bf2c3225b7f2b51820
\`\`\`
`
      }
    ],
  },
  {
    slug: "parallel-computer-architecture",
    title: "Parallel Computer Architecture",
    description: "A 32-core RISC-V GPGPU-style accelerator implemented on a Zynq-7000 FPGA.",
    tags: ["Parallel Architecture", "GPGPU", "RISC-V", "FPGA", "Verilog", "Vivado", "Vitis", "C"],
    image: "/ece338-parallel-computer-architecture/kepler-diagram-cinematic.png",
    link: "https://github.com/PANAGIVTHS/ECE338-Parallel-Computer-Architecture",
    people: 3,
    grade: 9,
    members: [ me, nikas, tsogkas ],
    projects: [
      {
        title: "Simple GPGPU",
        slug: "simple-gpgpu",
        description: "A programmable 32-lane SIMD accelerator with a small RISC-V software stack and FPGA bring-up flow.",
        featured: true,
        image: "/ece338-parallel-computer-architecture/nbody-screenshot.png",
        content: `
[View report (PDF)](/ece338-parallel-computer-architecture/report-EN.pdf) · [View presentation (PDF)](/ece338-parallel-computer-architecture/presentation.pdf)

For the final project, we designed and implemented a **Simple GPGPU**: a custom **32-core lockstep SIMD accelerator** that executes a supported subset of **RISC-V** programs on the programmable logic of a **Digilent ZedBoard / Xilinx Zynq-7000 SoC**. The design keeps a shared instruction frontend for all lanes, while each streaming processor maintains its own register file, execution state, stack, and thread id. This makes the system simpler than a full GPU, but still captures the key architectural ideas of data-parallel execution, memory arbitration, host-controlled kernel launches, and accelerator/software co-design.

\`\`\`gist
TsiantosD/d50e3992bfeeed5b2d9e85009f8f5d38
\`\`\`

The hardware is written in **Verilog**, it is a 5-stage pipelined core with hazard detection, forwarding, branching, jumps, and a dedicated multi-cycle multiplier path mapped to FPGA DSP resources. The final Streaming Multiprocessor reuses the fetch/decode path across 32 processing lanes and connects them to dual-port BRAM through an **Nx2 memory crossbar**. The crossbar arbitrates simultaneous load/store requests, routes returning BRAM data back to the correct lane, and stalls the global pipeline safely when memory contention occurs.

![Minimal block diagram of the GPU.](/ece338-parallel-computer-architecture/block-diagram.png)

Beyond the RTL core, the project includes a complete bring-up and runtime flow. The accelerator is wrapped in a small SoC with a host controller, command processor, and **AXI GPIO** bridge to the Zynq Processing System. A lightweight ARM-side host program handles UART communication and translates external commands into memory-mapped PS-to-PL transactions, allowing a Python runner to load instruction memory, initialize data memory, start kernels, wait for completion, and dump results. The software stack compiles C kernels to bare-metal **RV32IM** code, generates instruction memory files, assigns per-lane stacks, exposes a **gpgpu_thread_id()** runtime helper, and keeps x86 reference implementations next to the RISC-V kernels for validation.

![Diagram of the GPGPU integration on the SoC, the processing system, and the host computer.](/ece338-parallel-computer-architecture/SoC-and-host.png#small)

Testing was a major part of the work. We built an automated test ecosystem with an assembler, Python golden model, RTL simulations, constrained-random program checking, and random instruction testing to stress forwarding, load-use hazards, branches, multiplication, memory operations, and crossbar behavior. The final design was also validated end-to-end on the FPGA board through the same host command flow used by the runtime.

The main demo workloads were an **N-body simulation** and a **Mandelbrot renderer**, chosen to exercise both memory behavior and integer/multiplier-heavy computation. In the N-body workload, the FPGA GPGPU simulated 32 bodies in roughly **129 μs per step**, compared with about **308 μs** on the ARM Cortex-A9 reference path, for an approximate **2.38× speedup** despite the FPGA fabric running at a much lower clock frequency. The final implementation reached about **1.23 GINTOPS** peak integer throughput at ~38.5 MHz, with LUT utilization close to the practical limit of the target FPGA. The largest remaining bottleneck is the UART-based host communication path, motivating future work such as AXI-Lite/AXI-DMA integration, PCIe-capable FPGA targets, more memory banking, floating-point support, warp scheduling, and divergence handling.

![Nbody running on the GPGPU on the ZedBoard setup. Output data of the simulation (x, y, and z coordinates of each body) are displayed using a custom browser visualizer with three-js.](/ece338-parallel-computer-architecture/fpga-demo.mp4#video)

\`\`\`slidedeck
title=Simple GPGPU Presentation
base=/ece338-parallel-computer-architecture/presentation
count=51
pdf=/ece338-parallel-computer-architecture/presentation.pdf
\`\`\`
`
      }
    ]
  },
  {
    slug: "embedded-systems",
    title: "Embedded Systems",
    description: "Three projects on a ZedBoard Zynq-7000 ARM/FPGA SoC Development Board",
    tags: ["FPGA", "Arm", "x86", "Xilinx Vitis", "Xilinx Vivado", "C++", "OpenMP", "Intel V-Tune", "Intel Advisor"],
    image: "/fpga.jpg",
    link: "https://github.com/TsiantosD/ECE340-Embedded-Systems",
    people: 2,
    grade: 9.5,
    members: [ me, zerdalis ],
    projects: [
      {
        slug: "fpga-accelerated-smith-waterman-algorithm",
        title: "FPGA Accelerated Smith-Waterman Algorithm",
        featured: true,
        image: "/embedded/project3/similarity_matrix.png",
        content: `
[View report (PDF)](/embedded/project3/report-EN.pdf)

We designed and implemented a hardware accelerator for the **Smith-Waterman local sequence alignment algorithm** on an **FPGA** to address the high computational complexity of genomic data analysis. To establish a performance baseline, we first developed optimized software implementations on **x86** and **Arm** architectures, utilizing anti-diagonal data layouts and OpenMP for parallelization. For the FPGA design, we utilized **High-Level Synthesis (HLS)** to execute a series of critical optimizations: reducing space complexity by replacing the full dynamic programming matrix with anti-diagonal BRAM buffers, maximizing memory bandwidth through array partitioning, and flattening memory write operations to eliminate pipeline bottlenecks. By refining branching logic and implementing optimal array rotation, we achieved an Iteration Interval (II) of 1. The final hardware implementation demonstrated a 3.3x speedup compared to the x86 software version.

![Similarity matrix of the Smith-Waterman algorithm](/embedded/project3/similarity_matrix.png#medium)
![Running the Smith-Waterman algorithm on the ZedBoard Zynq-7000 ARM/FPGA SoC Development Board](/embedded/project3/zedboard.png#medium)
          `
      }
    ]
  },
  {
    slug: "operating-systems",
    title: "Operating Systems",
    description: "Three projects on the basic functionality of an OS.",
    tags: ["Algorithms", "Unix", "C", "FUSE"],
    image: "/terminal.jpeg",
    link: "https://github.com/AcrispyCookie/ECE318/",
    people: 3,
    grade: 7.5,
    members: [ me, nikas, tsogkas ],
    projects: [
      {
        slug: "compressed-filesystem",
        title: "Compressed Filesystem",
        featured: true,
        image: "/os/project3/file_structure_memory.png",
        description: "User-level filesystem with FUSE.",
        content: `
[View report (PDF)](/os/project3/report-EN.pdf)

We implement a custom **non-volatile**, **block-level deduplicating file system** built on top of **FUSE**, extending the Big Brother File System (BBFS). The core idea is to reduce disk usage by identifying identical 4 KB data blocks across files and storing each unique block only once. Blocks are detected using SHA-1 hashing and managed in a centralized block repository, while files are represented as virtual sequences of block references. The design carefully handles dynamic file sizes, metadata consistency, while supporting standard filesystem operations such as **write**, **read**, **truncate**, and **delete**. 

Beyond basic functionality, the project tackles realistic filesystem challenges such as reference counting for **safe block deletion**, **free-space management** via a circular free list, and **partial defragmentation** to combat external fragmentation. A hierarchical directory structure is implemented using persistent metadata that is reconstructed in memory at mount time for performance. Correctness and robustness are validated through an automated **test suite written in Python**, covering block reuse, compression behavior, truncation semantics, defragmentation, and complex directory/file hierarchies. Overall, the project demonstrates practical operating systems concepts, including filesystem design trade-offs, metadata management, and performance-correctness balancing in user-space filesystems.

![List of free blocks.](/os/project3/free_blocks_list.png#small)
![Structure of the filesystem.](/os/project3/file_structure_memory.png#medium)
`
      },
      {
        slug: "scheduling",
        title: "Scheduling",
        featured: false,
        image: "/os/project2/gantt.png",
        description: "",
        content: `
[View report (PDF)](/os/project2/report-EL.pdf)

This project involves the implementation and experimental analysis of **scheduling algorithms** within an operating system, specifically comparing the classic **Shortest Job First** (SJF) algorithm with a variation designed for **starvation avoidance**. Through profiling, the study demonstrated that while SJF selects the process with the shortest expected burst time, it often leads to the "starvation" of non-interactive processes when faced with a continuous flow of interactive requests. The proposed solution utilizes a "goodness score" index that factors in both the expected burst time and the waiting time in the ready queue. The findings conclude that this variation ensures a fairer distribution of CPU resources, allowing all processes a chance to execute despite the slightly higher computational overhead imposed on the scheduler.

![Gantt chart of the modified SJF running four IO processes.](/os/project2/gantt.png#medium)
![Modified SJF's priorities.](/os/project2/sjf-mod-plain.png#medium)
        `
      }
    ]
  },
  {
    slug: "computer-organization-and-design",
    title: "Computer Organization & Design",
    description: "Nine projects related to the MIPS CPU architecture, microarchitecture and one for the x86 microarchitecture.",
    tags: ["MIPS", "Assembly", "Intel V-Tune", "Verilog", "C", "Python"],
    image: "/cpus.jpg",
    link: "https://github.com/TsiantosD/ECE219-Organization",
    people: 2,
    grade: 8.0,
    members: [ me, romanidis ],
    projects: [
      {
        slug: "kmeans",
        title: "Lab 8 - K-Means",
        featured: true,
        image: "/organization/lab8/andromeda_comparison.png",
        description: "Optimized K-Means on x86.",
        content: `
[View report (PDF)](/organization/lab8/report-EN.pdf)

Improved the performance of a **K-Means algorithm written in C** achieving up to **3.3x speedup** compared to the original implementation. The goal of this lab was to learn how a high-level language such as C interacts with the underlying CPU's microarchitecture, specifically the caches and the branch predictor. Made profile-driven optimizations using intel **VTune** and **perf**, spotting bad code behavior such as big data structures, expensive computations, and cache evictions on power of two sized arrays.

The most important changes made were **loop interchange** and a more **efficient data layout** to achieve better cache locality, as well as the use of **Manhattan distance** instead of Euclidean distance, effectively reducing the overall runtime.

![Comparison between low and high color variety images. The first image runs faster since there are less branch mispredictions](/organization/lab8/lfh-hf_rgb-comparison.png#medium)
![Image of andromeda. Original vs processed with K-means (k = 4)](/organization/lab8/andromeda_comparison.png#medium)`
      }
    ]
  },
  {
    slug: "wireless-comunications",
    title: "Wireless Communications",
    description: "One project modifying the Ath9k Wi-Fi (IEEE 802.11) driver.",
    tags: ["Networks", "IEEE 802.11", "Drivers", "Operating Systems", "C", "Python", "NITLab"],
    image: "/wireless-communications/nitos-indoor.jpeg",
    link: "https://github.com/TsiantosD/ECE436-Wireless-Communications",
    people: 3,
    grade: 10,
    members: [ me, nikas, balamotis ],
    projects: [
      {
        title: "Wi-Fi Jammer",
        slug: "wifi-jammer",
        description: "IEEE 802.11 medium-access unfairness experiments with a modified ath9k driver.",
        featured: true,
        image: "/wireless-communications/nitos-indoor.jpeg",
        content: `
[View report (PDF)](/wireless-communications/report-EN.pdf) · [View presentation (PDF)](/wireless-communications/presentation.pdf)

For the final project, we built a controlled **Wi-Fi jammer** by modifying the Linux **ath9k** driver from the kernel backports tree and exposing custom module parameters for unfair medium access. The implementation experimented with **CSMA/CA** behavior by forcing contention-window values, disabling hardware backoff through ath9k registers, optionally forcing the channel-idle signal, and configuring custom TXOP durations. Experiments were executed on the University of Thessaly **NITLab Indoor RF Isolated Testbed**, using real Wi-Fi nodes, hostapd, iw, iperf traffic generation, and repeatable driver deployment scripts.

A major challenge was making low-level MAC-layer changes reproducible on remote testbed nodes while keeping the results measurable and comparable. We built automation around patch generation, backports compilation, module loading, topology setup, log collection, and CSV/plot generation, then extended the experiments to two-link scenarios with channel-switch behavior. Python tooling using **Scapy**, UDP control messages, and hostapd channel-switch announcements helped coordinate AP movement and unfair-station following, while the analysis focused on throughput, jitter, packet loss, and the practical limits of manipulating 802.11 fairness from inside a commodity driver.

![Image of the university's Indoor RF Isolated Testbed.](/wireless-communications/nitos-indoor.jpeg)

In the two-AP experiment of Section 5.4, we evaluated whether the unfair station could keep dominating the medium even when the fair link attempted to escape by switching channels. The topology used two independent AP-STA pairs, both initially operating on the same channel: STA1 used the normal fair driver, while STA2 used the modified unfair driver with backoff disabled. During the run, AP1 issued a Channel Switch Announcement to move the fair link to channel 6; the unfair side monitored these CSA beacons with a Scapy-based hunter and instructed AP2 to follow the same channel through a UDP-controlled hostapd channel switch. The resulting measurement shows that the fair STA briefly recovers around the switch event but quickly collapses back to only a few Mbit/s, while the unfair STA remains close to or above 100 Mbit/s, demonstrating that the driver-level backoff manipulation can continue starving the fair link even under dynamic channel movement.

![Receiver bandwidth over time for Topology 4. Both stations offer 150 Mbit/s; after the channel-switch events around 30-32 seconds, the unfair STA remains dominant while the fair STA stays near zero throughput.](/wireless-communications/topology-4-throughput.webp)

![Topology 4: two independent AP-STA links on the same channel, with STA1 using the fair driver and STA2 using the unfair driver.](/wireless-communications/topology-4.png#medium)

\`\`\`slidedeck
title=Wi-Fi Jammer Presentation
base=/wireless-communications/presentation
count=33
pdf=/wireless-communications/presentation.pdf
\`\`\`
`
      }
    ]
  },
  {
    slug: "radhard-circuit-design",
    title: "Radhard Circuit Design",
    description: "Simulating Single Event Upsets, Single Event Transients, measuring Soft Error Rate and exploring mitigation techniques.",
    tags: ["Radiation Hardening", "Simulations", "Circuits", "C", "CUDA", "HPC"],
    image: "/radhard-circuit-design/cosmic-rays.jpg",
    link: "https://github.com/TsiantosD/ECE484-Radhard-Circuit-Design",
    people: 1,
    grade: 9.5,
    members: [ me ],
    projects: [
      {
        title: "Soft Error Rate Logic Simulation",
        slug: "seus-simulator",
        description: "A custom gate-level netlist parser and simulator for Single Event Transients and Soft Error Rate estimation.",
        featured: false,
        image: "/radhard-circuit-design/s27-circuit.png",
        content: `
![Flow diagram of the simulation algorithm.](/radhard-circuit-design/flow-diagram.png)

The first project of **Radhard Circuit Design** was a custom **gate-level simulator** written in **C** for post-synthesis Verilog circuits. The assignment started from a parser that reads a synthesized netlist, reconstructs the circuit connectivity, and stores the design in explicit **Node** and **Gate** structures. Primary inputs, internal wires, primary outputs, gates, flip-flop-related nodes, and levelized gate groups are kept in arrays of pointers so that the circuit can be evaluated in topological order.

![Generated visualization of the s27 benchmark circuit used to inspect the parsed netlist and signal connectivity.](/radhard-circuit-design/s27-circuit.png)

After parsing, the simulator performs **logic simulation** for every primary-input vector. Flip-flops are modeled as simplified buffers for the assignment: their outputs are treated as stable circuit inputs, with fixed values for Q and QN, while their input pins are used as observation points for propagated errors. The implementation supports the common synthesized gate types used in the benchmarks, including inverters and multi-input AND, OR, NAND, and NOR gates.

A key step is **levelization**. Each gate is assigned a logic level based on the levels of its input nodes, and gates with the same level are grouped together. This makes the simulation deterministic and efficient: the simulator evaluates the circuit level by level, stores node values, and also exports CSV files that can be used both for validation and for visualization.

![Core data structures used by the simulator: primary-input nodes, regular nodes, gates, flip-flop inputs, and a levelized array of gates.](/radhard-circuit-design/data-structures.png)

![Main C data types: Node entries store name, value, type, and level, while Gate entries store name, type, input/output node pointers, and level.](/radhard-circuit-design/data-types.png)

The second part extended the simulator from steady-state logic evaluation to **Single Event Transient (SET)** propagation. For each input vector, the circuit first reaches a steady state. Then eligible gates are selected as particle-strike locations: flip-flops are excluded, as are gates that directly drive a primary output or a flip-flop input. A strike is modeled as a temporary bit-flip at the selected gate output, and the simulator re-evaluates the downstream logic to check whether the error reaches at least one flip-flop input.

The final metric produced by the tool is the **Soft Error Rate (SER)**, computed as the fraction of simulated input-vector and gate-strike cases that result in a propagated error. The implementation was validated on the small **s27** benchmark by comparing the C simulator outputs against Verilog simulation results, while the exported node and level CSV files made the parsed netlist and the simulated signal states easier to inspect.

For the full circuit, the reported SER is therefore:

$$
SER_{circuit} = \\frac{N_{errors}}{N_{simulations}} = \\frac{\\sum_{v \\in V} \\sum_{g \\in G_{hit}} E(v,g)}{|V| \\cdot |G_{hit}|}
$$

where $V$ is the set of simulated input vectors, $G_{hit}$ is the set of eligible gates where an SET can be injected, and $E(v,g)$ is 1 when the injected transient propagates to a flip-flop input and 0 otherwise.`
      },
      {
        title: "CUDA Implementation Prototype",
        slug: "cuda-ser-simulator",
        description: "A CUDA backend prototype that maps independent SER simulation cases to GPU threads.",
        featured: false,
        content: `
After the semester ended, a second implementation explored how the **Soft Error Rate simulator** could be moved from a pointer-heavy CPU design to a **CUDA** backend. This work was carried out during the [HPC Workshop: Large Scale Scientific Computations](https://hpc-workshop.chemeng.ntua.gr/) at the School of Chemical Engineering in Athens, 6-9 July 2026, using the [NTUA Chemical Engineering computer center / Andromeda infrastructure](https://www.chemeng.ntua.gr/computer_center/).

The main change was to introduce a backend abstraction around the SER run. The original implementation remained available as a **legacy** backend, while new **x86/flat** and **cuda** paths could be selected from the build and run scripts. The executable gained timing-log support so that each run records the backend, benchmark, elapsed time, total simulations, number of hittable gates, soft-error count, and SER percentage.

To make the circuit suitable for GPU execution, the parsed netlist was converted into a **flat netlist** representation. Instead of following C pointers between **Node** and **Gate** structs, the CUDA path stores compact integer arrays: node values, primary-input node indices, DFF observation nodes, hittable gate indices, gate types, gate input offsets/counts, output-node indices, and levelized gate lists. This layout can be copied directly to device memory and avoids pointer chasing inside the kernel.

The CUDA kernel assigns **independent SER cases to GPU threads**. Each case corresponds to one input vector and one selected particle-strike gate. A thread reconstructs the input-vector state, runs the steady-state simulation, stores the golden DFF-input values, reruns the levelized circuit with one gate output flipped, and writes whether the transient propagated to a flip-flop input. The host then reduces the per-case error flags to compute the final SER.

The retained benchmark is **s1423**. The CPU baseline was run on my laptop with a **12th Gen Intel(R) Core(TM) i5-1235U** processor, while the CUDA run was executed on the HPC cluster with **NVIDIA Tesla M2050** GPUs:

| Backend | Platform | Total simulations | Soft errors | SER | Backend time |
| --- | --- | ---: | ---: | ---: | ---: |
| Legacy CPU | Laptop, 12th Gen Intel(R) Core(TM) i5-1235U | 90,963,968 | 37,341,184 | 41.05% | 645.15 s |
| CUDA | HPC cluster, NVIDIA Tesla M2050 and Intel Xeon X5660 | 90,963,968 | 37,341,184 | 41.05% | 382.85 s |

Caption: Backend time measures only the selected simulator backend execution time for the SER computation, excluding parsing, setup, teardown, and other total-program overhead.

The CUDA prototype preserved the same SER result and achieved a **1.69× speedup** over the legacy CPU backend, corresponding to about **40.7% less backend runtime** for this saved s1423 run.

More info on the Andromeda HPC cluster [here](https://www.chemeng.ntua.gr/computer_center/).`
      }
    ]
  },
  {
    slug: "hardware-security",
    title: "Hardware Security",
    description: "A covert attack capturing EM radiation from DDR RAM.",
    tags: ["GNU Radio", "Signal Processing", "Covert Attack", "C"],
    image: "/hardware-security/signal.jpg",
    link: "https://github.com/TsiantosD/ECE455-Hardware-Security",
    people: 3,
    grade: 10,
    members: [ me, nikas, tsogkas ],
    projects: [
      {
        title: "SDR-Based DDR Air-Gap Data Exfiltration",
        slug: "ddr-air-gap",
        description: "A covert attack capturing RAM's radiation.",
        featured: true,
        image: "/hardware-security/setup.jpg",
        content: `
[View report (PDF)](/hardware-security/report-EN.pdf)

We designed and implemented a practical **electromagnetic side-channel attack** that exfiltrates data from an **air-gapped system** by exploiting unintended **emissions from the DDR memory bus**. The project includes a user-space C transmitter that bypasses CPU caches using **non-temporal memory instructions** to intentionally modulate DDR bus activity, and an SDR-based receiver (**ADALM-PLUTO** and **GNU Radio**) that demodulates the signal using **On-Off Keying**.

The system demonstrates reliable key exfiltration across physical distances without network connectivity, kernel privileges, or hardware modification. Beyond implementation, I analyzed timing jitter, cache hierarchy effects, noise sources, and BER limits, highlighting the real-world constraints of electromagnetic covert channels and the fragility of “air-gap” security assumptions.

Managed to successfully transfer data up to two meters away with a bitrate of 128 bits per second.

![Picture of the setup. The ADALM-PLUTO SDR listening for EM radiation from the RAM of the target computer a meter away.](/hardware-security/setup.jpg#small)
![Capturing and decoding a message in real-time using GNU radio and a helper script.](/hardware-security/demo.gif)
`
      }
    ]
  },
  {
    slug: "inter-network-protocol-design",
    title: "Inter-network Protocol Design",
    description: "Implemented and simulated the Routing Information Protocol (RIP).",
    tags: ["TCP/IP", "Wireshark", "Docker", "Python"],
    image: "inter-network-protocol-design/globe-network.jpg",
    link: "https://github.com/TsiantosD/ECE441-Inter-network-Protocol-Design",
    people: 2,
    grade: 10,
    members: [ me, malakoudis ],
    projects: [
      {
        title: "Routing Information Protocol",
        slug: "routing-information-protocol",
        description: "Implemented and simulated the Routing Information Protocol (RIP).",
        featured: true,
        image: "inter-network-protocol-design/routing-tables.png",
        content: `
Implemented and simulated the **Routing Information Protocol - RIP** using **Python**, **Docker**, and **Google Protocol Buffers**, as a part of the optional course assignment. Created a virtual network with Docker Compose and added python **Unit Tests** to ensure the implementation's correctness and stability. Implemented the following:

- Real-time monitoring of routing tables
- Avoid routing loops with split horizon, poision reverse, and infinity count of 16
- Triggered updates to ensure fast convergence

![Example network topology.](/inter-network-protocol-design/topology.png#medium)
![Real-time routing tables monitoring.](/inter-network-protocol-design/routing-tables.png#small)
`
      }
    ]
  },
  {
    slug: "cs50w-projects",
    title: "CS50W Projects",
    description: "Projects for the CS50’s Web Programming with Python and JavaScript online course.",
    tags: ["Web", "Django", "React", "Vue", "Docker", "Nginx", "Redis", "Python", "JavaScript"],
    image: "/ddb.jpg",
    link: "https://github.com/TsiantosD/CS50W",
    people: 1,
    members: [ me ],
    projects: [
//       {
//         title: "Capstone",
//         slug: "capstone",
//         description: "",
//         featured: false,
//         image: "",
//         content: `
// *In progress*`
//       },
      {
        title: "Project 4 - Network",
        slug: "",
        description: "",
        featured: false,
        image: "",
        content: `
A full-stack social network similar to Twitter, featuring user profiles, "Following" feeds, and real-time post editing. It utilizes **Django** for the backend and **JavaScript/React** concepts for front-end interactions like "Liking" posts without refreshing.

![](https://www.youtube.com/watch?v=RlF5D1EtAPY#youtube)`
      },
      {
        title: "Project 3 - Mail",
        slug: "",
        description: "",
        featured: false,
        image: "",
        content: `
A single-page email client that sends, receives, and archives emails without page reloads. This project focuses on **JavaScript** and **asynchronous API calls** to manage a dynamic inbox interface.

![](https://www.youtube.com/watch?v=zLzraCJc_Uo#youtube)`
      },
      {
        title: "Project 2 - Commerce",
        slug: "",
        description: "",
        featured: false,
        image: "",
        content: `
An eBay-like e-commerce auction site where users can create listings, place bids, and manage "Watchlists." Built with **Django**, it implements complex model relationships to handle comments, categories, and closed auctions.

![](https://www.youtube.com/watch?v=J2lydE5OlwU#youtube)`
      },
      {
        title: "Project 1 - Wiki",
        slug: "",
        description: "",
        featured: false,
        image: "",
        content: `
A Wikipedia-inspired markdown encyclopedia built with **Django**. Users can create, edit, and search for entries using Markdown syntax, featuring automated page generation and a random page explorer.

![](https://www.youtube.com/watch?v=oaAc0CkfcDU#youtube)`
      },
      {
        title: "Project 0 - Search",
        slug: "",
        description: "",
        featured: false,
        image: "",
        content: `
A front-end clone of Google’s search interface built with **HTML** and **CSS**, focusing on design and functional integration with Google’s search API via query strings.

![](https://www.youtube.com/watch?v=eBn5-zb0kO4#youtube)`
      }
    ]
  },
  {
    slug: "uthapp",
    title: "UTH App",
    description: "Android application to view grades for University of Thessaly students.",
    tags: ["React Native", "TypeScript", "Django", "Python", "Nginx"],
    image: "/uthapp/stats.png",
    link: "https://github.com/TsiantosD/UthAppClient",
    people: 1,
    members: [ me ],
    projects: [
      {
        title: "The application",
        slug: "",
        description: "",
        featured: false,
        image: "",
        content: `
Published on **PlayStore** an android application. This app allows University of Thessaly students to easily view their grades and statistics from their phone. Made using **React Native** (Expo) and **Django**. Reached 7,500+ downloads and ∼2,500 daily active users. The app is currently discontinued.

![Designed using Figma. Special thanks to Panagiotis Nanousis at [nanousis.com](https://nanousis.com/) for the inspiration.](/uthapp/stats.png#medium)`
      }
    ]
  }
];
