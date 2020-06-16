import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import styles from '../components/layout.module.css'
import stylesIndex from './index.module.css'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'

const name = 'Jean Medeiros'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  const [filterJobs, setFilterJobs] = useState('all')
  const [jobs, setJobs] = useState(allPostsData)

  const setJobsFilter = (tag) => {
    let filteredJobs = allPostsData.filter(function (job) {
      return job.tags.includes(tag);
    })
    setJobs(filteredJobs)
  }

  const handleSelectJob = (e) => {
    console.log(e.target.value)
    if(e.target.value == 'all')
      setJobs(allPostsData)
    else {
      setJobsFilter(e.target.value)
    }
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <header id="aboutme" className={styles.header + ' mt-5'}>
        <img
          src="/images/profile.jpg"
          className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
          alt={name}
        />
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </header>

      <section className={utilStyles.headingMd}>
        <ul>
          <li id="jobs">21 anos</li>
          <li>Designer e Desenvolvedor</li>
          <li>Bacharelando em Ciências da Computação na UniRitter</li> 
        </ul>
      </section>

      <section >
        <h2 className={utilStyles.headingLg}>Trabalhos Realizados</h2>
        <ButtonGroup className="d-none d-md-flex justify-content-center pb-4" aria-label="Basic example">
          <Button onClick={() => setJobs(allPostsData)} variant="secondary">Todos</Button>
          <Button onClick={() => setJobsFilter('social-media')} variant="secondary">Social Media</Button>
          <Button onClick={() => setJobsFilter('impressos')} variant="secondary">Impressos</Button>
          <Button onClick={() => setJobsFilter('logo')} variant="secondary">Criação de Logo</Button>
          <Button onClick={() => setJobsFilter('video')} variant="secondary">Vídeos</Button>
        </ButtonGroup>
        <Form.Control className="d-block d-sm-none mb-4" as="select" size="md" onChange={handleSelectJob}>
          <option value="all" defaultValue>Todos</option>
          <option value='social-media'>Social Media</option>
          <option value='impressos'>Impressos</option>
          <option value='logo'>Criação de Logo</option>
          <option value='video'>Vídeos</option>
        </Form.Control>
        <Row xs={1} md={2} lg={4}>
          {jobs.map(({ id, date, title, tags }, i) => (
            <Col className="pb-4" key={i}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
              <Card className={stylesIndex.card}>
                <Card.Img variant="top" src={"/images/jobs_cover/"+id+".jpg"} />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{tags.split(',').map((tag, i) => <span key={i}>{i == 0 ? '' : ' | '}{tag}</span>)}</Card.Subtitle>
                  <Card.Text>
                    <Date dateString={date}/><br/>
                  </Card.Text>                  
                </Card.Body>
              </Card>
              </Link>
            </Col>
          ))}
          </Row>
      </section>
      
      {/*<section id="skills">
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        </section>*/}
    </Layout>
  )
}