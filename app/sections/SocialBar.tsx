'use client'
export default function SocialBar() {
  return (
    <>
      {/* DESKTOP layout - original, untouched */}
      <div className="starnext-bar d-none d-sm-flex align-items-center">
        <div className="col-4 text-center">
          <a href="#"><i className="fa-solid fa-globe px-2" style={{ color: 'white' }}></i></a>
          <a href="#"><i className="fa-brands fa-facebook-f px-2" style={{ color: 'white' }}></i></a>
          <a href="#"><i className="fa-brands fa-github px-2" style={{ color: 'white' }}></i></a>
          <a href="#"><i className="fa-brands fa-instagram px-2" style={{ color: 'white' }}></i></a>
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
          <a href="#"><i className="fa-solid fa-globe" style={{ color: 'white', fontSize: '13px' }}></i></a>
          <a href="#"><i className="fa-brands fa-facebook-f" style={{ color: 'white', fontSize: '13px' }}></i></a>
          <a href="#"><i className="fa-brands fa-github" style={{ color: 'white', fontSize: '13px' }}></i></a>
          <a href="#"><i className="fa-brands fa-instagram" style={{ color: 'white', fontSize: '13px' }}></i></a>
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