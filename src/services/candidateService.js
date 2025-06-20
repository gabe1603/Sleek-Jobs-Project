const userMock = {
  nome: localStorage.getItem("userName") || "Lucas Candidate",
  email: "candidate@email.com",
  about: "Passionate about technology, always learning and looking for new challenges. Experienced in React, Node.js and cloud solutions.",
  skills: ["React", "Node.js", "TypeScript", "AWS", "Agile", "UI/UX"],
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
};

const cvMock = {
  summary: "Motivated software developer with 5+ years of experience in web and cloud solutions. Strong problem-solving skills and a passion for continuous learning.",
  keySkills: ["React", "Node.js", "TypeScript", "AWS", "Agile", "UI/UX", "Teamwork", "Communication"],
  experience: [
    {
      role: "Fullstack Developer",
      organisation: "Sleek Training",
      start: "01/03/2021",
      end: "15/04/2024"
    },
    {
      role: "Front-end Developer",
      organisation: "WebWave",
      start: "10/01/2019",
      end: "28/02/2021"
    }
  ],
  education: [
    {
      degree: "Bachelor of Information Technology",
      institution: "University of Sydney",
      years: "2015 - 2018"
    }
  ],
  languages: ["English (fluent)", "Portuguese (native)", "Spanish (intermediate)"]
};

const vagasCandidatadasMock = [
  {
    id: 1,
    titulo: "Fullstack Developer",
    empresa: "Sleek Training",
    local: "Sydney, NSW",
    salario: "AU$ 90,000 - AU$ 110,000",
    status: "Under review",
    imagem: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    titulo: "Front-end Developer",
    empresa: "WebWave",
    local: "Melbourne, VIC",
    salario: "AU$ 75,000 - AU$ 100,000",
    status: "Interview",
    imagem: "https://randomuser.me/api/portraits/men/56.jpg"
  },
  {
    id: 3,
    titulo: "QA Tester",
    empresa: "QualityFirst",
    local: "Brisbane, QLD",
    salario: "AU$ 60,000 - AU$ 80,000",
    status: "Candidate",
    imagem: "https://randomuser.me/api/portraits/women/23.jpg"
  }
];

const candidateService = {
  getUser: () => userMock,
  getCV: () => cvMock,
  getAppliedJobs: () => vagasCandidatadasMock,
  // Futuramente: métodos para editar perfil, CV, candidatar-se, etc.
};

export default candidateService; 