import { useState } from 'react'
import Photo from "./assets/pasfoto_half.png"
import GitHub from "./assets/github.png"
import LinkedIn from "./assets/linked_in.png"
import './App.css'

function App() {



  return (
    <>
    <head>
      <title>Paul Adriaanse | Portfolio</title>
      <img src={Photo} alt="profile picture" className="top_banner"/>
      <h1>
        Paul Adriaanse
      </h1>
      <div> {/* nav or address (add email) */}
        <a href="https://github.com/pea-adriaanse">
          <img src={GitHub} alt="github logo" />
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/paul-adriaanse/">
          <img src={LinkedIn} alt="linkedin logo" />
          LinkedIn
        </a>
      </div>
    </head>
    <body>
      {}
    </body>
    </>
  );
  
}

export default App
