import "./bookingCard.scss";

const BookingCard= ({user,title}) => {

  return (

    <>
    <div className="user-card">
      <div className="user-info">
        <h2>{title}</h2>
        <img
          src={`${user?.image}`}
          alt="User"
          className="user-image"
        />
        <div className="user-details">
          <p>     Name:{user?.name}</p>
          <p>    Email:{user?.email}</p>
          <p>   Mobile:{user?.mobile}</p>
          <p>     City:{user?.city}</p>
          <p>   Street:{user?.street}</p>
        </div>
      </div>

    </div>
    </>
  );
};

export default BookingCard;
