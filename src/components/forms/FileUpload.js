import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const token = localStorage.getItem("token");

  const fileUploadAndResize = (e) => {
    console.log(e.target.files);
    //Resize
    let files = e.target.files;
    let allUploadedFiles = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    token: token,
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERROR", err);
              });
          },
          "base64"
        );
      }
    }
    //Send back to server to upload to cloudinary
    //Set url to images[] in the parent component - ProductCreate
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    console.log("remove image", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            token: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <div className="card mx-2 mb-2" style={{ width: "15%" }}>
              <span
                class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
                onClick={() => handleImageRemove(image.public_id)}
                style={{ cursor: "pointer" }}
              ></span>
              <img
                src={image.url}
                key={image.public_id}
                className="rounded"
                alt="..."
              ></img>
            </div>
          ))}
      </div>
      <div className="row w-25">
        <label className="btn btn-sm btn-outline-dark">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
