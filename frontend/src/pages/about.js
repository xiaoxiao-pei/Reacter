const About = () => {
  return (
    <div>
      <h2>About us</h2>

      <table border="0">
        <tr>
          <th> Design inspiration </th>
        </tr>

        <tr>
          <td>
            {" "}
            Since our goal of this planned web site is to provide a platform for
            people to publish posts, to share different aspects of life with
            others, even to communicate with each other in the comments section,
            this is actually a place to connect people, to connect you, me and
            him/her. So our website is named YMH, and based on this basic
            principle, we have made the following designs
          </td>
        </tr>
        <tr>
          <td>
            <ol>
              <li>
                <p>Icon</p>
                <p>
                  We have designed our web site icon as three overlapped hearts
                  in three different colors. Three colors simply represents you,
                  me and him/her, or different people. They are overlapped
                  indicate the connection between people
                </p>
              </li>

              <li>
                <p>Color </p>
                <p>
                  We want our web site gives a dependable, mature and steady
                  feeling to people, so we have chosen the deep blue as the
                  background color. But we have chosen light green and white
                  color as the background of the content section, this soft and
                  light colors make a sharp contrast with the whole deep blue
                  background, which makes our web pages very concise, clear and
                  easy-reading. Also, we used limited colors which are similar
                  to the threes colors of our icon and similar layout in all the
                  pages to ensure the consistency throughout the whole web site.
                </p>
              </li>

              <li>
                <p>Functionalities </p>
                <p>
                  <ol type="a">
                    The key functionalities of our website include: A guest who
                    does not log in:
                    <li>
                      A guest who does not log in:
                      <ul>
                        <li>have access to about page </li>
                        <li>
                          can overview some of the posts and the recommended
                          authors list{" "}
                        </li>
                        <li>can view posts of the clicked author </li>
                        <li>but has no access to comments </li>
                        <li>
                          if he/she wants to know more or do more, he/she will
                          be guided to register{" "}
                        </li>
                      </ul>
                    </li>
                    <li>
                      A logged in regular user:
                      <ul>
                        <li>
                          can view and change (certain fields) of his/her
                          profile{" "}
                        </li>
                        <li>
                          can create a new post, and to view, update and delete
                          all his posts{" "}
                        </li>
                        <li>
                          can view all the posts, add comments to other's posts
                          and delete them{" "}
                        </li>
                      </ul>
                    </li>
                    <li>
                      A logged in administer:
                      <ul>
                        <li>
                          can view and change (certain fields) of his/her
                          profile{" "}
                        </li>
                        <li>
                          can view all regular uses'profiles, can change their
                          status (regular or admin) , and can delete users.{" "}
                        </li>
                        <li>can view all the posts of a certain user </li>
                      </ul>
                    </li>
                  </ol>
                </p>
              </li>
            </ol>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default About;
