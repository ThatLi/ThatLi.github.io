import type { ReactNode } from 'react'
import { portfolio as p } from './data/portfolio'
import type { Experience, PortfolioImage } from './data/portfolio'

const cvUrl = `${import.meta.env.BASE_URL}${p.cv.file}`
const navigation = [
  { id: 'work', label: 'Work', show: p.projects.length > 0 },
  { id: 'experience', label: 'Experience', show: p.experience.length + p.community.length > 0 },
  { id: 'education', label: 'Education', show: p.education.length + p.awards.length > 0 },
  { id: 'skills', label: 'Skills', show: p.skills.length > 0 },
  { id: 'contact', label: 'Contact', show: p.contacts.length > 0 },
].filter((item) => item.show)

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function PortfolioFigure({ image }: { image: PortfolioImage }) {
  const url = `${import.meta.env.BASE_URL}${image.file}`
  return (
    <figure className="portfolio-figure">
      <a className="image-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${image.caption} (new tab)`}>
        <img src={url} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
        <span className="image-expand" aria-hidden="true">↗</span>
      </a>
      <figcaption>
        <span>{image.caption}</span>
        {image.credit && <a href={image.credit.url}>{image.credit.label}</a>}
        {image.license && <a href={image.license.url.startsWith('https:') ? image.license.url : `${import.meta.env.BASE_URL}${image.license.url}`}>{image.license.label}</a>}
      </figcaption>
    </figure>
  )
}

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-heading`}>
      <div className="section-heading">
        <p className="eyebrow section-index">{number} / {title}</p>
        <h2 id={`${id}-heading`}>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function ExperienceList({ items }: { items: Experience[] }) {
  return <div className="experience-list">{items.map((item) => (
    <article className="experience-item" key={`${item.organization}-${item.role}`}>
      <div className="experience-meta">
        <p className="date">{item.period}</p>
        <p className="organization">{item.organization}</p>
        {item.location && <p className="location">{item.location}</p>}
        {item.image && <PortfolioFigure image={item.image} />}
      </div>
      <div>
        <h3>{item.role}</h3>
        <ul className="detail-list">{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
      </div>
    </article>
  ))}</div>
}

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header container">
        <a className="wordmark" href="#top" aria-label={`${p.name}, back to top`}>{p.initials}<span>.</span></a>
        <nav aria-label="Main navigation">
          {navigation.map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}
        </nav>
        <a className="header-cv" href={cvUrl} aria-label={`${p.cv.label} (PDF)`}>{p.cv.label} <Arrow diagonal /></a>
      </header>

      <main id="main" className="container" tabIndex={-1}>
        <section id="top" className="hero" aria-labelledby="intro-heading">
          <div className="hero-main">
            <p className="eyebrow"><span className="status-dot" /> {p.eyebrow}</p>
            <h1 id="intro-heading">{p.name}<span>.</span></h1>
            <h2 className="hero-headline">{p.headline.map((line) => <span key={line}>{line}</span>)}</h2>
            <p className="intro-copy">{p.introduction}</p>
            <div className="hero-actions">
              {p.projects.length > 0 && <a className="button button-primary" href="#work">Explore my work <Arrow /></a>}
              <a className="button button-secondary" href={cvUrl} download>Download CV <span className="file-type">PDF</span> <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <aside className="hero-aside" aria-label="Areas of interest">
            <div className="editorial-art" aria-hidden="true">
              <div className="art-grid" />
              <div className="art-circle" />
              <div className="art-square" />
              <span className="art-plus art-plus-one">+</span>
              <span className="art-plus art-plus-two">+</span>
              <span className="art-caption">CODE · DESIGN · PEOPLE</span>
            </div>
            <div className="aside-caption"><span>Learning by building.</span><span>{p.location} <span aria-hidden="true">↗</span></span></div>
          </aside>
          <div className="hero-footnote"><span>A little about me. A selection of my work.</span><a href={`#${navigation[0]?.id ?? 'top'}`}>Scroll to explore <span aria-hidden="true">↓</span></a></div>
        </section>

        {p.projects.length > 0 && <Section id="work" number="01" title="Selected projects">
          <div className="projects">{p.projects.map((project, index) => (
            <article className={`project ${index === 0 ? 'project-featured' : ''}`} key={project.name}>
              <div className="project-number" aria-hidden="true">0{index + 1}</div>
              <div className="project-content">
                <p className="eyebrow">{project.context}</p>
                <h3>{project.name}</h3>
                {project.images && project.images.length > 0 && <div className="project-gallery">{project.images.map((image) => <PortfolioFigure key={image.file} image={image} />)}</div>}
                <ul className="detail-list">{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                {project.url && <a className="text-link" href={project.url}>View {project.name} repository <Arrow diagonal /></a>}
              </div>
              <div className="project-meta"><p className="date">{project.period}</p><ul className="tags" aria-label={`${project.name} technologies`}>{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul></div>
            </article>
          ))}</div>
        </Section>}

        {p.experience.length + p.community.length > 0 && <Section id="experience" number="02" title="Experience & community">
          {p.experience.length > 0 && <ExperienceList items={p.experience} />}
          {p.community.length > 0 && <><h3 className="subsection-label eyebrow">Leadership & community</h3><ExperienceList items={p.community} /></>}
        </Section>}

        {p.education.length + p.awards.length > 0 && <Section id="education" number="03" title="Education & recognition">
          <div className="education-grid">
            {p.education.length > 0 && <div className="education-list">{p.education.map((item) => (
              <article className="education-card" key={item.institution}>
                <p className="eyebrow">{item.period}</p>
                <h3>{item.institution}</h3>
                <p className="degree">{item.degree}</p>
                <p className="location">{item.location}</p>
                {item.image && <PortfolioFigure image={item.image} />}
                {item.coursework.length > 0 && <><h4 className="eyebrow">Relevant coursework</h4><ul className="coursework">{item.coursework.map((course) => <li key={course}>{course}</li>)}</ul></>}
              </article>
            ))}</div>}
            {p.awards.length > 0 && <div className="awards"><h3 className="eyebrow">Awards & scholarships</h3>{p.awards.map((award) => (
              <article className="award" key={award.title}>
                <span className="award-symbol" aria-hidden="true">✳</span>
                <div><p className="date">{award.date}</p><h4>{award.title}</h4><p>{award.description}</p></div>
              </article>
            ))}</div>}
          </div>
        </Section>}

        {p.skills.length > 0 && <Section id="skills" number="04" title="Tools of the trade">
          <div className="skills-grid">{p.skills.map((group) => <div className="skill-group" key={group.category}><h3 className="eyebrow">{group.category}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
        </Section>}

        {p.contacts.length > 0 && <section id="contact" className="contact-section" aria-labelledby="contact-heading">
          <div><p className="eyebrow">05 / Get in touch</p><h2 id="contact-heading">Let’s connect<span>.</span></h2><p>Find me here.</p></div>
          <div className="contact-links">{p.contacts.map((contact) => <a key={contact.label} href={contact.href}><span className="eyebrow">{contact.label}</span><span className="contact-value">{contact.value}</span><Arrow diagonal /></a>)}</div>
        </section>}
      </main>
      <footer className="site-footer container"><span>© {new Date().getFullYear()} {p.name}</span><a href="#top">Back to top <span aria-hidden="true">↑</span></a></footer>
    </>
  )
}
