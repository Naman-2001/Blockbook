import React, { useRef, useState, useEffect } from "react";
import Identicon from "identicon.js";

function Main(props) {
  const [description, setDesciption] = useState("");

  const handleSubmit = (e) => {
    // setDesciption
    e.preventDefault();
    props.uploadImage(description);
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "500px" }}
        >
          <div className="content mr-auto ml-auto">
            <p>&nbsp;</p>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .bmp, .gif"
                onChange={(e) => props.captureFile(e)}
              />
              <div className="form-group mr-sm-2">
                <br></br>
                <input
                  id="imageDescription"
                  type="text"
                  value={description}
                  onChange={(e) => setDesciption(e.target.value)}
                  className="form-control"
                  placeholder="Image description..."
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Upload!
              </button>
            </form>

            <p>&nbsp;</p>

            {/* Code ... */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;
