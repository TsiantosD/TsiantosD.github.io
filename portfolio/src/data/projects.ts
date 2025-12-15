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

In this project, we engineered a high-performance *GPU implementation* of the *Contrast Limited Adaptive Histogram Equalization (CLAHE)* algorithm using *CUDA C++*. The objective was to accelerate image contrast enhancement by migrating a sequential CPU workflow to a parallel architecture. We decomposed the workload by dividing images into tiles and computing local histograms using optimized shared memory and atomic operations to minimize global memory latency. The implementation featured a custom kernel for histogram clipping and redistribution, followed by bilinear interpolation to eliminate boundary artifacts. The final solution was optimized to avoid memory bank conflicts and maximize throughput (Mpixels/sec), demonstrating significant speedups over the reference CPU implementation.

![Diagram of the first step of the algorithm](/hpc/project4/first_step.png#medium)
![Diagram of the second step of the algorithm](/hpc/project4/second_step.png#small)

### Project 3
${contentSoon}

### Project 2
${contentSoon}

### Project 1
${contentSoon}
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
    content: contentSoon,
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
