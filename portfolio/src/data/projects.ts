export interface Project {
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  image: string;
  link: string;
  people: number;
}

export const projects = [
  {
    slug: "high-performance-computing",
    title: "High Performance Computing",
    description: "Five projects teaching the fundamentals of CUDA, x86 multi-core and single-core optimizations.",
    tags: ["HPC", "CUDA", "C", "C++", "OpenMP", "Intel V-Tune"],
    image: "/nvidia.jpeg",
    link: "https://github.com/TsiantosD/ECE415-High-Performance-Computing",
    people: 3,
    content: `
### Project 5 - N-Body
*In progress - due to Jan 9 2026*

### Project 4 - GPU CLAHE

[View report (PDF)](/hpc/project4/report-EN.pdf)

In this project, we engineered a high-performance **GPU implementation** of the **Contrast Limited Adaptive Histogram Equalization (CLAHE)** algorithm using **CUDA C++**. The objective was to accelerate image contrast enhancement by migrating a sequential CPU workflow to a parallel architecture. We decomposed the workload by dividing images into tiles and computing local histograms using optimized shared memory and atomic operations to minimize global memory latency. The implementation featured a custom kernel for histogram clipping and redistribution, followed by bilinear interpolation to eliminate boundary artifacts. The final solution was optimized to avoid memory bank conflicts and maximize throughput (Mpixels/sec), demonstrating significant speedups over the reference CPU implementation.

![Diagram of the first step of the algorithm](/hpc/project4/first_step.png#medium)
![Diagram of the second step of the algorithm](/hpc/project4/second_step.png#small)

### Project 3 - GPU Convolution
[View report (PDF)](/hpc/project3/report-EN.pdf)

Implemented a 2D convolution on a GPU using the CUDA programming environment. Our initial implementation was constrained by using only a single thread block, which limited us to processing very small images (up to 32x32) because we quickly ran out of available threads per block. To overcome this, we redesigned the solution to use multiple thread blocks organized into a square grid, allowing us to process much larger high-resolution images, such as 16384x16384, until we reached the physical limits of the Tesla K80's global memory.

A major challenge we addressed was "thread divergence," which occurred because our code used conditional if statements to check if the filter was sliding outside the image boundaries, causing threads to process data at different speeds. We optimized the algorithm by implementing image padding, which adds a temporary border around the source image so the filter logic remains uniform for every pixel. Additionally, we conducted a comparative analysis of computational accuracy and execution times using both floats and doubles, observing how higher precision significantly reduced rounding errors while impacting the speedup provided by the GPU.

![Grid structure of blocks, each containing threads. Example of CUDA threads structure.](/hpc/project3/grid.png#small)

### Project 2 - Parallel K-Means
[View report (PDF)](/hpc/project2/report-EN.pdf)

Parallelization of a sequential C implementation of the **k-means clustering algorithm**. Our objective was to leverage OpenMP to optimize the algorithm's execution on a multi-core Intel Xeon E5-2695 system. We began by profiling the application using Intel VTune Profiler to identify critical hotspots, specifically focusing on the object-to-cluster assignment loop and the centroid recalculation process.

Our experimental results demonstrated that using atomic directives was 27% faster than critical sections because it bypassed heavy synchronization locks through direct hardware support. Furthermore, we optimized the Euclidean distance calculation by utilizing SIMD (AVX2) instructions, allowing for the simultaneous processing of eight floating-point operations.

This project provided us with valuable experience in balancing synchronization overhead, vectorization, and thread distribution to achieve maximum speedup in shared-memory architectures.

### Project 1 - Sobel Operator
[View report (PDF)](/hpc/project1/report-EN.pdf)

Optimization of a **sequential C implementation** of the **Sobel Operator**, a discrete differentiation operator widely used in image processing for edge detection. Starting from a provided baseline, we iteratively applied code transformations to reduce execution time on the CPU while maintaining mathematical accuracy, verified through Peak Signal-to-Noise Ratio (PSNR) comparisons against a reference implementation. Our optimization strategy involved improving memory locality via **Loop Interchange**, reducing overhead through **Loop Unrolling** and **Function Inlining**, and enhancing instruction efficiency with **Loop Fusion**, **Loop Invariant Code Motion**, and **Common Subexpression Elimination**. We also performed **Strength Reduction**, replacing computationally expensive arithmetic with more efficient bitwise shifts and additions.

To validate our improvements, we conducted an experimental analysis using the **Intel OneAPI Base Toolkit** (icx), comparing our results across both non-optimized (-O0) and highly-optimized (-fast) compiler environments. Our final report analyzed these performance gains through detailed statistical processing—reporting the mean and standard deviation of 12-run averages and comprehensive graphical diagrams to illustrate the impact of each transformation on the system's microarchitecture.

![Plot of y = x+µ and y = log2(1+x), y = x+µ is used for the approximation of the fast square root.](/hpc/project1/logx.png#small)
`,
  },
  {
    slug: "embedded-systems",
    title: "Embedded Systems",
    description: "Three projects on a ZedBoard Zynq-7000 ARM/FPGA SoC Development Board and one on x86",
    tags: ["FPGA", "Arm", "x86", "Xilinx Vitis", "Xilinx Vivado", "C++", "OpenMP", "Intel V-Tune", "Intel Advisor"],
    image: "/fpga.jpg",
    link: "https://github.com/TsiantosD/ECE340-Embedded-Systems",
    people: 2,
    content: `
### Project 3 - FPGA Accelerated Smith-Waterman Algorithm

[View report (PDF)](/embedded/project3/report-EN.pdf)

We designed and implemented a hardware accelerator for the **Smith-Waterman local sequence alignment algorithm** on an **FPGA** to address the high computational complexity of genomic data analysis. To establish a performance baseline, we first developed optimized software implementations on **x86** and **Arm** architectures, utilizing anti-diagonal data layouts and OpenMP for parallelization. For the FPGA design, we utilized **High-Level Synthesis (HLS)** to execute a series of critical optimizations: reducing space complexity by replacing the full dynamic programming matrix with anti-diagonal BRAM buffers, maximizing memory bandwidth through array partitioning, and flattening memory write operations to eliminate pipeline bottlenecks. By refining branching logic and implementing optimal array rotation, we achieved an Iteration Interval (II) of 1. The final hardware implementation demonstrated a 3.3x speedup compared to the x86 software version.

![Similarity matrix of the Smith-Waterman algorithm](/embedded/project3/similarity_matrix.png#medium)
`,
  },
  {
    slug: "operating-systems",
    title: "Operating Systems",
    description: "Three projects on the basic functionality of an OS.",
    tags: ["Algorithms", "Unix", "C", "FUSE"],
    image: "/terminal.jpeg",
    link: "https://github.com/AcrispyCookie/ECE318/",
    people: 3,
    content: `
### Project 3 - Compressed Filesystem

[View report (PDF)](/os/project3/report-EN.pdf)

We implement a custom **non-volatile**, **block-level deduplicating file system** built on top of **FUSE**, extending the Big Brother File System (BBFS). The core idea is to reduce disk usage by identifying identical 4 KB data blocks across files and storing each unique block only once. Blocks are detected using SHA-1 hashing and managed in a centralized block repository, while files are represented as virtual sequences of block references. The design carefully handles dynamic file sizes, metadata consistency, while supporting standard filesystem operations such as **write**, **read**, **truncate**, and **delete**. 

Beyond basic functionality, the project tackles realistic filesystem challenges such as reference counting for **safe block deletion**, **free-space management** via a circular free list, and **partial defragmentation** to combat external fragmentation. A hierarchical directory structure is implemented using persistent metadata that is reconstructed in memory at mount time for performance. Correctness and robustness are validated through an automated **test suite written in Python**, covering block reuse, compression behavior, truncation semantics, defragmentation, and complex directory/file hierarchies. Overall, the project demonstrates practical operating systems concepts, including filesystem design trade-offs, metadata management, and performance-correctness balancing in user-space filesystems.

![List of free blocks.](/os/project3/free_blocks_list.png#small)
![Structure of the filesystem.](/os/project3/file_structure_memory.png#medium)
`,
  },
  {
    slug: "computer-organization-and-design",
    title: "Computer Organization & Design",
    description: "Nine projects related to the MIPS CPU architecture, microarchitecture and one for the x86 microarchitecture.",
    tags: ["MIPS", "Assembly", "Intel V-Tune", "Verilog", "C", "Python"],
    image: "/cpus.jpg",
    link: "https://github.com/TsiantosD/ECE219-Organization",
    people: 2,
    content: `
### Lab 8 - K-Means

[View report (PDF)](/organization/lab8/report-EN.pdf)

Improved the performance of a **K-Means algorithm written in C** achieving up to **3.3x speedup** compared to the original implementation. The goal of this lab was to learn how a high-level language such as C interacts with the underlying CPU's microarchitecture, specifically the caches and the branch predictor. Made profile-driven optimizations using intel **VTune** and **perf**, spotting bad code behavior such as big data structures, expensive computations, and cache evictions on power of two sized arrays.

The most important changes made were **loop interchange** and a more **efficient data layout** to achieve better cache locality, as well as the use of **Manhattan distance** instead of Euclidean distance, effectively reducing the overall runtime.

![Comparison between low and high color variety images. The first image runs faster since there are less branch mispredictions](/organization/lab8/lfh-hf_rgb-comparison.png#medium)  
`,
  },
  {
    slug: "hardware-security",
    title: "Hardware Security",
    description: "A covert attack capturing EM radiation from DDR RAM.",
    tags: ["GNU Radio", "Signal Processing", "Covert Attack", "C"],
    image: "/hardware-security/signal.jpg",
    link: "https://github.com/TsiantosD/ECE455-Hardware-Security",
    people: 3,
    content: `
### The attack

[View report (PDF)](/hardware-security/report-EN.pdf)

We designed and implemented a practical electromagnetic side-channel attack that exfiltrates data from an air-gapped system by exploiting unintended emissions from the DDR memory bus. The project includes a user-space C transmitter that bypasses CPU caches using non-temporal memory instructions to intentionally modulate DDR bus activity, and an SDR-based receiver (ADALM-PLUTO + GNU Radio) that demodulates the signal using On-Off Keying.

The system demonstrates reliable key exfiltration across physical distances without network connectivity, kernel privileges, or hardware modification. Beyond implementation, I analyzed timing jitter, cache hierarchy effects, noise sources, and BER limits, highlighting the real-world constraints of electromagnetic covert channels and the fragility of “air-gap” security assumptions.

![Picture of the setup. The ADALM-PLUTO SDR listening for EM radiation from the RAM of the target computer a meter away.](/hardware-security/setup.jpg#small)
`,
  },
  {
    slug: "cs50w-projects",
    title: "CS50W Projects",
    description: "Projects for the CS50’s Web Programming with Python and JavaScript online course.",
    tags: ["Web", "Django", "React", "Vue", "Docker", "Nginx", "Redis", "Python", "JavaScript"],
    image: "/ddb.jpg",
    link: "https://github.com/TsiantosD/CS50W",
    people: 1,
    content: `
### Capstone

*In progress*

### Project 4 - Network

A full-stack social network similar to Twitter, featuring user profiles, "Following" feeds, and real-time post editing. It utilizes **Django** for the backend and **JavaScript/React** concepts for front-end interactions like "Liking" posts without refreshing.

![](https://www.youtube.com/watch?v=RlF5D1EtAPY#youtube)

### Project 3 - Mail

A single-page email client that sends, receives, and archives emails without page reloads. This project focuses on **JavaScript** and **asynchronous API calls** to manage a dynamic inbox interface.

![](https://www.youtube.com/watch?v=zLzraCJc_Uo#youtube)

### Project 2 - Commerce

An eBay-like e-commerce auction site where users can create listings, place bids, and manage "Watchlists." Built with **Django**, it implements complex model relationships to handle comments, categories, and closed auctions.

![](https://www.youtube.com/watch?v=J2lydE5OlwU#youtube)

### Project 1 - Wiki

A Wikipedia-inspired markdown encyclopedia built with **Django**. Users can create, edit, and search for entries using Markdown syntax, featuring automated page generation and a random page explorer.

![](https://www.youtube.com/watch?v=oaAc0CkfcDU#youtube)

### Project 0 - Search

A front-end clone of Google’s search interface built with **HTML** and **CSS**, focusing on design and functional integration with Google’s search API via query strings.

![](https://www.youtube.com/watch?v=eBn5-zb0kO4#youtube)
`,
  },
  {
    slug: "uthapp",
    title: "UTH App",
    description: "Android application to view grades for University of Thessaly students.",
    tags: ["React Native", "TypeScript", "Django", "Python", "Nginx"],
    image: "/uthapp/stats.png",
    link: "https://github.com/TsiantosD/UthAppClient",
    people: 1,
    content: `
### The application

Published on **PlayStore** an android application. This app allows University of Thessaly students to easily view their grades and statistics from their phone. Made using **React Native** (Expo) and **Django**. Reached 7,500+ downloads and ∼2,500 daily active users. The app is currently discontinued.

![Designed using Figma. Special thanks to Panagiotis Nanousis at [nanousis.com](https://nanousis.com/) for the inspiration.](/uthapp/stats.png#medium)
`,
  }
  // {
  //   slug: "algorithms",
  //   title: "Algorithms",
  //   description: "One project and three sets of problems regarding algorithms and data structures.",
  //   tags: ["Algorithms", "Python", "Calculus I", "Calculus II"],
  //   image: "/network.png",
  //   link: "https://github.com/TsiantosD/ECE216-Algorithms/tree/main/coding-project",
  //   people: 3,
  //   content: ``,
  // },
];
