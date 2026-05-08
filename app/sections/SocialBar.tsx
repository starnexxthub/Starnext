'use client'
export default function SocialBar() {
  return (
    <>
      {/* DESKTOP layout - original, untouched */}
      <div className="starnext-bar d-none d-sm-flex align-items-center">
        <div className="col-4 text-center">
          <a
  href="https://www.linkedin.com/company/star-next-softech-private-ltd/"
  target="_blank"
  rel="noopener noreferrer"
>
  <i className="fa-brands fa-linkedin-in px-2" style={{ color: 'white' }}></i>
</a>

<a
  href="https://www.facebook.com/profile.php?id=61572375471264"
  target="_blank"
  rel="noopener noreferrer"
>
  <i className="fa-brands fa-facebook-f px-2" style={{ color: 'white' }}></i>
</a>

<a
  href="https://www.instagram.com/starnextsoftech_?igsh=MXY3Y2NyenR6ejBvZw%3D%3D&utm_source=qr"
  target="_blank"
  rel="noopener noreferrer"
>
  <i className="fa-brands fa-instagram px-2" style={{ color: 'white' }}></i>
</a>

<a
  href="https://www.youtube.com/@starnextsoftech-technology"
  target="_blank"
  rel="noopener noreferrer"
>
  <i className="fa-brands fa-youtube px-2" style={{ color: 'white' }}></i>
</a>
        </div>
        <div className="col-4 text-center">
          <img src="/img/logostarnext.png" className="ps-5 w-50" alt="StarNext Logo" />
        </div>
        <div className="col-4">
          <div className="text-center" style={{ color: 'white' }}>
            STAY AUTHENTIC, STAY STYLISH
          </div>
        </div>
      </div>

      {/* MOBILE layout */}
      <div className="starnext-bar-mobile d-flex d-sm-none flex-column align-items-center justify-content-center">
        <div style={{ color: 'white', fontSize: '10px', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
          STAY AUTHENTIC &nbsp; STAY STYLISH
        </div>
        <div className="mt-2 d-flex justify-content-center gap-3">
          <a
  href="https://www.linkedin.com/company/star-next-softech-private-ltd/"
  target="_blank"
  rel="noopener noreferrer"
>
  <i className="fa-brands fa-linkedin-in px-2" style={{ color: 'white' }}></i>
</a>

<a
  href="https://www.facebook.com/profile.php?id=61572375471264"
  target="_blank"
  rel="noopener noreferrer"
>
  <i className="fa-brands fa-facebook-f px-2" style={{ color: 'white' }}></i>
</a>

<a
  href="https://www.instagram.com/starnextsoftech_?igsh=MXY3Y2NyenR6ejBvZw%3D%3D&utm_source=qr"
  target="_blank"
  rel="noopener noreferrer"
>
  <i className="fa-brands fa-instagram px-2" style={{ color: 'white' }}></i>
</a>

<a
  href="https://www.youtube.com/@starnextsoftech-technology"
  target="_blank"
  rel="noopener noreferrer"
>
  <i className="fa-brands fa-youtube px-2" style={{ color: 'white' }}></i>
</a>
        </div>
      </div>

      <style>{`
        .starnext-bar-mobile {
          padding: 25px 12px;
          background: #001221;
        }
      `}</style>
    </>
  )
}