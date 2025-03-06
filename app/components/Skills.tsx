const skills = [
  { name: "HTML5", level: 90 },
  { name: "CSS3", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 75 },
  { name: "Node.js", level: 70 },
  { name: "Python", level: 65 },
  { name: "UI/UX Design", level: 80 },
  { name: "Adobe Creative Suite", level: 75 },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-secondary dark:bg-gray-900 text-quaternary dark:text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-semibold">{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full bg-primary dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-tertiary dark:bg-white h-2.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

