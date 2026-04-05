export default function LoadingPage() {
    return (
      <div className="loading-page">
        <div className="loading-brand">
          <i className="fa-solid fa-dice-d6"></i>
          Chat Flow
        </div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="loading-text">Loading your chats...</p>
      </div>
    );
  }