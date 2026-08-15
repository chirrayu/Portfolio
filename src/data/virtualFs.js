import { profileData } from './profile';
import { projectsData } from './projects';
import { skillsData } from './skills';
import { linksData } from './links';

/**
 * Virtual In-Memory File System for Terminal navigation (ls, cd, cat, pwd).
 * Root is simulated at `/home/chirrayu` (~).
 */
export const virtualFs = {
  name: '~',
  type: 'dir',
  path: '/home/chirrayu',
  children: {
    'README.md': {
      type: 'file',
      name: 'README.md',
      content: `# Chirrayu Sharma — Developer & Engineer

B.Tech Computer Science Engineering student at UPES, Dehradun.
Focused on full-stack software development, automation, and cybersecurity.

Type 'help' to explore available commands.
Type 'neofetch' for a system overview.
Type 'projects' to view featured work.`,
    },
    'about.txt': {
      type: 'file',
      name: 'about.txt',
      content: `${profileData.name}
${profileData.title}

${profileData.bio}

Hometown:  Jaipur, Rajasthan, India
College:   UPES, Dehradun
Phone:     ${profileData.phone}
Email:     ${profileData.email}`,
    },
    'skills.txt': {
      type: 'file',
      name: 'skills.txt',
      content: Object.entries(skillsData)
        .map(([category, items]) => `${category}:\n  ${items.join(', ')}`)
        .join('\n\n'),
    },
    'contact.txt': {
      type: 'file',
      name: 'contact.txt',
      content: `Email:     ${profileData.email}
Phone:     ${profileData.phone}
GitHub:    ${linksData.github}
LinkedIn:  ${linksData.linkedin}`,
    },
    'Desktop': {
      type: 'dir',
      name: 'Desktop',
      children: {
        'Projects.app': { type: 'file', name: 'Projects.app', content: 'Executable alias for Projects application.' },
        'Resume.pdf': { type: 'file', name: 'Resume.pdf', content: 'Chirrayu_Sharma_Resume_2026.pdf  — Type `resume` to open.' },
        'About.app': { type: 'file', name: 'About.app', content: 'Executable alias for About application.' },
      },
    },
    'Projects': {
      type: 'dir',
      name: 'Projects',
      children: projectsData.reduce((acc, p) => {
        acc[p.slug] = {
          type: 'dir',
          name: p.slug,
          children: {
            'README.md': {
              type: 'file',
              name: 'README.md',
              content: `# ${p.name}\n${p.tagline}\n\nCategory: ${p.category}\nStack: ${p.techStack.join(', ')}\n\n${p.description}\n\nHighlights:\n${p.highlights.map(h => `• ${h}`).join('\n')}`,
            },
          },
        };
        return acc;
      }, {}),
    },
    'Experience': {
      type: 'dir',
      name: 'Experience',
      children: {
        'happiness_foundation.txt': {
          type: 'file',
          name: 'happiness_foundation.txt',
          content: `Web Developer / Portfolio Project\nHappiness Foundation, Jaipur | Jun 2026 – Jul 2026\n\n• Designed and developed the organization's portfolio website.\n• Built responsive, user-focused pages with clear navigation.\n• Translated foundation requirements into a polished website.\n• Managed delivery and final refinements.`,
        },
        'leadership.txt': {
          type: 'file',
          name: 'leadership.txt',
          content: `Leadership & Activities:\n\n• Lead Changemaker — Drove student-led tech-for-good initiatives.\n• Core PR Team Member, ACM-UPES — Managed outreach and event promotion.\n• Core Technical Team Member, UPES Hypervision — Hackathon infrastructure support.`,
        },
      },
    },
    'Skills': {
      type: 'dir',
      name: 'Skills',
      children: Object.entries(skillsData).reduce((acc, [category, list]) => {
        const key = `${category.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
        acc[key] = {
          type: 'file',
          name: key,
          content: `${category}:\n${list.map(s => `• ${s}`).join('\n')}`,
        };
        return acc;
      }, {}),
    },
    'Certifications': {
      type: 'dir',
      name: 'Certifications',
      children: {
        'aws_cloud_practitioner.txt': {
          type: 'file',
          name: 'aws_cloud_practitioner.txt',
          content: 'AWS Cloud Practitioner Certification — Amazon Web Services (2024)',
        },
        'oracle_ai_ml.txt': {
          type: 'file',
          name: 'oracle_ai_ml.txt',
          content: 'Oracle AI/ML Foundations Certification — Oracle (2024)',
        },
        'iit_jodhpur_cybersecurity.txt': {
          type: 'file',
          name: 'iit_jodhpur_cybersecurity.txt',
          content: 'IIT Jodhpur: Cyber Security Essentials — IIT Jodhpur (2023)',
        },
      },
    },
    'Resume': {
      type: 'dir',
      name: 'Resume',
      children: {
        'resume_info.txt': {
          type: 'file',
          name: 'resume_info.txt',
          content: 'Type `resume` in terminal to open your resume viewer.',
        },
      },
    },
    'Contact': {
      type: 'dir',
      name: 'Contact',
      children: {
        'channels.txt': {
          type: 'file',
          name: 'channels.txt',
          content: `Email:     ${profileData.email}\nPhone:     ${profileData.phone}\nGitHub:    ${linksData.github}\nLinkedIn:  ${linksData.linkedin}`,
        },
      },
    },
  },
};
