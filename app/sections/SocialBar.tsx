'use client'

export default function SocialBar() {
  return (
    <div className="starnext-bar d-flex align-items-center">
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
  )
}