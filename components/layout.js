import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useState, useEffect } from 'react'

/*
window.onscroll = function() {
      if(window.pageYOffset === 0) {
        alert('I AM AT THE TOP');
      }
    };
*/

const name = 'Jean Medeiros'
export const siteTitle = 'Jean Medeiros | Portfólio'

export default function Layout({ children, home }) {

  const [top, setTop] = useState(true)

  const handleScroll = () => {
    if(window.pageYOffset === 0)
      setTop(true)
    else
      setTop(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Portfólio pessoal de serviços gráficos e TI."
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Navbar className={styles.bg_primary} bg={top != true ? 'primary' : ''} variant="dark" expand="lg" fixed="top">
        <Link href="/"><Navbar.Brand><span className={styles.brandName}>Jean Medeiros</span></Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/#aboutme">Sobre mim</Nav.Link>
            <Nav.Link href="/#jobs">Trabalhos</Nav.Link>
            {/*<Nav.Link href="/#skills">Habilidades</Nav.Link>*/}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* 
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
          </ul>
        </div>
      </nav>
      */}
        <main>{children}</main>
    </>
  )
}