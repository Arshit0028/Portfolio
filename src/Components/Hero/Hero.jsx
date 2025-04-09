import React from 'react' 
import "./Hero.css"
import profile_img from '../../assets/profile_img.svg'

function Hero() {
  return (
    <div id='home' className='hero'>
      <img src={profile_img} alt="" height={260} />
      <h1> <span>I'm Arshit Dhiman</span> ,Full stack Developer </h1>
      <p> 
        I am a full stack developer with a passion for creating dynamic and responsive web applications.I am always eager to learn new technologies and improve my skills.
      </p> 
      <div className="hero-action">
        <div className="hero-connect">
        Connect with me
        </div>
        <div className="hero-resume">
          My Resume
        </div>
      </div>
    </div>
  )
}

export default Hero
