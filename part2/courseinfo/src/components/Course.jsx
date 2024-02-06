import Header from './Header'
import Content from './Content'

const Course = ({course}) => (
  <div>
    <Header header={course.name} type={2} />
    <Content parts={course.parts} />
  </div>
)

export default Course