import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthorItem from "../components/AuthorItem";

function Authors() {
  const [authorList, setAuthorList] = useState([]);
  let user = localStorage.getItem("user");
  user = user && JSON.parse(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.userIsAdmin) {
      navigate("/login");
    }
    fetch("http://localhost:3001/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => data.filter((d) => d.userIsAdmin !== true))
      .then((data) => setAuthorList([...data]));
    return () => setAuthorList([]);
  }, []);

  const changeAuthorList = (id) =>
    setAuthorList((authorList) => authorList.filter((a) => a._id !== id));
  return (
    <>
      <div class="authorList">
        <Table striped className="table-borderless" hover>
          <thead className="recListHead">
            <tr>
              <th>Photo</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Post Count</th>
            </tr>
          </thead>
          <tbody>
            {authorList.length > 0 &&
              authorList.map((author, id) => (
                <tr
                  className="text-center"
                  style={{
                    backgroundColor: "aliceblue",
                    // margin: "3rem",
                  }}
                >
                  <AuthorItem
                    author={author}
                    changeAuthorList={changeAuthorList}
                  />
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Authors;
