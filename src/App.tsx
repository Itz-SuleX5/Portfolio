import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Database,
  Server,
  Menu,
  X,
} from 'lucide-react';
import { DinoGame } from './components/DinoGame';
import { ProjectCard } from './components/ProjectCard';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [text, setText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const texts = ['FULL STACK DEVELOPER', 'DJANGO', 'REACT'];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 1500;

  const homeRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    setIsMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      const currentText = texts[currentTextIndex];

      if (!isDeleting) {
        if (text.length < currentText.length) {
          setText(currentText.slice(0, text.length + 1));
          timeout = setTimeout(handleTyping, typingSpeed);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (text.length > 0) {
          setText(currentText.slice(0, text.length - 1));
          timeout = setTimeout(handleTyping, deletingSpeed);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    };

    timeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, currentTextIndex, isDeleting]);

  const skills = [
    {
      icon: <Code size={20} />,
      name: 'Frontend',
      items: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      icon: <Server size={20} />,
      name: 'Backend',
      items: ['Django', 'Python', 'REST APIs'],
    },
    {
      icon: <Database size={20} />,
      name: 'Database',
      items: ['PostgreSQL', 'Redis', 'MongoDB'],
    },
  ];

  const projects = [
    {
      title: 'YouTube Video Downloader',
      description:
        'A modern web application that allows users to download YouTube videos in various formats and qualities. Built with React for the frontend and Django for the backend, featuring a clean UI and efficient video processing.',
      tech: ['React', 'Django', 'Python', 'REST API'],
      image: 'https://api.microlink.io/?url=https://youtubedownloader-frontend.onrender.com&screenshot=true&meta=false&embed=screenshot.url',
      github: 'https://github.com/Itz-SuleX5/YouTubeDownloader',
      demo: 'https://youtubedownloader-frontend.onrender.com/',
    },
    {
      title: 'Dot Dager Portfolio Contest',
      description: 'A portfolio website created for YouTuber Dot Dager\'s portfolio contest. The challenge was to create the best portfolio website showcasing Dot Dager\'s content and achievements. Built with React and styled with Tailwind CSS, featuring smooth animations and responsive design.',
      tech: ['React', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
      image: 'https://api.microlink.io/?url=https://resplendent-granita-f96f1d.netlify.app&screenshot=true&meta=false&embed=screenshot.url',
      github: 'https://github.com/Itz-SuleX5/dot-dager-portfolio',
      demo: 'https://resplendent-granita-f96f1d.netlify.app/',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 w-full bg-gray-800 pixel-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <span className="text-cyan-400 text-xl">ItZ-SuleX5</span>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-cyan-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6">
              {[
                { label: 'HOME', ref: homeRef },
                { label: 'SKILLS', ref: skillsRef },
                { label: 'PROJECTS', ref: projectsRef },
                { label: 'CONTACT', ref: contactRef },
              ].map(({ label, ref }) => (
                <button
                  key={label}
                  onClick={() => scrollToSection(ref)}
                  className="text-sm hover:text-cyan-400 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
            <div className="flex flex-col gap-4">
              {[
                { label: 'HOME', ref: homeRef },
                { label: 'SKILLS', ref: skillsRef },
                { label: 'PROJECTS', ref: projectsRef },
                { label: 'CONTACT', ref: contactRef },
              ].map(({ label, ref }) => (
                <button
                  key={label}
                  onClick={() => scrollToSection(ref)}
                  className="text-sm hover:text-cyan-400 transition-colors text-left"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24">
        <section ref={homeRef} className="mb-20">
          <DinoGame />
          <div className="mt-12 text-center">
            <h1 className="text-4xl mb-4">Gerardo Alexis Anzora Aldana</h1>
            <div className="h-8">
              <span className="typewriter text-cyan-400">{text}</span>
            </div>
          </div>
        </section>

        <section ref={skillsRef} className="mb-20">
          <h2 className="text-2xl text-cyan-400 mb-8">SKILLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="pixel-border bg-gray-800 p-6">
                <div className="flex items-center gap-2 mb-4 text-cyan-400">
                  {skill.icon}
                  <h3 className="text-lg">{skill.name}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section ref={projectsRef} className="mb-20">
          <h2 className="text-2xl text-cyan-400 mb-8">PROJECTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>

        <section ref={contactRef} className="mb-20">
          <h2 className="text-2xl text-cyan-400 mb-8">CONTACT</h2>
          <div className="md:flex md:justify-center md:gap-8 hidden">
            <a href="#" className="pixel-button flex items-center gap-2">
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a href="#" className="pixel-button flex items-center gap-2">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a href="#" className="pixel-button flex items-center gap-2">
              <Mail size={20} />
              <span>Email</span>
            </a>
          </div>
          {/* Mobile scrolling contact links */}
          <div className="md:hidden overflow-hidden whitespace-nowrap">
            <div className="animate-scroll inline-flex gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="inline-flex gap-4">
                  <a href="#" className="pixel-button flex items-center gap-2">
                    <Github size={20} />
                    <span>GitHub</span>
                  </a>
                  <a href="#" className="pixel-button flex items-center gap-2">
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="#" className="pixel-button flex items-center gap-2">
                    <Mail size={20} />
                    <span>Email</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-4 text-center text-sm">
        <p> 2024 ItZ-SuleX5 - PRESS START TO CONNECT</p>
      </footer>
    </div>
  );
}

export default App;
