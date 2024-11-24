import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tech,
  github,
  demo,
  image
}) => {
  return (
    <div className="relative group pixel-border bg-gray-800 p-4 transition-all duration-300 hover:scale-[1.02]">
      <div className="overflow-hidden mb-4">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover pixel-art transform transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="text-cyan-400 text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-300 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t) => (
          <span key={t} className="px-2 py-1 text-xs bg-gray-700 text-cyan-300">
            {t}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white hover:text-cyan-400"
          >
            <Github size={16} />
            Code
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white hover:text-cyan-400"
          >
            <ExternalLink size={16} />
            Demo
          </a>
        )}
      </div>
    </div>
  );
};