import React from 'react'

function Contact() {
  return (
    <div>
         <div className="bg-light p-4 rounded">
        <h4 className="text-center mb-4">Contact us</h4>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Your name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="your@email.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="3" placeholder="Your message"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Contact us</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact