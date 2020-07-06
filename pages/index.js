import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import stylesIndex from './index.module.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../lib/fontAwesomeLibrary'
import { Animated } from "react-animated-css";

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

      <header className={stylesIndex.pageheader}>
      {/*<div class="page-header header-filter" data-parallax="true" ></div>*/}
      </header>

      <Container>
      <section id="aboutme" className={stylesIndex.header}>
        <img
          src="/images/profile.jpg"
          className={`${stylesIndex.headerHomeImage} ${utilStyles.borderCircle}`}
          alt={name}
        />
        <h1 className={stylesIndex.headerName}>{name}</h1>
        <Row>
          <Col className="text-primary">
            <a href="https://www.linkedin.com/in/jeangsm/" target="_blank"><FontAwesomeIcon className="px-2" icon={['fab',"linkedin"]} size='3x'/></a>
            <a href="https://www.behance.net/jeangsm/" target="_blank"><FontAwesomeIcon className="px-2" icon={['fab',"behance"]} size='3x'/></a>
            <a href="https://www.instagram.com/jeangsm" target="_blank"><FontAwesomeIcon className="px-2" icon={['fab',"instagram"]} size='3x'/></a>
            <a href="https://www.github.com/jeangsm" target="_blank"><FontAwesomeIcon className="px-2" icon={['fab',"github"]} size='3x'/></a>
          </Col>
        </Row>
        
      </section>

      <section className={stylesIndex.headingMd + " text-center mt-1"}>
        <p className="mb-0">21 anos, Designer e Desenvolvedor.</p>
        <p className="mt-0">Bacharelando, 9º semestre, em Ciências da Computação pela UniRitter.</p>
      </section>

      <div id="jobs" className="my-5"><hr></hr></div>

      <section className="mt-5">
        <h2 className={stylesIndex.headingLg}>Trabalhos Realizados</h2>
        <ButtonGroup className="d-none d-md-flex justify-content-center pb-4" aria-label="Basic example">
          <Button onClick={() => setJobs(allPostsData)} variant="primary"><FontAwesomeIcon icon="border-all" size='1x'/> Todos</Button>
          <Button onClick={() => setJobsFilter('social-media')} variant="primary"><FontAwesomeIcon icon="share-alt" size='1x'/> Social Media</Button>
          <Button onClick={() => setJobsFilter('web')} variant="primary"><FontAwesomeIcon icon="globe" size='1x'/> Web</Button>
          <Button onClick={() => setJobsFilter('video')} variant="primary"><FontAwesomeIcon icon="film" size='1x'/> Vídeos</Button>
          <Button onClick={() => setJobsFilter('logo')} variant="primary"><FontAwesomeIcon icon="shapes" size='1x'/> Logos</Button>
          <Button onClick={() => setJobsFilter('impressos')} variant="primary"><FontAwesomeIcon icon="print" size='1x'/> Impressos</Button>
          
        </ButtonGroup>
        <Form.Control className="d-block d-sm-none mb-4" as="select" size="md" onChange={handleSelectJob}>
          <option value="all" defaultValue>Todos</option>
          <option value='social-media'>Social Media</option>
          <option value='web'>Web</option>
          <option value='video'>Vídeos</option>
          <option value='logo'>Criação de Logo</option>
          <option value='impressos'>Impressos</option>          
        </Form.Control>
        <Row xs={1} md={2} lg={4}>
          {jobs.map(({ id, date, title, tags }, i) => (
            <Col className={stylesIndex.transition +" pb-4"} key={i}>
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
        </Container>
    </Layout>
  )
}