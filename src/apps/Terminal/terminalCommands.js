import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';
import { experienceData, leadershipData } from '../../data/experience';
import { educationData } from '../../data/education';
import { certificationsData } from '../../data/certifications';
import { linksData } from '../../data/links';
import {
  resolveDirectoryNode,
  resolvePath,
  resolveFileNode,
} from './terminalUtils';

/**
 * Command Execution Engine
 * Returns an object: { type: string, content: any, newPath?: string[], clear?: boolean }
 */
export function executeTerminalCommand(parsed, currentPath, context = {}) {
  const { command, args, raw } = parsed;
  const { openWindow } = context;

  if (!command) {
    return { type: 'empty' };
  }

  switch (command) {
    // ----------------------------------------------------
    // SYSTEM & UTILITY COMMANDS
    // ----------------------------------------------------
    case 'help': {
      return {
        type: 'help',
        content: `Available commands:

System
  whoami          Display identity and developer role
  pwd             Print current working directory
  uname           System operating environment summary
  date            Display local browser date and time

Navigation
  ls              List directory contents
  cd <dir>        Change directory (support .., ~, relative paths)
  cat <file>      Read file content
  open <target>   Launch window or external link

Portfolio
  about           Concise professional biography
  skills          Categorized technical skills & tools
  projects        Interactive portfolio projects showcase
  experience      Work experience and internships
  education       Academic background and credentials
  certifications  Professional certifications
  contact         Contact email and network profiles

External
  github          Open GitHub repository profile
  linkedin        Open LinkedIn career profile
  resume          View and open resume

Utilities
  clear / cls     Clear terminal screen
  echo <text>     Print text to console
  neofetch        System & developer profile banner
  help            Display this command guide`,
      };
    }

    case 'clear':
    case 'cls': {
      return { type: 'clear', clear: true };
    }

    case 'whoami': {
      return {
        type: 'text',
        content: `${profileData.name}

${profileData.title}
${profileData.subtitle}

Hometown: Jaipur, Rajasthan, India
College:  UPES, Dehradun
Phone:    ${profileData.phone}
Email:    ${profileData.email}`,
      };
    }

    case 'pwd': {
      const fullPath = currentPath.length === 0 ? '/home/chirrayu' : `/home/chirrayu/${currentPath.join('/')}`;
      return {
        type: 'text',
        content: fullPath,
      };
    }

    case 'uname': {
      return {
        type: 'text',
        content: `ChirrayuOS 26.1.0 Darwin Kernel Version 24.0.0 (x86_64/arm64-web)`,
      };
    }

    case 'date': {
      return {
        type: 'text',
        content: new Date().toString(),
      };
    }

    case 'echo': {
      return {
        type: 'text',
        content: args.join(' '),
      };
    }

    // ----------------------------------------------------
    // VIRTUAL FILESYSTEM NAVIGATION
    // ----------------------------------------------------
    case 'ls': {
      const dirNode = resolveDirectoryNode(currentPath);
      if (!dirNode || !dirNode.children) {
        return { type: 'text', content: '' };
      }

      const items = Object.entries(dirNode.children).map(([name, node]) => ({
        name,
        type: node.type,
      }));

      return {
        type: 'ls',
        items,
      };
    }

    case 'cd': {
      const target = args[0];
      if (!target || target === '~') {
        return { type: 'text', content: '', newPath: [] };
      }

      const newPath = resolvePath(target, currentPath);
      if (newPath === null) {
        return {
          type: 'error',
          content: `cd: no such file or directory: ${target}`,
        };
      }

      return {
        type: 'text',
        content: '',
        newPath,
      };
    }

    case 'cat': {
      const filename = args[0];
      if (!filename) {
        return {
          type: 'error',
          content: 'cat: missing file argument',
        };
      }

      const node = resolveFileNode(filename, currentPath);
      if (!node) {
        return {
          type: 'error',
          content: `cat: ${filename}: No such file or directory`,
        };
      }

      if (node.type === 'dir') {
        return {
          type: 'error',
          content: `cat: ${filename}: Is a directory`,
        };
      }

      return {
        type: 'text',
        content: node.content,
      };
    }

    // ----------------------------------------------------
    // PORTFOLIO COMMANDS
    // ----------------------------------------------------
    case 'about': {
      return {
        type: 'text',
        content: `${profileData.name}

${profileData.bio}

Core Competencies:
${profileData.roles.map((r) => `  • ${r}`).join('\n')}

Email:    ${profileData.email}
GitHub:   ${linksData.github}
LinkedIn: ${linksData.linkedin}`,
      };
    }

    case 'skills': {
      let output = `Technical Skill Set:\n────────────────────────────────────────────\n`;
      for (const [category, items] of Object.entries(skillsData)) {
        output += `\n${category}\n`;
        output += `  ${items.join('  •  ')}\n`;
      }
      return {
        type: 'text',
        content: output.trim(),
      };
    }

    case 'projects': {
      const targetArg = args[0];
      if (targetArg) {
        const num = parseInt(targetArg, 10);
        const proj =
          !isNaN(num) && num > 0 && num <= projectsData.length
            ? projectsData[num - 1]
            : projectsData.find(
                (p) =>
                  p.slug.toLowerCase() === targetArg.toLowerCase() ||
                  p.name.toLowerCase() === targetArg.toLowerCase()
              );

        if (proj) {
          return {
            type: 'text',
            content: `Project: ${proj.name}
Tagline: ${proj.tagline}
Category: ${proj.category}
Stack:   ${proj.techStack.join(', ')}

${proj.description}

Key Highlights:
${proj.highlights.map((h) => `• ${h}`).join('\n')}`,
          };
        }
      }

      let output = `Featured Projects Showcase:\n────────────────────────────────────────────\n`;
      projectsData.forEach((p, idx) => {
        const numStr = String(idx + 1).padStart(2, '0');
        output += `${numStr}  ${p.name.padEnd(24)} [${p.category}]\n    ${p.tagline}\n    Stack: ${p.techStack.join(', ')}\n\n`;
      });
      output += `Tip: Type 'projects <number>' (e.g. 'projects 1') for in-depth specifications.`;

      return {
        type: 'text',
        content: output,
      };
    }

    case 'experience': {
      let output = `Experience:\n────────────────────────────────────────────\n\n`;
      experienceData.forEach((exp) => {
        output += `• ${exp.role}\n  ${exp.organization} | ${exp.period}\n  Location: ${exp.location}\n\n  ${exp.description}\n  Skills: ${exp.skills.join(', ')}\n\n`;
      });
      if (leadershipData && leadershipData.length > 0) {
        output += `Leadership & Activities:\n────────────────────────────────────────────\n`;
        leadershipData.forEach((l) => {
          output += `\n• ${l.role}\n  ${l.description}\n`;
        });
      }
      return {
        type: 'text',
        content: output.trim(),
      };
    }

    case 'education': {
      let output = `Education & Credentials:\n────────────────────────────────────────────\n\n`;
      educationData.forEach((edu) => {
        output += `• ${edu.degree}\n  ${edu.institution} | ${edu.period}\n  Location: ${edu.location}\n  Focus: ${edu.focus}\n\n`;
        edu.highlights.forEach((h) => {
          output += `  - ${h}\n`;
        });
      });
      return {
        type: 'text',
        content: output.trim(),
      };
    }

    case 'certifications': {
      let output = `Certifications & Badges:\n────────────────────────────────────────────\n\n`;
      certificationsData.forEach((cert) => {
        output += `• ${cert.name}\n  Issued by: ${cert.issuer} (${cert.issued})\n  Field: ${cert.badge}\n\n`;
      });
      return {
        type: 'text',
        content: output.trim(),
      };
    }

    case 'contact': {
      return {
        type: 'text',
        content: `Contact Channels:
────────────────────────────────────────────
Email:     ${profileData.email}
Phone:     ${profileData.phone}
GitHub:    ${linksData.github}
LinkedIn:  ${linksData.linkedin}

Type 'open github' or 'open linkedin' to launch profiles directly.`,
      };
    }

    // ----------------------------------------------------
    // EXTERNAL LINKS & WINDOW ROUTING
    // ----------------------------------------------------
    case 'github': {
      window.open(linksData.github, '_blank', 'noopener,noreferrer');
      return {
        type: 'text',
        content: `Opening GitHub (${linksData.github})...`,
      };
    }

    case 'linkedin': {
      window.open(linksData.linkedin, '_blank', 'noopener,noreferrer');
      return {
        type: 'text',
        content: `Opening LinkedIn (${linksData.linkedin})...`,
      };
    }

    case 'resume': {
      if (openWindow) {
        openWindow('resume');
      }
      return {
        type: 'text',
        content: `Opening Resume...`,
      };
    }

    case 'open': {
      const target = (args[0] || '').toLowerCase();
      if (!target) {
        return {
          type: 'error',
          content: 'open: missing application target. Usage: open <projects|resume|github|linkedin|finder|terminal>',
        };
      }

      if (target === 'github') {
        window.open(linksData.github, '_blank', 'noopener,noreferrer');
        return { type: 'text', content: `Opening GitHub...` };
      }
      if (target === 'linkedin') {
        window.open(linksData.linkedin, '_blank', 'noopener,noreferrer');
        return { type: 'text', content: `Opening LinkedIn...` };
      }

      const validApps = ['terminal', 'finder', 'github', 'linkedin', 'safari', 'projects', 'resume', 'about', 'settings', 'trash'];
      if (validApps.includes(target)) {
        if (openWindow) {
          openWindow(target);
        }
        return {
          type: 'text',
          content: `Opening ${target.charAt(0).toUpperCase() + target.slice(1)}...`,
        };
      }

      return {
        type: 'error',
        content: `${target}.app is not installed yet.`,
      };
    }

    // ----------------------------------------------------
    // NEOFETCH SIGNATURE COMMAND
    // ----------------------------------------------------
    case 'neofetch': {
      return {
        type: 'neofetch',
        data: {
          user: `${profileData.handle}@${profileData.host}`,
          os: 'ChirrayuOS 26.1 (Darwin Web)',
          host: 'Interactive macOS Portfolio',
          kernel: 'WebAssembly / React 19.x Engine',
          uptime: '100% Client-Side',
          shell: 'zsh 5.9 (x86_64-portfolio)',
          terminal: 'macOS Terminal.app',
          theme: 'Sonoma Dark Frosted',
          projects: `${projectsData.length} Featured Repositories`,
          status: 'Building & Exploring',
          skills: 'Full Stack & Security',
        },
      };
    }

    // ----------------------------------------------------
    // EASTER EGGS
    // ----------------------------------------------------
    case 'matrix': {
      return {
        type: 'text',
        content: `Nice try.
This isn't that kind of portfolio.`,
      };
    }

    case 'coffee': {
      return {
        type: 'text',
        content: `☕ Brewing developer fuel...
Status: 100% Arabica extracted.
Ready to build more software.`,
      };
    }

    case 'sudo': {
      return {
        type: 'error',
        content: `zsh: command not found: sudo (User is already in secure guest mode)`,
      };
    }

    // ----------------------------------------------------
    // UNKNOWN COMMAND FALLBACK
    // ----------------------------------------------------
    default: {
      return {
        type: 'error',
        content: `zsh: command not found: ${command}`,
      };
    }
  }
}
