import React from 'react';
import './HomeContent.css';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ReactComponent as Logo } from '../assets/undraw_medicine_hqqg.svg';
import { ReactComponent as AI } from '../assets/undraw_artificial-intelligence_fuvd.svg';
import { ReactComponent as Upload } from '../assets/undraw_upload_cucu.svg';
import { ReactComponent as Location } from '../assets/undraw_location-tracking_q3yd.svg';
import { ReactComponent as Notify } from '../assets/undraw_notify_rnwe.svg';
import { ReactComponent as Steps } from '../assets/undraw_steps_s8km.svg';
import Flow_diagram from '../assets/flow diagram.png';


function HomeContent() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/signin');
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  
    toast.promise(
      emailjs.sendForm(
        'service_jojkpig',
        'template_9vnkjwr',
        form.current,
        'Vo7wqh7oG1HOjMhv2'
      ),
      {
        loading: 'Sending message...',
        success: '📨 Message Sent Successfully!',
        error: (err) => `❌ Failed to send: ${err.text}`,
      }
    ).then(() => form.current.reset());
  };
    

  return (
    <div className="home-container">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Hero Section */}
      <section id="hero" className="hero">
        <h1>HealthMate</h1>
        <p>Your Health. Our AI. Instant Answers.</p>
        <button className="btn-get-started" onClick={handleLogin}>Get Started</button>

        <div className='intro'>
          <span className='intro-text'>Check symptoms, detect wounds with a photo, and find the nearest hospital — all in one smart healthcare assistant. <br />
            <button className="btn-get-started" onClick={handleLogin}>Scan Now</button>
            &emsp;
            <button className="btn-get-started" onClick={handleLogin}>Check with symptoms</button>
          </span>
          <Logo width="35rem" height="25rem" />
        </div>

      </section>

      {/* Highlights Section */}
      <section id="features" className="features">
        <h2>Highlights</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h1>Check Now</h1>
            <div className="text-content">
              <h3>AI Symptom Checker</h3> <br />
              <p>Enter symptoms, get quick AI-based diagnosis with suggested steps.</p>
            </div>
            <AI className="logo" width="5rem" />
          </div>

          <div className="feature-card">
            <h1>Scan Now</h1>
            <div className='text-content'>
              <h3>Skin Disease Detection</h3> <br />
              <p>Upload an image to get an AI-based prediction of the disease type.</p>
              <Upload className="logo" width="20rem" />
            </div>
          </div>
          <div className="feature-card">
            <h1>Find Now</h1>
            <div className='text-content'>
              <h3>Hospital/Clinic Finder</h3> <br />
              <p>Find the nearest hospital or clinic based on your current location.</p>
            </div>
            <Location className="logo" width="20rem" />
          </div>
          <div className="feature-card">
            <h1>Check Now</h1>
            <div className='text-content'>
              <h3>Smart Health Alerts</h3> <br />
              <p>Get real-time alerts on health trends, outbreaks, or health tips.</p>
            </div>
            <Notify className="logo" width="10rem" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How it Works</h2>
        <div>
          <Steps height="25rem" width="25rem" />
          <img src={Flow_diagram} alt='flow diagram' height="450rem" width="300rem" />
        </div>
      </section>

      {/* Why Us */}
      <section className="why-us">
        <h2>Why us ?</h2>
        <div className='container'>
        <div class="grid-container">
          <div class="grid-item combined"><p>Available 24/7</p></div>
          <div class="grid-item-unwanted"></div>
          <div class="grid-item combined"><p>Fast, Simple & Free</p></div>

          <div class="grid-item combined"><p>Built by Experts with<br/> Medical Datasets</p></div>

          <div class="grid-item combined"><p>Private & Secure</p></div>
          <div class="grid-item combined"><p>AI-Powered Accuracy</p></div>

          <div class="grid-item-unwanted"></div>

        </div>
        </div>
      </section>


      {/* About Us */}
      <section id="about" className="about-us">
        <h2>About Us</h2>
        <p>
        At <strong>HealthMate</strong>, we're driven by a mission to make healthcare smarter, more accessible, and patient-friendly. Our platform integrates cutting-edge AI technology with essential hospital services to simplify the healthcare journey for everyone.<br/><br/>

We specialize in AI-based wound and disease detection, affordability-based hospital recommendations, and insurance compatibility checks all designed to empower users with timely, accurate, and personalized healthcare insights.<br/><br/>

Whether you're in a city or a remote village, our system ensures that quality care is just a few clicks away. With features like appointment booking, smart reminders, and medical records tracking, we're helping patients take control of their health like never before.<br/><br/>

<strong>Join us in building a healthier future where technology meets compassion.</strong>
        </p>
      </section>

      <section id="contact" className="contact">
      <h2>Contact us</h2>
      <form className="contact-form" onSubmit={sendEmail} ref={form}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input name="user_name" type="text" id="name" placeholder="Your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input name="user_email" type="email" id="email" placeholder="your@email.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" rows="3" placeholder="Your message" required></textarea>
        </div>
        <button type="submit" className="btn-submit">Contact us</button>
      </form>
    </section>

    </div>
  );
}

export default HomeContent;
