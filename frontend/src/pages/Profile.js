function Profile() {
  const { id } = this.props.match.params;
  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
}
export default Profile;
