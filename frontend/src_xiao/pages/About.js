import '../css/About.css';

const About = () => {
  return (
    <div className='aboutus'>

      <h2 id="titleAbout" className='d-flex justify-content-center my-3'>Story behind</h2>

      <div className='row'>

        <div className='col-12 col-md-6 col-lg-4 p-4 ' >

          <div style={{ backgroundColor:"red"}} className="outBox p-4">

            <h3 className='d-flex justify-content-center' style={{ color: "yellow" }}>Who are we?</h3>

            <div  className="innerBox p-3">
              <p>
                YMH is a social media web application, it's similar to blog, but adding more user interaction features, and we focus on short posts, not long articles.
              </p>

            </div>
          </div>
        </div>


        <div className='col-12 col-md-6 col-lg-4 p-4' >
          <div style={{ backgroundColor: "yellow" }} className="outBox p-4">
            <h3 className='d-flex justify-content-center' style={{ color: "green" }}>Who are we?</h3>
            <div>
              <p className="innerBox p-3">
                YMH is a social media web application, it's similar to blog, but adding more user interaction features, and we focus on short posts, not long articles.
              </p>

            </div>
          </div>

        </div>


        <div className='col-12 col-md-6 col-lg-4 p-4' >
          <div style={{ backgroundColor: "green" }} className="outBox p-4">
            <h3 className='d-flex justify-content-center' style={{ color: "red" }}>Our goals</h3>
            <div>
              <p className="innerBox p-3">
                YMH is a social media web application, it's similar to blog, but adding more user interaction features, and we focus on short posts, not long articles.
              </p>

            </div>
          </div>

        </div>
      </div>

    </div>
  )
};

export default About;
