import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'

export default function Post( {postData}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <header className={utilStyles.postheader} style={{backgroundImage: 'url(/images/jobs_cover/'+postData.id+'_cover.jpg)'}}>
        <Container className="text-center">
          <h1 className={utilStyles.headingPost + " text-light"}>{postData.title}</h1>
          <br/>
          <div className="text-light">
            <Date dateString={postData.date} />
          </div>
        </Container>
      </header>
      <Container>
        <article className="mt-5">
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}