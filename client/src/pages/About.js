import React from 'react';

const About = () => (
  <div className="min-h-screen bg-[#F5F7FA] py-12">
    <div className="container-custom max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[#22356F] mb-2">Lakkireddy Varshitha</h1>
        <h2 className="text-xl text-accent-500 mb-4">Full Stack Developer | AI & Blockchain Enthusiast</h2>
        <a
          href="/resume_N1.pdf"
          download
          className="inline-block bg-primary-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-primary-700 transition mb-4"
        >
          Download Resume (PDF)
        </a>
        <p className="text-lg text-[#333] max-w-2xl mx-auto mb-6">
          I am a passionate and versatile Computer Science student with a strong foundation in software development, artificial intelligence, and full-stack web technologies. My work spans diverse areas such as Java development, MERN stack projects, AI/ML systems, and NLP applications. I am driven by innovation and real-world problem-solving, with a deep interest in creating intelligent systems that are both user-friendly and impactful.
        </p>
        <p className="text-lg text-[#333] max-w-2xl mx-auto">
          With hands-on experience from multiple internships, real-time projects, and active participation in tech communities and bootcamps, I constantly strive to enhance my skills and build solutions that matter. Whether it’s developing recommendation engines, AI-based mock interview systems, or blockchain-backed supply chain models, I always aim to integrate creativity, technology, and meaningful outcomes.
        </p>
      </div>

      {/* Experience Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-[#22356F] mb-4">Experience</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h4 className="font-semibold text-lg mb-1">Java Programming Intern — CodeAlpha</h4>
            <p className="text-sm text-[#333] mb-1">June 2024 – September 2024</p>
            <ul className="list-disc ml-5 text-[#333] text-sm mb-2">
              <li>Built Java-based applications with live project exposure.</li>
              <li>Projects: Hotel Reservation System (JDBC), Word Counter (Swing), Travel Booking System.</li>
              <li>Earned a Letter of Recommendation for exceptional performance.</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h4 className="font-semibold text-lg mb-1">Frontend Developer Intern — Synexoo</h4>
            <p className="text-sm text-[#333] mb-1">April 2024 – May 2024</p>
            <ul className="list-disc ml-5 text-[#333] text-sm mb-2">
              <li>Worked on HTML5, CSS, and JavaScript for modern web interfaces.</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h4 className="font-semibold text-lg mb-1">Python Developer — Devskillhub</h4>
            <p className="text-sm text-[#333] mb-1">March 2024 – May 2024</p>
            <ul className="list-disc ml-5 text-[#333] text-sm mb-2">
              <li>Developed Python applications and tools.</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h4 className="font-semibold text-lg mb-1">Python Intern — Oasis Infobyte</h4>
            <p className="text-sm text-[#333] mb-1">March 2024 – April 2024</p>
            <ul className="list-disc ml-5 text-[#333] text-sm mb-2">
              <li>Created Weather App, BMI Calculator, and Voice Assistant using Python and Tkinter.</li>
              <li>Built Blood Bank Management System using HTML, CSS, and JavaScript.</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h4 className="font-semibold text-lg mb-1">Salesforce Developer — SmartInternz</h4>
            <p className="text-sm text-[#333] mb-1">Nov 2023 – Jan 2024</p>
            <ul className="list-disc ml-5 text-[#333] text-sm mb-2">
              <li>Worked on Salesforce development projects.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-[#22356F] mb-4">Education</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-primary-50 rounded-xl p-6 shadow w-full">
            <h4 className="text-xl font-semibold mb-1">B.Tech in Computer Science & Engineering (AI & ML)</h4>
            <p className="text-secondary-600 mb-1">St. Martin's Engineering College, Hyderabad</p>
            <p className="text-secondary-400 text-sm">Nov 2022 – Aug 2026 | CGPA: 8.5</p>
          </div>
          <div className="bg-secondary-50 rounded-xl p-6 shadow w-full">
            <h4 className="text-xl font-semibold mb-1">Intermediate</h4>
            <p className="text-secondary-600 mb-1">Narayana Junior College, India</p>
            <p className="text-secondary-400 text-sm">Jun 2020 – May 2022 | Score: 95.5%</p>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-[#22356F] mb-4">Achievements</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-100 text-accent-500 text-xl">🏆</span>
            <span className="font-medium text-[#22356F]">Successfully completed Zuvy AFE Bootcamp, gaining advanced exposure in real-world software engineering.</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-highlight-100 text-highlight-600 text-xl">🤖</span>
            <span className="font-medium text-[#22356F]">GEN AI Learnthon — Sawit.ai: Completed The Fundamentals of GEN AI course. Built a hand-gesture-based Rock Paper Scissors game using deep learning.</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 text-xl">🚀</span>
            <span className="font-medium text-[#22356F]">Participated in Pragathi – Path to Future, enhancing my vision towards career and tech development.</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-100 text-accent-500 text-xl">📜</span>
            <span className="font-medium text-[#22356F]">Received Letter of Recommendation from CodeAlpha for excellence in the Java internship.</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-highlight-100 text-highlight-600 text-xl">💡</span>
            <span className="font-medium text-[#22356F]">Built and deployed several intelligent systems like Video Recommendation Engine, Personalized Healthcare Clustering, and Drug Traceability in Healthcare Supply Chain using Blockchain.</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 text-xl">🌐</span>
            <span className="font-medium text-[#22356F]">Participated in Vultr Cloud Hackathon, received $250 in credits, and built real-time, cloud-hosted AI/ML projects.</span>
          </div>
          {/* <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-100 text-accent-500 text-xl">🎮</span>
            <span className="font-medium text-[#22356F]">Unstop Playstorm Competition — "Meme Masters: The Corporate Chronicles": Submitted a unique gamified storytelling idea.</span>
          </div> */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-highlight-100 text-highlight-600 text-xl">👩‍💻</span>
            <span className="font-medium text-[#22356F]">Girls Script Summer of Code (GSSoC) — Contributor Aspirant.</span>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-[#22356F] mb-4">Skills</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h4 className="font-semibold mb-1">Programming Languages</h4>
            <p className="text-[#333]">Java, Python, JavaScript, C++</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h4 className="font-semibold mb-1">Web Development</h4>
            <p className="text-[#333]">HTML, CSS, JavaScript, React, Node.js, Express, MongoDB</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h4 className="font-semibold mb-1">AI/ML</h4>
            <p className="text-[#333]">Scikit-learn, TensorFlow, NLP, Artificial intelligence, Machine learning, Deep learning</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h4 className="font-semibold mb-1">Tools & Platforms</h4>
            <p className="text-[#333]">GitHub, Render, MySQL, VS Code</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h4 className="font-semibold mb-1">Other Domains</h4>
            <p className="text-[#333]">Blockchain (Ethereum), UI/UX Design, AI Interview Systems, Recommendation Engines</p>
          </div>
        </div>
      </div>

      {/* Contact & Profiles */}
      <div className="text-center mt-8">
        <a href="mailto:lakkireddyvarshithareddy@gmail.com" className="text-[#00BFAE] font-semibold underline mr-4">Email</a>
        <a href="https://github.com/varshitha127" target="_blank" rel="noopener noreferrer" className="text-[#22356F] font-semibold underline">GitHub</a>
      </div>
    </div>
  </div>
);

export default About; 