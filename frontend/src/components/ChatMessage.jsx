import React from 'react';

const ChatMessage = ({ message }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatBotMessage = (text) => {
    // Basic formatting for AI responses - Bootstrap classes
    let formatted = escapeHtml(text);
    
    // Convert **bold** to <strong>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="fw-bold">$1</strong>');
    
    // Convert *italic* to <em>
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="fst-italic">$1</em>');
    
    // Convert bullet points
    formatted = formatted.replace(/^\*\s+(.+)$/gm, '<div class="ms-2">• $1</div>');
    
    // Convert line breaks to <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
  };

  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  return (
    <div className={`d-flex align-items-start mb-3 ${message.isUser ? 'flex-row-reverse' : ''}`}>
      <div 
        className={`rounded-circle d-flex align-items-center justify-content-center text-white ${message.isUser ? 'ms-3' : 'me-3'}`}
        style={{ 
          width: '40px', 
          height: '40px',
          background: message.isUser 
            ? 'linear-gradient(90deg, #6c757d 0%, #495057 100%)' 
            : 'linear-gradient(90deg, #007bff 0%, #0056b3 100%)'
        }}
      >
        {message.isUser ? (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
          </svg>
        ) : (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
          </svg>
        )}
      </div>

      <div 
        className={`p-3 shadow-sm ${message.isUser ? 'text-white' : 'bg-white text-dark'}`}
        style={{ 
          maxWidth: '70%',
          borderRadius: '20px',
          background: message.isUser 
            ? 'linear-gradient(90deg, #007bff 0%, #0056b3 100%)' 
            : '#ffffff',
          borderTopLeftRadius: message.isUser ? '20px' : '5px',
          borderTopRightRadius: message.isUser ? '5px' : '20px'
        }}
      >
        {message.isUser ? (
          <p className="mb-1">{escapeHtml(message.text)}</p>
        ) : (
          <div 
            className="mb-1" 
            dangerouslySetInnerHTML={{ __html: formatBotMessage(message.text) }}
          />
        )}
        <small className={`d-block ${message.isUser ? 'text-light opacity-75' : 'text-muted'}`}>
          {formatTime(message.timestamp)}
        </small>
      </div>
    </div>
  );
};

export default ChatMessage;
