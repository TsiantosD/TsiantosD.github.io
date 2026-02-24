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

export const courses = [
  {
    slug: "high-performance-computing",
    title: "High Performance Computing",
    description: "Five projects teaching the fundamentals of CUDA, x86 multi-core and single-core optimizations.",
    tags: ["HPC", "CUDA", "C", "C++", "OpenMP", "Intel V-Tune", "Nsight"],
    image: "/nvidia.jpeg",
    link: "https://github.com/TsiantosD/ECE415-High-Performance-Computing",
    people: 3,
    grade: 9.5,
    members: [ me, nikas, tsogkas ],
    projects: [
      {
        slug: "nbody",
        title: "Project 5 - N-Body",
        featured: true,
        image: "/hpc/project5/memory-flow.png",
        description: "GPU-accelerated N-Body simulation.",
        topOfClass: "Top of class performace",
        content: `
[View report (PDF)](/hpc/project5/report-EN.pdf)

Starting from a sequential CPU baseline, the simulation was progressively optimized using **OpenMP** for multicore CPUs and **CUDA** for GPUs. The work examines multiple levels of parallelism, including **thread-level parallelism**, **SIMD vectorization**, **GPU kernel design**, **CUDA streams**, and **data-layout transformations**.

Key optimizations include dynamic scheduling and SIMD pragmas on the CPU, as well as GPU-specific techniques such as kernel separation, use of special function units, stream-based concurrency, structure-of-arrays data layouts for coalesced memory access, kernel fusion, coarsening, and branch divergence reduction. Performance was evaluated through repeated measurements, reporting throughput, execution time, and scaling improvements across versions.

The final GPU implementation achieves over two orders of magnitude speedup compared to the sequential CPU version, demonstrating a systematic approach to performance analysis, architectural awareness, and data-driven optimization on both CPUs and GPUs.

![Memory flow of the program.](/hpc/project5/memory-flow.png)

\`\`\`gist
TsiantosD/51900a7f4e2e3523581583bdbe5dbf52
\`\`\``
      },
      {
        slug: "clahe",
        title: "Project 4 - CLAHE",
        featured: true,
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
    slug: "embedded-systems",
    title: "Embedded Systems",
    description: "Three projects on a ZedBoard Zynq-7000 ARM/FPGA SoC Development Board and one on x86",
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

We designed and implemented a practical electromagnetic side-channel attack that exfiltrates data from an air-gapped system by exploiting unintended emissions from the DDR memory bus. The project includes a user-space C transmitter that bypasses CPU caches using non-temporal memory instructions to intentionally modulate DDR bus activity, and an SDR-based receiver (ADALM-PLUTO + GNU Radio) that demodulates the signal using On-Off Keying.

The system demonstrates reliable key exfiltration across physical distances without network connectivity, kernel privileges, or hardware modification. Beyond implementation, I analyzed timing jitter, cache hierarchy effects, noise sources, and BER limits, highlighting the real-world constraints of electromagnetic covert channels and the fragility of “air-gap” security assumptions.

![Picture of the setup. The ADALM-PLUTO SDR listening for EM radiation from the RAM of the target computer a meter away.](/hardware-security/setup.jpg#small)`
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
