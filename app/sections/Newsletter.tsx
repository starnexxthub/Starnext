'use client'

export default function Newsletter() {
  return (
    <section className="newsletter-bar">
      <div className="newsletter-inner">
        <div className="newsletter-title">Subscribe to our newsletter</div>
        <form className="newsletter-form" id="newsletterForm" action="subscribe.php" method="post">
          <div className="newsletter-inputWrap">
            <span className="newsletter-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 6.5h16a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8"/>
                <path d="m22 9-8.7 6.2a2 2 0 0 1-2.3 0L2 9" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
            </span>
            <input type="email" name="email" placeholder="Enter your email" required />
            <button type="submit" >Subscribe</button>
          </div>
          <p className="newsletter-note">You will be able to unsubscribe at any time.</p>
        </form>
      </div>
    </section>
  )
}