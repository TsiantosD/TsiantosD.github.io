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

const contentSoon = `Content will be added as soon as possible!`;

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
### Project 5
*In progress - due to Jan 9 2026*

### Project 4

[View report (PDF)](/hpc/project4/report-EN.pdf)

In this project, we engineered a high-performance **GPU implementation** of the **Contrast Limited Adaptive Histogram Equalization (CLAHE)** algorithm using **CUDA C++**. The objective was to accelerate image contrast enhancement by migrating a sequential CPU workflow to a parallel architecture. We decomposed the workload by dividing images into tiles and computing local histograms using optimized shared memory and atomic operations to minimize global memory latency. The implementation featured a custom kernel for histogram clipping and redistribution, followed by bilinear interpolation to eliminate boundary artifacts. The final solution was optimized to avoid memory bank conflicts and maximize throughput (Mpixels/sec), demonstrating significant speedups over the reference CPU implementation.

![Diagram of the first step of the algorithm](/hpc/project4/first_step.png#medium)
![Diagram of the second step of the algorithm](/hpc/project4/second_step.png#small)

### Project 3
[View report (PDF)](/hpc/project3/report-EN.pdf)

Implemented a 2D convolution on a GPU using the CUDA programming environment. Our initial implementation was constrained by using only a single thread block, which limited us to processing very small images (up to 32x32) because we quickly ran out of available threads per block. To overcome this, we redesigned the solution to use multiple thread blocks organized into a square grid, allowing us to process much larger high-resolution images, such as 16384x16384, until we reached the physical limits of the Tesla K80's global memory.

A major challenge we addressed was "thread divergence," which occurred because our code used conditional if statements to check if the filter was sliding outside the image boundaries, causing threads to process data at different speeds. We optimized the algorithm by implementing image padding, which adds a temporary border around the source image so the filter logic remains uniform for every pixel. Additionally, we conducted a comparative analysis of computational accuracy and execution times using both floats and doubles, observing how higher precision significantly reduced rounding errors while impacting the speedup provided by the GPU.

![Grid structure of blocks, each containing threads. Example of CUDA threads structure.](/hpc/project3/grid.png#small)

### Project 2
[View report (PDF)](/hpc/project2/report-EN.pdf)

Parallelization of a sequential C implementation of the **k-means clustering algorithm**. Our objective was to leverage OpenMP to optimize the algorithm's execution on a multi-core Intel Xeon E5-2695 system. We began by profiling the application using Intel VTune Profiler to identify critical hotspots, specifically focusing on the object-to-cluster assignment loop and the centroid recalculation process.

Our experimental results demonstrated that using atomic directives was 27% faster than critical sections because it bypassed heavy synchronization locks through direct hardware support. Furthermore, we optimized the Euclidean distance calculation by utilizing SIMD (AVX2) instructions, allowing for the simultaneous processing of eight floating-point operations.

This project provided us with valuable experience in balancing synchronization overhead, vectorization, and thread distribution to achieve maximum speedup in shared-memory architectures.

### Project 1
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
### Project 3

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
    content: contentSoon,
  },
  {
    slug: "algorithms",
    title: "Algorithms",
    description: "One project and three sets of problems regarding algorithms and data structures.",
    tags: ["Algorithms", "Python", "Calculus I", "Calculus II"],
    image: "/network.png",
    link: "https://github.com/TsiantosD/ECE216-Algorithms/tree/main/coding-project",
    people: 3,
    content: contentSoon,
  },
  {
    slug: "computer-organization-and-design",
    title: "Computer Organization & Design",
    description: "Nine projects related to the MIPS CPU architecture, microarchitecture and one for the x86 microarchitecture.",
    tags: ["MIPS", "Assembly", "Intel V-Tune", "Verilog", "C", "Python"],
    image: "/cpus.jpg",
    link: "https://github.com/TsiantosD/ECE219-Organization",
    people: 2,
    content: contentSoon,
  },
  {
    slug: "cs50w-projects",
    title: "CS50W Projects",
    description: "Projects for the CS50’s Web Programming with Python and JavaScript online course.",
    tags: ["Web", "Django", "React", "Vue", "Docker", "Nginx", "Redis", "Python", "JavaScript"],
    image: "/ddb.jpg",
    link: "https://github.com/TsiantosD/CS50W",
    people: 1,
    content: contentSoon,
  },
];
