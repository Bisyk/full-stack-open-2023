const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, e) => sum + e.exercises, 0)
  return(
    <>
      <p><strong>total amount of exercises is {sum}</strong></p>
    </>
  )
}

const Part = ({ part }) => {
  return(
  <p>
    {part.name} {part.exercises}
  </p>
  )
}

const Content = ({ parts }) => {
  return(
  <>
    {parts.map((part) => 
      <Part key={part.id} part={part}/>
      )}     
  </>
  )
  }

const Course = ({courses}) =>{
  return(
    <>
      {courses.map((course) => 
      <div key={course.id}>
        <Header  name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
  )}
    </>
  )
}

export default Course;