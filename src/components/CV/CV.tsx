import React, { useState } from 'react';
import '../../App.css';
import { Container, Divider, Button } from '@mui/material';
import {
  AzuredevopsOriginal,
  CplusplusPlain,
  CsharpLine,
  Css3Plain,
  DotNetPlain,
  JavascriptOriginal,
  GitPlain,
  Html5Original,
  InsomniaPlain,
  MayaOriginal,
  PythonOriginal,
  ReactOriginal,
  UnrealengineOriginal,
  UnityPlain,
  VisualstudioPlain,
  VscodePlain,
  TypescriptOriginal,
} from 'devicons-react';
import data from './sample.json';
import Tooltip from '@mui/material/Tooltip';

const skillIcons: { [key: string]: JSX.Element } = {
  'Azure DevOps': <AzuredevopsOriginal size="2em" />,
  'C++': <CplusplusPlain size="2em" />,
  'C#': <CsharpLine size="2em" />,
  'CSS': <Css3Plain size="2em" />,
  'Git': <GitPlain size="2em" />,
  'HTML': <Html5Original size="2em" />,
  'Insomnia': <InsomniaPlain size="2em" />,
  '.Net': <DotNetPlain size="2em" />,
  '.NET': <DotNetPlain size="2em" />,
  'Maya': <MayaOriginal size="2em" />,
  'Javascript': <JavascriptOriginal size="2em" />,
  'JavaScript': <JavascriptOriginal size="2em" />,
  'Python': <PythonOriginal size="2em" />,
  'React': <ReactOriginal size="2em" />,
  'Unreal Engine': <UnrealengineOriginal size="2em" />,
  'Visual Studio': <VisualstudioPlain size="2em" />,
  'VS Code': <VscodePlain size="2em" />,
  'Unity': <UnityPlain size="2em" />,
  'Typescript': <TypescriptOriginal size="2em" />
};

interface SkillItemProps {
  skills: string[];
}

const SkillItem: React.FC<SkillItemProps> = ({ skills }) => (
  <span>
    {skills.filter(skill => !skillIcons[skill]).join(', ')}
    {skills.map(skill => skillIcons[skill] && (
      <Tooltip title={skill} key={skill}>
        <span>{skillIcons[skill]}</span>
      </Tooltip>
    ))}
  </span>
);

const CV: React.FC = () => {
  const { summary, work_experience, education, programming_skills, hobbies } = data;
  const [state, setState] = useState({ text: "Icon", isVisible: true });

  function showIcon() {
    console.log("showIcon");
    if (state.isVisible) {
      setState(prevState => ({
        ...prevState,
        text: "Text",
        isVisible: false,
      }));
    }
    else {
      setState(prevState => ({
        ...prevState,
        text: "Icon",
        isVisible: true,
      }));
    }

    console.log("Updated state:", state);
  }



  return (
    <Container maxWidth="xl" sx={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>Saoirse Seeber (she/her)</h1>
        </header>

        {/* Summary */}
        <Divider sx={{ bgcolor: 'var(--primary-color)', marginBottom: '0.5rem' }} />

        <section className="summary">
          <h2>Summary</h2>
          <Divider sx={{ bgcolor: 'var(--primary-color)',marginBottom: '0.5rem' }} />

          <p>{summary}</p>
        </section>

        {/* Work Experience */}
        <section className="experience">
          <h2>Work Experience <Button id="iconOrText" variant="contained" onClick={showIcon}>{state.text}</Button></h2>
          <Divider sx={{ bgcolor: 'var(--primary-color)', marginBottom:'0.5rem'}} />
          {work_experience.map((job, index) => (
            <div className="job" key={index}>
              <h3>{job.company}</h3>
              <p>{job.location}</p>
              <p>{job.position} | {job.dates}</p>
              <ul>
                {job.projects?.map((project, i) => (
                  <li key={i}>
                    <strong>{project.name}:</strong> <p>{project.description}</p>
                    {state.isVisible === true ? (
                      <SkillItem skills={project.technologies} />
                    ) : (
                      <p>{project.technologies.join(', ')}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="education">
          <h2>Education</h2>
          <Divider sx={{ bgcolor: 'var(--primary-color)', marginBottom: '0.5rem'}} />
          {education.map((degree, index) => (
            <div className="degree" key={index}>
              <h3>{degree.institution}</h3>
              <p>{degree.degree} | {degree.dates}</p>
            </div>
          ))}
        </section>

        {/* Programming Skills */}
        <section className="skills">
          <h2>Programming Skills</h2>
          <Divider sx={{ bgcolor: 'var(--primary-color)', marginBottom: '0.5rem'}} />
          <strong>Languages:</strong>
          <ul>
            {state.isVisible === true ? (
              <SkillItem skills={programming_skills.languages} />
            ) : (
              <p>{programming_skills.languages.join(', ')}</p>
            )}
          </ul>
          <strong>Technologies</strong>
          <ul>
            {state.isVisible === true ? (
              <SkillItem skills={programming_skills.technologies} />
            ) : (
              <p>{programming_skills.technologies.join(', ')}</p>
            )}
          </ul>
        </section>

        {/* Hobbies */}
        <section className="hobbies">
          <h2>Hobbies</h2>
          <Divider sx={{ bgcolor: 'var(--primary-color)', marginBottom: '0.5rem'}} />
          <ul>
            {hobbies.map((hobby, index) => (
              <li key={index}><strong>{hobby}:</strong> {hobby}</li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
};

export default CV;
