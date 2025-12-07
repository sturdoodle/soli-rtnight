import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import './ProfileForm.css';


const ProfileForm = () => {
  const [formData, setFormData] = useState(
    {
      // Header Info
      fullName: 'Jane Doe',
      jobTitle: 'Senior Frontend Engineer | Vue.js | AWS | UI/UX Enthusiast',
      location: 'Bangalore, India',
      phone: '+91 9876543210',
      email: 'janedoe.dev@example.com',
      github: 'github.com/janedoe-code',

      // Summary
      summary: 'Results-oriented Senior Software Engineer with 6+ years of experience specializing in modern frontend architectures and cloud-native applications. Proficient in Vue.js, TypeScript, and AWS serverless technologies. Proven track record of leading teams in the fintech and e-commerce sectors, optimizing page load times by 40%, and designing accessible, responsive user interfaces.',

      // Dynamic Skills Array
      skills: [
        { id: 1, category: 'Frontend', items: 'Vue.js, Nuxt.js, TypeScript, Tailwind CSS, SASS, Webpack' },
        { id: 2, category: 'Backend', items: 'Python, Django, PostgreSQL, GraphQL' },
        { id: 3, category: 'Cloud & DevOps', items: 'AWS (Lambda, S3, DynamoDB), Docker, Kubernetes, Terraform' },
        { id: 4, category: 'Testing', items: 'Jest, Cypress, Vitest, Selenium' },
        { id: 5, category: 'Soft Skills', items: 'Team Leadership, Agile/Scrum, Technical Writing, Mentoring' }
      ],

      // Dynamic Professional Experience Array
      experience: [
        {
          id: 1,
          company: 'TechFlow Solutions',
          role: 'Senior Software Engineer',
          duration: 'Mar 2022 – Present',
          clients: [
            {
              id: Date.now() + 1, name: 'Global Fintech Alliance', bulletPoints: [
                'Architected a micro-frontend architecture using Vue.js and Module Federation, reducing deployment times by 60%.',
                'Implemented secure authentication flows using OAuth2 and AWS Cognito for a user base of 500k+.',
                'Designed and developed a real-time stock trading dashboard using WebSockets and D3.js for data visualization.',
                'Mentored junior developers and established code quality standards using ESLint and Prettier.'
              ]
            },
            {
              id: Date.now() + 2, name: 'Retail Giant Corp', bulletPoints: [
                'Optimized the mobile checkout experience, resulting in a 15% increase in conversion rates.',
                'Integrated Stripe and PayPal payment gateways with robust error handling and logging mechanisms.',
                'Collaborated with UX designers to implement a new design system ensuring WCAG 2.1 accessibility compliance.'
              ]
            }
          ]
        },
        {
          id: 2,
          company: 'Innovate Web Agency',
          role: 'Web Developer',
          duration: 'Jun 2019 – Feb 2022',
          clients: [
            {
              id: Date.now() + 3, name: 'Multiple Startups', bulletPoints: [
                'Developed responsive landing pages and SPAs for various early-stage startups using React and Firebase.',
                'Managed CMS migrations from WordPress to Headless CMS (Strapi) for improved performance.'
              ]
            }
          ]
        }
      ],

      // Dynamic Education Array
      education: [
        {
          id: 1,
          degree: 'M.S. in Computer Science',
          institution: 'Indian Institute of Technology (IIT), Delhi',
          duration: '2017–2019'
        },
        {
          id: 2,
          degree: 'B.E. in Information Technology',
          institution: 'Anna University, Chennai',
          duration: '2013–2017'
        }
      ],

      // Projects State
      projects: [
        {
          id: 1,
          name: 'TaskMaster Pro',
          icon: '✅',
          tech: 'Vue 3, Pinia, Firebase',
          description: 'A collaborative project management tool with real-time updates and drag-and-drop Kanban boards.'
        },
        {
          id: 2,
          name: 'CryptoWatch',
          icon: '📈',
          tech: 'React Native, CoinGecko API',
          description: 'Cross-platform mobile application for tracking cryptocurrency prices and setting custom alerts.'
        }
      ],

      // Certifications State
      certifications: [
        { id: 1, name: 'AWS Certified Solutions Architect – Associate' },
        { id: 2, name: 'Certified Kubernetes Administrator (CKA)' },
        { id: 3, name: 'Meta Frontend Developer Professional Certificate' }
      ]
    });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  // Update a specific skill row
  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index][field] = value;
    setFormData(prev => ({ ...prev, skills: updatedSkills }));
  };

  // Add a new empty skill row
  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: Date.now(), category: '', items: '' }]
    }));
  };

  // Remove a skill row
  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, skills: updatedSkills }));
  };

  // 4. 🆕 EXPERIENCE HANDLERS

  // Add a new empty company experience block
  const addCompany = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        company: '',
        role: '',
        duration: '',
        clients: [{ id: Date.now() + 1, name: 'Client/Project Name', bulletPoints: [''] }]
      }]
    }));
  };

  // Remove a company experience block
  const removeCompany = (companyIndex) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== companyIndex);
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  // Handle change for basic company/role/duration fields
  const handleCompanyChange = (companyIndex, name, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[companyIndex][name] = value;
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  // Add a new client/project block within a company
  const addClient = (companyIndex) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[companyIndex].clients.push({ id: Date.now(), name: 'New Client/Project', bulletPoints: [''] });
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  // Remove a client/project block within a company
  const removeClient = (companyIndex, clientIndex) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[companyIndex].clients = updatedExperience[companyIndex].clients.filter((_, i) => i !== clientIndex);
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  // Handle client name change
  const handleClientNameChange = (companyIndex, clientIndex, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[companyIndex].clients[clientIndex].name = value;
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  // Handle change for bullet points (as a single textarea)
  const handleClientBulletPointsChange = (companyIndex, clientIndex, value) => {
    const updatedExperience = [...formData.experience];
    // Store the bullet points as an array by splitting the textarea value by newline
    const pointsArray = value.split('\n').filter(p => p.trim() !== '');
    updatedExperience[companyIndex].clients[clientIndex].bulletPoints = pointsArray;
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  // 🆕 EDUCATION HANDLERS

  // Update a specific education row
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData(prev => ({ ...prev, education: updatedEducation }));
  };

  // Add a new empty education row
  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now(), degree: '', institution: '', duration: '' }]
    }));
  };

  // Remove an education row
  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, education: updatedEducation }));
  };
  // 🆕 Project Handlers
  const addProject = () => setFormData(prev => ({ ...prev, projects: [...prev.projects, { id: Date.now(), name: '', icon: '💻', tech: '', description: '' }] }));
  const removeProject = (index) => setFormData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects]; newProjects[index][field] = value; setFormData(prev => ({ ...prev, projects: newProjects }));
  };

  // 🆕 Certification Handlers
  const addCertification = () => setFormData(prev => ({ ...prev, certifications: [...prev.certifications, { id: Date.now(), name: '' }] }));
  const removeCertification = (index) => setFormData(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== index) }));
  const handleCertificationChange = (index, value) => {
    const newCerts = [...formData.certifications]; newCerts[index].name = value; setFormData(prev => ({ ...prev, certifications: newCerts }));
  };

  return (
    <>
      <div className="split-container">
        <div className="pane left-pane">
          <div className="form-card">
            <h2>Edit Header</h2>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Professional Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>GitHub / Portfolio</label>
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                />
              </div>
            </div>



            {/* Summary Section */}
            <div className="section-title">Professional Summary</div>
            <div className="form-group">
              <label>Summary Text</label>
              <textarea
                className='textarea_css'
                name="summary" value={formData.summary} onChange={handleChange} />
            </div>


            {/* Dynamic Skills Section */}
            <div className="section-title">Core Skills</div>
            <div className="skills-wrapper">
              {formData.skills.map((skill, index) => (
                <div key={skill.id} className="skill-row">
                  <button className="remove-btn" onClick={() => removeSkill(index)}>Remove</button>

                  <div className="form-group">
                    <label>Category (e.g. Frontend)</label>
                    <input
                      type="text"
                      placeholder="Category Name"
                      value={skill.category}
                      onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Skills List</label>
                    <textarea

                      style={{ minHeight: '60px' }}
                      placeholder="React, Node, etc."
                      value={skill.items}
                      onChange={(e) => handleSkillChange(index, 'items', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="add-btn" onClick={addSkill}>+ Add New Skill Category</button>



            {/* 🆕 PROFESSIONAL EXPERIENCE SECTION */}
            <div className="section-title">Professional Experience</div>

            {formData.experience.map((company, companyIndex) => (
              <div key={company.id} className="dynamic-row">
                <button

                  onClick={() => removeCompany(companyIndex)}>
                  <Trash2 size={14} /> Remove Company
                </button>

                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={company.company}
                    onChange={(e) => handleCompanyChange(companyIndex, 'company', e.target.value)}
                  />
                </div>

                <div className="row">
                  <div className="form-group">
                    <label>Role/Title</label>
                    <input
                      type="text"
                      value={company.role}
                      onChange={(e) => handleCompanyChange(companyIndex, 'role', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={company.duration}
                      onChange={(e) => handleCompanyChange(companyIndex, 'duration', e.target.value)}
                    />
                  </div>
                </div>

                <div className="subsection-title">Client/Project Experience</div>

                {company.clients.map((client, clientIndex) => (
                  <div key={client.id} className="nested-row">
                    <button
                      className="remove-btn"
                      style={{ position: 'static', float: 'right', marginTop: '-5px', marginBottom: '5px' }}
                      onClick={() => removeClient(companyIndex, clientIndex)}>
                      <Trash2 size={12} />
                    </button>

                    <div className="form-group">
                      <label>Client/Project Name</label>
                      <input
                        type="text"
                        value={client.name}
                        onChange={(e) => handleClientNameChange(companyIndex, clientIndex, e.target.value)}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Bullet Points (One point per line)</label>
                      <textarea
                        style={{ minHeight: '80px' }}
                        value={client.bulletPoints.join('\n')} // Join array to show in textarea
                        placeholder="Developed X feature.&#10;Integrated Y API.&#10;Optimized Z process."
                        onChange={(e) => handleClientBulletPointsChange(companyIndex, clientIndex, e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                <button className="add-nested-btn" onClick={() => addClient(companyIndex)}>
                  <Plus size={14} /> Add New Client/Project
                </button>

              </div>
            ))}

            <button className="add-btn" onClick={addCompany}>
              <Plus size={18} /> Add New Company Experience
            </button>



            {/* 🆕 Dynamic Education Section */}
            <div className="section-title">Education</div>

            {formData.education.map((edu, index) => (
              <div key={edu.id} className="dynamic-row">
                <button

                  onClick={() => removeEducation(index)}>
                  <Trash2 size={14} /> Remove
                </button>

                <div className="form-group">
                  <label>Degree/Certification Name</label>
                  <input
                    type="text"
                    placeholder="B.Tech in Computer Engineering"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  />
                </div>

                <div className="row">
                  <div className="form-group">
                    <label>Institution / Board</label>
                    <input
                      type="text"
                      placeholder="VIVA Institute of Technology"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration (e.g., 2017-2020)</label>
                    <input
                      type="text"
                      placeholder="2017–2020"
                      value={edu.duration}
                      onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button className="add-btn" onClick={addEducation} style={{ marginBottom: '40px' }}>
              <Plus size={18} /> Add New Education Entry
            </button>


            {/* 🆕 Projects Input Section */}
            <div className="section-title">Personal Projects</div>
            {formData.projects.map((proj, index) => (
              <div key={proj.id} className="dynamic-row">
                <button onClick={() => removeProject(index)}><Trash2 size={14} /> Remove</button>
                <div className="row">
                  <div className="form-group" style={{ flex: 3 }}>
                    <label>Project Name</label>
                    <input type="text" value={proj.name} onChange={(e) => handleProjectChange(index, 'name', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Icon</label>
                    <input type="text" placeholder="💻" value={proj.icon} onChange={(e) => handleProjectChange(index, 'icon', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Tech Stack (Comma separated)</label>
                  <input type="text" placeholder="React, Node, etc." value={proj.tech} onChange={(e) => handleProjectChange(index, 'tech', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea style={{ minHeight: '60px' }} value={proj.description} onChange={(e) => handleProjectChange(index, 'description', e.target.value)} />
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={addProject}><Plus size={18} /> Add Project</button>

            {/* 🆕 Certifications Input Section */}
            <div className="section-title">Certifications</div>
            {formData.certifications.map((cert, index) => (
              <div key={cert.id} className="dynamic-row" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                  <input type="text" placeholder="Certificate Name" value={cert.name} onChange={(e) => handleCertificationChange(index, e.target.value)} />
                </div>
                <button className="remove-btn" style={{ position: 'static' }} onClick={() => removeCertification(index)}><Trash2 size={14} /></button>
              </div>
            ))}
            <button className="add-btn" onClick={addCertification}><Plus size={18} /> Add Certification</button>

          </div>
        </div>

        <div className="pane right-pane">
          <div className="preview-box">
            <p className="preview-label">Live Preview</p>

            <div>
              <h1 className="resume-name">{formData.fullName || 'Your Name'}</h1>
              <p className="resume-title">{formData.jobTitle}</p>
              <p className="resume-contact">
                {formData.location}
                {formData.phone && ` | ${formData.phone}`}
                {formData.email && ` | ${formData.email}`}
                {formData.github && ` | ${formData.github}`}
              </p>
            </div>

            {/* Summary Block */}
            {formData.summary && (
              <div className="resume-section">
                <h3 className="resume-section-head">Professional Summary</h3>
                <p className="resume-text">{formData.summary}</p>
              </div>
            )}

            {/* Skills Block */}
            <div className="resume-section">
              <h3 className="resume-section-head">Core Skills</h3>
              <ul className="resume-list">
                {formData.skills.map((skill) => (
                  <li key={skill.id}>
                    <span className="bold-category">{skill.category ? `${skill.category}: ` : ''}</span>
                    {skill.items}
                  </li>
                ))}
              </ul>
            </div>
            {/* 🆕 PROFESSIONAL EXPERIENCE PREVIEW */}
            {formData.experience.length > 0 && (
              <div className="resume-section">
                <h3 className="resume-section-head">Professional Experience</h3>

                <ol style={{ listStyleType: 'decimal', paddingLeft: '20px', margin: '0' }}>
                  {formData.experience.map((company) => (
                    <li key={company.id} style={{ marginBottom: '15px' }}>
                      <div className="exp-company-head">{company.company} — {company.role} <span className="exp-role-duration exp-duration ">{company.duration}</span></div>

                      {company.clients.map((client) => (
                        <div key={client.id} style={{ marginBottom: '5px' }}>
                          <p className="exp-client-name">Client: {client.name}</p>
                          <ul className="exp-bullet-list">
                            {client.bulletPoints.map((point, pointIndex) => (
                              point && <li key={pointIndex}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </li>
                  ))}
                </ol>

              </div>
            )}

            {/* 🆕 EDUCATION PREVIEW */}
            {formData.education.length > 0 && (
              <div className="resume-section">
                <h3 className="resume-section-head">Education</h3>
                <ul className="resume-list">
                  {formData.education.map((edu) => (
                    <li key={edu.id} style={{ marginBottom: '5px' }}>
                      **{edu.degree}** — {edu.institution} ({edu.duration})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 🆕 Projects Preview */}
            {formData.projects.length > 0 && (
              <div className="resume-section">
                <h3 className="resume-section-head">Personal Projects / Side Projects</h3>
                <div className="projects-grid">
                  {formData.projects.map((proj) => (
                    <div key={proj.id} className="project-card">
                      <h4><span className="icon">{proj.icon}</span> {proj.name}</h4>
                      <div className="tech-badges">
                        {proj.tech.split(',').map((t, i) => t.trim() && <span key={i}>{t.trim()}</span>)}
                      </div>
                      <p className="resume-text" style={{ fontSize: '13px', marginTop: '5px' }}>{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 🆕 Certifications Preview */}
            {formData.certifications.length > 0 && (
              <div className="resume-section">
                <h3 className="resume-section-head">Certifications</h3>
                <ul className="resume-list">
                  {formData.certifications.map((cert) => (
                    <li key={cert.id}>{cert.name}</li>
                  ))}
                </ul>
              </div>
            )}


          </div>
        </div>

      </div>
    </>
  )

}

export default ProfileForm