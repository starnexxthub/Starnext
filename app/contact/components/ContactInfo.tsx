export default function ContactInfo() {
  return (
    <section className=" text-white py-5 min-vh-80" style={{backgroundColor:"black"}}>
      <div className="container">
        <div className="row g-2 justify-content-center">

          {/* BOX 1 */}
          <div className="col-12 col-md-4 d-flex justify-content-center px-2">
            <div
              className="p-4 rounded-3 d-flex flex-column justify-content-between"
              style={{ backgroundColor: "#3b4f6b", width: "300px", height: "200px" }}
            >
              {/* ICON */}
              <div
                className="d-flex align-items-center justify-content-center mb-2"
                style={{
                  width: "42px",
                  height: "42px",
                  backgroundColor: "#d1d5db",
                  borderRadius: "10px",
                  opacity: "0.9",
                }}
              >
                <i className="bi bi-envelope" style={{ fontSize: "20px" }}></i>
              </div>

              <div>
                <h6 style={{ fontSize: "16px", marginBottom: "8px" }}>
                  info@stanexxt.com
                </h6>
                <p className="text-light mb-0" style={{ fontSize: "14px" }}>
                  Feel free to reach out via email if you have any questions before our call!
                </p>
              </div>
            </div>
          </div>

          {/* BOX 2 */}
          <div className="col-12 col-md-4 d-flex justify-content-center px-2">
            <div
              className="p-4 rounded-3 d-flex flex-column justify-content-between"
              style={{ backgroundColor: "#3b4f6b", width: "300px", height: "200px" }}
            >
              {/* ICON */}
              <div
                className="d-flex align-items-center justify-content-center mb-2"
                style={{
                  width: "42px",
                  height: "42px",
                  backgroundColor: "#d1d5db",
                  borderRadius: "10px",
                  opacity: "0.9",
                }}
              >
                <i className="bi bi-telephone" style={{ fontSize: "20px" }}></i>
              </div>

              <div>
                <h6 style={{ fontSize: "16px", marginBottom: "8px" }}>
                  +91 8267016702, +91 7248777724
                </h6>
                <p className="text-light mb-0" style={{ fontSize: "14px" }}>
                  You can reach out to us by phone to discuss your needs.
                </p>
              </div>
            </div>
          </div>

          {/* BOX 3 */}
          <div className="col-12 col-md-4 d-flex justify-content-center px-2">
            <div
              className="p-4 rounded-3 d-flex flex-column justify-content-between"
              style={{ backgroundColor: "#3b4f6b", width: "300px", height: "200px" }}
            >
              {/* ICON */}
              <div
                className="d-flex align-items-center justify-content-center mb-2"
                style={{
                  width: "42px",
                  height: "42px",
                  backgroundColor: "#d1d5db",
                  borderRadius: "10px",
                  opacity: "0.9",
                }}
              >
                <i className="bi bi-geo-alt" style={{ fontSize: "20px" }}></i>                    

              </div>

              <div>
                <h6 style={{ fontSize: "16px", marginBottom: "8px" }}>
                  Office
                </h6>
                <p className="text-light mb-0" style={{ fontSize: "14px" }}>
                  2nd Floor, Dwarka Store, Shagun Tower, New Rd, Dehradun, Uttarakhand 248001
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}