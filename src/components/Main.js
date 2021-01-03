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

            {props.images.map((image, key) => {
              console.log(image);
              return (
                <div className="card mb-4" key={key}>
                  <div className="card-header">
                    <img
                      className="mr-2"
                      width="30"
                      height="30"
                      src={`data:image/png;base64,${new Identicon(
                        image.author,
                        30
                      ).toString()}`}
                    />
                    <small className="text-muted">{image.author}</small>
                  </div>
                  <ul id="imageList" className="list-group list-group-flush">
                    <li className="list-group-item">
                      <p class="text-center">
                        <img
                          src={`https://ipfs.infura.io/ipfs/${image.hash}`}
                          style={{ maxWidth: "420px" }}
                        />
                      </p>
                      <p>{image.description}</p>
                    </li>
                    <li key={key} className="list-group-item py-2">
                      <small className="float-left mt-1 text-muted">
                        TIPS:{" "}
                        {window.web3.utils.fromWei(
                          image.tipAmount.toString(),
                          "Ether"
                        )}{" "}
                        ETH
                      </small>
                      <button
                        className="btn btn-link btn-sm float-right pt-0"
                        name={image.id}
                        onClick={(event) => {
                          let tipAmount = window.web3.utils.toWei(
                            "0.1",
                            "Ether"
                          );
                          console.log(event.target.name, tipAmount);
                          props.tipImageOwner(event.target.name, tipAmount);
                        }}
                      >
                        TIP 0.1 ETH
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Main;
