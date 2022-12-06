import axios from "axios";
import { useRef } from "react";

function UserImage() {
  const imageFileRef = useRef();

  const uploadImg = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("photo", imageFileRef.current.files[0]);
    formData.append("_id", "638b879d586eb1728419bb01");
    console.log(formData);

    axios
      .patch(`http://localhost:3001/posts/addphoto`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={uploadImg} encType="multipart/form-data">
        <input
          name="file"
          id="file"
          ref={imageFileRef}
          type="file"
          accept="image/gif,image/jpeg,image/jpg,image/png"
          multiple
        />
        <label htmlFor="image"></label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UserImage;
